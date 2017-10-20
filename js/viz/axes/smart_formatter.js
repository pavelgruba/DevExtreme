"use strict";

var _format = require("../core/format"),
    formatHelper = require("../../format_helper"),
    typeUtils = require("../../core/utils/type"),
    dateUtils = require("../../core/utils/date"),
    getLog = require("../core/utils").getLog,
    isDefined = typeUtils.isDefined,
    isFunction = typeUtils.isFunction,
    isExponential = typeUtils.isExponential,
    floor = Math.floor,
    adjust = require("../../core/utils/math").adjust,
    abs = Math.abs,
    EXPONENTIAL = "exponential",
    formats = ["fixedPoint", "thousands", "millions", "billions", "trillions", EXPONENTIAL];

function log10(value) {
    return adjust(getLog(value, 10));
}

function getDatesDifferences(prevDate, curDate, nextDate, tickFormat) {
    var prevDifferences,
        nextDifferences,
        dateUnitInterval,
        tickFormatIndex,
        dateUnitsLength = dateUtils.dateUnitIntervals.length,
        i,
        j;

    if(tickFormat === "week") {
        tickFormat = "day";
    } else if(tickFormat === "quarter") {
        tickFormat = "month";
    } else if(tickFormat === "shorttime") {
        tickFormat = "hour";
    } else if(tickFormat === "longtime") {
        tickFormat = "second";
    }

    if(nextDate) {
        nextDifferences = dateUtils.getDatesDifferences(curDate, nextDate);
        if(!prevDate && nextDifferences[tickFormat]) {
            for(i = dateUtils.dateUnitIntervals.length - 1; i >= 0; i--) {
                if(dateUtils.dateUnitIntervals[i] === tickFormat) {
                    break;
                }
                resetDateUnitInterval(nextDifferences, i);
            }
        }
    }

    if(prevDate) {
        prevDifferences = dateUtils.getDatesDifferences(prevDate, curDate);
        if(!nextDate && prevDifferences[tickFormat]) {
            tickFormatIndex = dateUtils.dateUnitIntervals.indexOf(tickFormat);
            for(i = dateUnitsLength - 1; i >= 0; i--) {
                dateUnitInterval = dateUtils.dateUnitIntervals[i];
                if(prevDifferences[dateUnitInterval]) {
                    if(i > tickFormatIndex && tickFormatIndex !== 1) {
                        for(j = tickFormatIndex; j >= 0; j--) {
                            resetDateUnitInterval(prevDifferences, j);
                        }
                        break;
                    } else if(i === tickFormatIndex) {
                        break;
                    }
                }
            }
        }
    }

    if(prevDifferences && nextDifferences) {
        for(i = dateUnitsLength - 1; i >= 0; i--) {
            dateUnitInterval = dateUtils.dateUnitIntervals[i];
            if(prevDifferences[dateUnitInterval] && nextDifferences[dateUnitInterval]) {
                for(j = dateUnitsLength - 1; j > i; j--) {
                    dateUnitInterval = dateUtils.dateUnitIntervals[j];
                    if(prevDifferences[dateUnitInterval] && !nextDifferences[dateUnitInterval]) {
                        if(i !== 1) {
                            resetDateUnitInterval(prevDifferences, i);
                        } else if(j > 4) {
                            for(j = 3; j >= 0; j--) {
                                resetDateUnitInterval(prevDifferences, j);
                            }
                        }
                        break;
                    }
                }
                for(j = i - 1; j >= 0; j--) {
                    dateUnitInterval = dateUtils.dateUnitIntervals[j];
                    if(!nextDifferences[dateUnitInterval]) {
                        resetDateUnitInterval(prevDifferences, j);
                    }
                }
            }
        }
    }

    return prevDate ? prevDifferences : nextDifferences;
}

function resetDateUnitInterval(differences, intervalIndex) {
    var dateUnitInterval = dateUtils.dateUnitIntervals[intervalIndex];

    if(differences[dateUnitInterval]) {
        differences[dateUnitInterval] = false;
        differences.count--;
    }
}

function getNoZeroIndex(str) {
    var i = 0,
        indexOfE = str.indexOf("e");

    if(indexOfE < 0) {
        for(; i < str.length; i++) {
            if(str[i] !== "0") {
                return i;
            }
        }
    }
    return str.split("e")[1].length;
}

