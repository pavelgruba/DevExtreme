"use strict";

var _format = require("../core/format"),
    formatHelper = require("../../format_helper"),
    typeUtils = require("../../core/utils/type"),
    dateUtils = require("../../core/utils/date"),
    isDefined = typeUtils.isDefined,
    isFunction = typeUtils.isFunction,
    log10 = Math.log10,
    floor = Math.floor,
    abs = Math.abs,
    CORRECT_TAIL = /\.?0*$/,
    formats = ["fixedPoint", "thousands", "millions", "billions", "trillions", "exponential"];

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
                    if(i > tickFormatIndex) {
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
                        resetDateUnitInterval(prevDifferences, i);
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

function smartFormatter(tick, options) {
    var tickInterval = options.tickInterval,
        tickIntervalIndex,
        tickIndex,
        actualIndex,
        stringTick = abs(tick).toString(),
        precision = 0,
        typeFormat,
        typeFormatter,
        postProcessingRequired = false,
        result,
        offset = 0,
        separatedTickInterval,
        indexOfFormat = 0,
        indexOfTick = -1,
        datesDifferences,
        format = options.labelOptions.format,
        ticks = options.ticks;

    if(!isDefined(format) && isDefined(tickInterval) && options.type !== "discrete") {
        if(options.dataType !== "datetime") {
            separatedTickInterval = tickInterval.toString().split(".");

            if(separatedTickInterval.length > 1) {
                precision = separatedTickInterval[1].length;
                typeFormat = formats[indexOfFormat];
                postProcessingRequired = true;
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

    result = _format(tick, { format: format, precision: options.labelOptions.precision });

    return postProcessingRequired ? result.replace(CORRECT_TAIL, "") : result;
}

exports.smartFormatter = smartFormatter;
