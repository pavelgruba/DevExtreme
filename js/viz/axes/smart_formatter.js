"use strict";

var _format = require("../core/format"),
    isDefined = require("../../core/utils/type").isDefined,
    dateUtils = require("../../core/utils/date"),
    log10 = Math.log10,
    floor = Math.floor,
    abs = Math.abs,
    CORRECT_TAIL = /\.?0*$/,
    formats = ["fixedPoint", "thousands", "millions", "billions", "trillions", "exponential"];

function smartFormatter(tick, options) {
    var tickInterval = options.tickInterval,
        tickIntervalIndex,
        tickIndex,
        actualIndex,
        stringTick = abs(tick).toString(),
        precision = 0,
        typeFormat,
        postProcessingRequired = false,
        result,
        offset = 0,
        separatedTickInterval,
        indexOfFormat = 0,
        format = options.labelOptions.format;

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
            if(!options.showTransition) {
                format = {
                    type: dateUtils.getDateFormatByTickInterval(tickInterval)
                };
            }
        }
    }

    result = _format(tick, { format: format, precision: options.labelOptions.precision });

    return postProcessingRequired ? result.replace(CORRECT_TAIL, "") : result;
}

exports.smartFormatter = smartFormatter;