function smartFormatter(tick, options) {
    var tickInterval = options.tickInterval,
        tickIntervalIndex,
        tickIndex,
        actualIndex,
        stringTick = abs(tick).toString(),
        precision = 0,
        typeFormat,
        typeFormatter,
        offset = 0,
        separatedTickInterval,
        indexOfFormat = 0,
        indexOfTick = -1,
        datesDifferences,
        format = options.labelOptions.format,
        ticks = options.ticks,
        log10Tick;

    if(!isDefined(format) && isDefined(tickInterval) && options.type !== "discrete") {
        if(options.dataType !== "datetime") {
            separatedTickInterval = tickInterval.toString().split(".");

            if(options.type === "logarithmic") {
                log10Tick = tick !== 0 ? log10(abs(tick)) : 1;
                if(log10Tick > 0) {
                    typeFormat = formats[floor(log10Tick / 3)] || EXPONENTIAL;
                } else {
                    if(log10Tick < -4) {
                        typeFormat = EXPONENTIAL;
                    } else {
                        precision = undefined;
                    }
                }
            } else {
                if(separatedTickInterval.length > 1 && !isExponential(tickInterval)) {
                    precision = separatedTickInterval[1].length;
                    typeFormat = formats[indexOfFormat];
                } else {
                    if(isExponential(tickInterval) && (stringTick.indexOf(".") !== -1 || isExponential(tick))) {
                        typeFormat = EXPONENTIAL;
                        if(!isExponential(tick)) {
                            stringTick = stringTick.split(".")[1];
                            var precisionFromTickInterval = getNoZeroIndex(stringTick);

                            if(stringTick[precisionFromTickInterval + 1] && stringTick[precisionFromTickInterval + 1] !== "0") {
                                precision = 1;
                            }
                            if(stringTick[precisionFromTickInterval + 2] && stringTick[precisionFromTickInterval + 2] !== "0") {
                                precision = 2;
                            }
                        } else {
                            precision = undefined;
                        }
                    } else {
                        tickIntervalIndex = floor(log10(tickInterval));
                        actualIndex = tickIndex = (tick !== 0) ? floor(log10(abs(tick))) : 1;

                        if(tickIndex - tickIntervalIndex >= 2) {
                            actualIndex = tickIntervalIndex;
                        }

                        indexOfFormat = floor(actualIndex / 3);
                        if(indexOfFormat < 5) {
                            offset = indexOfFormat * 3;
                            if(tickIntervalIndex - offset === 2 && tickIndex >= 3) {
                                indexOfFormat++;
                                offset = indexOfFormat * 3;
                            }
                            typeFormat = formats[indexOfFormat];
                        } else {
                            typeFormat = formats[formats.length - 1];
                        }

                        if(offset !== 0 && stringTick[stringTick.length - offset] !== "0" && typeFormat !== formats[0]) {
                            precision++;
                            if(abs(tickInterval / Math.pow(10, tickIntervalIndex) - 2.5) < 0.0001 && stringTick[stringTick.length - offset + 1] !== "0") {
                                precision++;
                            }
                        } else {
                            if(precision === 0 && tickIndex - tickIntervalIndex === 1 && floor(tickIndex / 3) !== floor(tickIntervalIndex / 3)) {
                                precision = 1;
                                if(abs(tickInterval / Math.pow(10, tickIntervalIndex) - 2.5) < 0.0001) {
                                    precision = 2;
                                }
                            }
                        }
                    }
                }
            }

            format = {
                type: typeFormat,
                precision: precision
            };
        } else {
            typeFormat = dateUtils.getDateFormatByTickInterval(tickInterval);
            if(options.showTransition && ticks.length) {
                indexOfTick = ticks.map(Number).indexOf(+tick);
                if(indexOfTick > -1) {
                    datesDifferences = getDatesDifferences(ticks[indexOfTick - 1], ticks[indexOfTick], ticks[indexOfTick + 1], typeFormat);
                    if(datesDifferences) {
                        typeFormat = formatHelper.getDateFormatByDifferences(datesDifferences, typeFormat);
                        if(isFunction(typeFormat)) {
                            typeFormatter = typeFormat;
                            typeFormat = null;
                        }
                    }
                }
            }
            format = {
                type: typeFormat,
                formatter: typeFormatter
            };
        }
    }

    return _format(tick, { format: format, precision: options.labelOptions.precision });
}

exports.smartFormatter = smartFormatter;
