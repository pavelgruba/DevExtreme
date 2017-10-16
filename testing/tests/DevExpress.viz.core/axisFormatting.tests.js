"use strict";

var $ = require("jquery"),
    translator2DModule = require("viz/translators/translator2d"),
    tickGeneratorModule = require("viz/axes/tick_generator"),
    Axis = require("viz/axes/base_axis").Axis,
    vizMocks = require("../../helpers/vizMocks.js"),
    StubTranslator = vizMocks.stubClass(translator2DModule.Translator2D, {
        updateBusinessRange: function(range) {
            this.getBusinessRange.returns(range);
        }
    });

var environment = {
    beforeEach: function() {
        this.canvas = {
            width: 200,
            height: 200,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            originalTop: 0,
            originalBottom: 0,
            originalLeft: 0,
            originalRight: 0
        };

        var that = this;
        sinon.stub(translator2DModule, "Translator2D", function() {
            return that.translator;
        });
        this.renderer = new vizMocks.Renderer();

        this.tickGenerator = sinon.stub(tickGeneratorModule, "tickGenerator", function() {
            return function() {
                return {
                    ticks: that.generatedTicks || [],
                    minorTicks: [],
                    tickInterval: that.generatedTickInterval
                };
            };
        });

        this.translator = new StubTranslator();
        this.translator.stub("getBusinessRange").returns({ addRange: sinon.stub() });
        this.translator.stub("getCanvasVisibleArea").returns({ min: 0, max: 200 }); //for horizontal only
    },
    createAxis: function(options) {
        this.axis = new Axis({
            renderer: this.renderer,
            stripsGroup: this.renderer.g(),
            labelAxesGroup: this.renderer.g(),
            constantLinesGroup: this.renderer.g(),
            axesContainerGroup: this.renderer.g(),
            gridGroup: this.renderer.g(),
            axisType: "xyAxes",
            drawingType: "linear",
            isArgumentAxis: true
        });

        this.axis.updateOptions($.extend(true, {
            crosshairMargin: 0,
            label: {
                visible: false, indentFromAxis: 10, overlappingBehavior: { mode: "none" }
            },
            isHorizontal: options.isHorizontal !== undefined ? options.isHorizontal : true,
            grid: {},
            minorGrid: {},
            tick: {},
            minorTick: {},
            title: {},
            marker: {},
            position: "bottom",
            argumentType: "numeric"
        }, options));

        this.axis.validate();
    },
    testFormat: function(assert, options, ticks, tickInterval, texts) {
        //arrange
        this.createAxis(options);

        this.generatedTicks = ticks;
        this.generatedTickInterval = tickInterval;

        var translator = this.translator;
        ticks.forEach(function(tick) {
            translator.stub("translate").withArgs(tick).returns(100);
        });

        this.renderer.stub("text").reset();

        //act
        this.axis.draw(this.canvas);

        //assert
        var renderer = this.renderer,
            actualTexts = new Array(texts.length).fill(0).map(function(_, i) {
                return renderer.text.getCall(i).args[0];
            });

        assert.deepEqual(actualTexts, texts);
    },
    testTickLabelFormat: function(assert, ticks, tickInterval, texts) {
        this.testFormat(assert, {
            label: {
                visible: true
            }
        }, ticks, tickInterval, texts);
    },
    testConstantLineLabelFormat: function(assert, value, tickInterval, text) {
        this.testFormat(assert, {
            constantLines: [{
                value: value,
                label: {
                    visible: true
                }
            }]
        }, [value], tickInterval, [text]);
    },
    afterEach: function() {
        translator2DModule.Translator2D.restore();
        this.axis.dispose();
        this.axis = null;
        this.tickGenerator.restore();
        this.renderer.dispose();
        this.renderer = null;
        this.translator = null;
    }
};

QUnit.module("Auto formatting. Tick labels. Numeric.", environment);

QUnit.test("formatter should support short notations of numbers", function(assert) {
    this.testTickLabelFormat(assert, [102, 1000], 100, ["102", "1K"]);
    this.testTickLabelFormat(assert, [1000000], 100000, ["1M"]);
    this.testTickLabelFormat(assert, [1000000000], 100000000, ["1B"]);
    this.testTickLabelFormat(assert, [1000000000000], 100000000000, ["1T"]);
    this.testTickLabelFormat(assert, [1000000000000000], 100000000000000, ["1E+15"]);
});

QUnit.test("format numbers with non zero precision", function(assert) {
    this.testTickLabelFormat(assert, [1500], 100, ["1.5K"]);
    this.testTickLabelFormat(assert, [150000], 1000, ["150K"]);
    this.testTickLabelFormat(assert, [20000, 160000], 20000, ["20K", "160K"]);
    this.testTickLabelFormat(assert, [2], 2, ["2"]);
});

QUnit.test("formatting numbers wtih multiplier of tickInterval === 2.5", function(assert) {
    this.testTickLabelFormat(assert, [1250, 8000, 160000], 250, ["1.25K", "8K", "160K"]);
    this.testTickLabelFormat(assert, [2500, 30000], 2500, ["2.5K", "30K"]);
});

QUnit.test("index of tickInterval is not equal index of tick", function(assert) {
    this.testTickLabelFormat(assert, [1002], 2, ["1,002"]);
});

QUnit.test("format negative values", function(assert) {
    this.testTickLabelFormat(assert, [-20], 10, ["-20"]);
});

QUnit.test("format zero value", function(assert) {
    this.testTickLabelFormat(assert, [0], 10, ["0"]);
});

QUnit.test("format values when index of tick above index of tickInterval", function(assert) {
    this.testTickLabelFormat(assert, [18], 2, ["18"]);
});

QUnit.test("format float numbers", function(assert) {
    this.testTickLabelFormat(assert, [18, 18.5], 0.5, ["18", "18.5"]);
    this.testTickLabelFormat(assert, [18.25], 0.25, ["18.25"]);
});

QUnit.test("format float number. tickInterval = 2.5", function(assert) {
    this.testTickLabelFormat(assert, [18.5], 2.5, ["18.5"]);
});

QUnit.test("Misc", function(assert) {
    this.testTickLabelFormat(assert, [10100], 100, ["10.1K"]);
    this.testTickLabelFormat(assert, [10000000000000000000], 1000000000000000000, ["1E+19"]);
});

QUnit.test("format float number. tickInterval = 2.5", function(assert) {
    this.testTickLabelFormat(assert, [18.5], 2.5, ["18.5"]);
});

QUnit.test("Label's hint - use auto formatter", function(assert) {
    //arrange
    var spy = sinon.spy();
    this.createAxis({
        label: {
            visible: true,
            customizeHint: spy
        }
    });

    this.generatedTicks = [1500];
    this.generatedTickInterval = 100;

    //act
    this.axis.draw(this.canvas);

    //assert
    assert.strictEqual(spy.getCall(0).args[0].valueText, "1.5K");
});

QUnit.module("Auto formatting. Constant line labels. Numeric.", environment);

QUnit.test("format numbers with non zero precision", function(assert) {
    this.testConstantLineLabelFormat(assert, 1500, 100, "1.5K");
});

QUnit.module("Auto formatting. Tick labels. Datetime.", environment);

QUnit.test("Discrete axis - format is calculated by ticks", function(assert) {
    this.testFormat(assert, {
        type: "discrete",
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2009, 11, 1),
        new Date(2010, 0, 1),
        new Date(2010, 1, 1)
    ], undefined,
    ["December 2009", "January 2010", "February 2010"]);
});

QUnit.module("Auto formatting. Tick labels. Datetime.Continuous axis", environment);

QUnit.test("format is calculated by ticks and tickInterval in years", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1940, 0, 1),
        new Date(1950, 0, 1),
        new Date(1960, 0, 1),
        new Date(1970, 0, 1),
        new Date(1980, 0, 1),
        new Date(1990, 0, 1),
        new Date(2000, 0, 1),
        new Date(2010, 0, 1)
    ], { years: 10 },
    ["1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]);
});

QUnit.test("format is calculated by ticks and tickInterval in quartes (even)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1949, 3, 1),
        new Date(1949, 9, 1),
        new Date(1950, 3, 1),
        new Date(1950, 9, 1),
        new Date(1951, 3, 1),
        new Date(1951, 9, 1),
        new Date(1952, 3, 1),
        new Date(1952, 9, 1)
    ], { quarters: 2 },
    ["April", "October", "1950", "October", "1951", "October", "1952", "October"]);
});

QUnit.test("format is calculated by ticks and tickInterval in quartes (odd)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1950, 6, 1),
        new Date(1951, 3, 1),
        new Date(1952, 0, 1),
        new Date(1952, 9, 1),
        new Date(1953, 6, 1),
        new Date(1954, 3, 1)
    ], { quarters: 3 },
    ["July", "April 1951", "1952", "October", "July 1953", "1954"]);
});

QUnit.test("format is calculated by ticks and tickInterval in years and months", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2000, 3, 1),
        new Date(2002, 5, 1),
        new Date(2004, 7, 1),
        new Date(2006, 9, 1),
        new Date(2008, 11, 1),
        new Date(2010, 1, 1),
        new Date(2012, 3, 1)
    ], { years: 2, months: 2 },
    ["April 2000", "June 2002", "August 2004", "October 2006", "December 2008", "February 2010", "April 2012"]);
});

QUnit.test("format is calculated by ticks and tickInterval in years, months and days", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2000, 3, 1),
        new Date(2001, 5, 4),
        new Date(2002, 7, 7),
        new Date(2003, 9, 10),
        new Date(2004, 11, 13),
        new Date(2005, 1, 16),
        new Date(2006, 3, 19)
    ], { years: 1, months: 2, days: 3 },
    ["4/1/2000", "6/4/2001", "8/7/2002", "10/10/2003", "12/13/2004", "2/16/2005", "4/19/2006"]);
});

QUnit.test("format is calculated by ticks and tickInterval in months", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2010, 3, 1),
        new Date(2010, 4, 1),
        new Date(2010, 5, 1),
        new Date(2010, 6, 1),
        new Date(2010, 7, 1),
        new Date(2010, 8, 1),
        new Date(2010, 9, 1)
    ], { months: 1 },
    ["April", "May", "June", "July", "August", "September", "October"]);
});

QUnit.test("format is calculated by ticks and tickInterval in months (years changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1950, 3, 1),
        new Date(1950, 8, 1),
        new Date(1951, 1, 1),
        new Date(1951, 6, 1),
        new Date(1951, 11, 1),
        new Date(1952, 4, 1),
        new Date(1952, 9, 1),
        new Date(1953, 2, 1),
        new Date(1953, 7, 1)
    ], { months: 5 },
    ["April", "September", "1951", "July", "December", "1952", "October", "1953", "August"]);
});

QUnit.test("format is calculated by ticks and tickInterval in months (years change every tick)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2010, 4, 1),
        new Date(2010, 11, 1),
        new Date(2011, 6, 1),
        new Date(2012, 2, 1),
        new Date(2012, 9, 1),
        new Date(2013, 4, 1),
        new Date(2013, 11, 1)
    ], { months: 7 },
    ["May", "December", "July 2011", "2012", "October", "2013", "December"]);
});

QUnit.test("format is calculated by ticks and tickInterval in months and days (years, months and days changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1950, 0, 16),
        new Date(1950, 4, 31),
        new Date(1950, 9, 16),
        new Date(1951, 2, 3),
        new Date(1951, 6, 18),
        new Date(1951, 11, 3),
        new Date(1952, 3, 18),
        new Date(1952, 8, 2),
        new Date(1953, 0, 17),
        new Date(1953, 5, 1),
    ], { months: 4, days: 15 },
    ["January 16", "May 31", "October 16", "1951", "July 18", "December 3", "1952", "September 2", "1953", "June 1"]);
});

QUnit.test("format is calculated by ticks and tickInterval in weeks", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1950, 1, 5),
        new Date(1950, 1, 19),
        new Date(1950, 2, 5),
        new Date(1950, 2, 19),
        new Date(1950, 3, 2),
        new Date(1950, 3, 16),
        new Date(1950, 3, 30),
        new Date(1950, 4, 14)
    ], { weeks: 2 },
    ["5", "19", "March", "19", "April", "16", "30", "May"]);
});

QUnit.test("format is calculated by ticks and tickInterval in days", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1950, 2, 2),
        new Date(1950, 2, 5),
        new Date(1950, 2, 8),
        new Date(1950, 2, 11),
        new Date(1950, 2, 14),
        new Date(1950, 2, 17),
        new Date(1950, 2, 20)
    ], { days: 3 },
    ["2", "5", "8", "11", "14", "17", "20"]);
});

QUnit.test("format is calculated by ticks and tickInterval in days (month changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(1950, 2, 12),
        new Date(1950, 2, 22),
        new Date(1950, 3, 1),
        new Date(1950, 3, 11),
        new Date(1950, 3, 21),
        new Date(1950, 4, 1),
        new Date(1950, 4, 11),
        new Date(1950, 4, 21)
    ], { days: 10 },
    ["12", "22", "April", "11", "21", "May", "11", "21"]);
});

QUnit.test("format is calculated by ticks and tickInterval in days (year, month changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 10, 29),
        new Date(2015, 11, 6),
        new Date(2015, 11, 14),
        new Date(2015, 11, 22),
        new Date(2015, 11, 30),
        new Date(2016, 0, 7),
        new Date(2016, 0, 15),
        new Date(2016, 0, 23),
        new Date(2016, 0, 31),
        new Date(2016, 1, 8)
    ], { days: 8 },
    ["29", "December", "14", "22", "30", "January 2016", "15", "23", "31", "February"]);
});

QUnit.test("format is calculated by ticks and tickInterval in hours", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 14, 2),
        new Date(2015, 11, 14, 4),
        new Date(2015, 11, 14, 6),
        new Date(2015, 11, 14, 8),
        new Date(2015, 11, 14, 10),
        new Date(2015, 11, 14, 12),
        new Date(2015, 11, 14, 14),
        new Date(2015, 11, 14, 16)
    ], { hours: 2 },
    ["2:00 AM", "4:00 AM", "6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in hours (days changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 14, 10),
        new Date(2015, 11, 14, 16),
        new Date(2015, 11, 14, 22),
        new Date(2015, 11, 15, 4),
        new Date(2015, 11, 15, 10),
        new Date(2015, 11, 15, 16),
        new Date(2015, 11, 15, 22),
        new Date(2015, 11, 16, 4),
    ], { hours: 6 },
    ["10:00 AM", "4:00 PM", "10:00 PM", "15", "10:00 AM", "4:00 PM", "10:00 PM", "16"]);
});

QUnit.test("format is calculated by ticks and tickInterval in days and hours", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 14, 10),
        new Date(2015, 11, 15, 16),
        new Date(2015, 11, 16, 22),
        new Date(2015, 11, 17, 4),
        new Date(2015, 11, 18, 10),
        new Date(2015, 11, 19, 16),
        new Date(2015, 11, 20, 22),
        new Date(2015, 11, 21, 4),
    ], { days: 1, hours: 6 },
    ["14 10:00 AM", "15 4:00 PM", "16 10:00 PM", "17 4:00 AM", "18 10:00 AM", "19 4:00 PM", "20 10:00 PM", "21 4:00 AM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in days and hours (year, month changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 28, 10),
        new Date(2015, 11, 29, 16),
        new Date(2015, 11, 30, 22),
        new Date(2015, 11, 31, 4),
        new Date(2016, 0, 1, 10),
        new Date(2016, 0, 2, 16),
        new Date(2016, 0, 3, 22)
    ], { days: 1, hours: 6 },
    ["28 10:00 AM", "29 4:00 PM", "30 10:00 PM", "31 4:00 AM", "January 2016", "2 4:00 PM", "3 10:00 PM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in years, days and hours", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2010, 0, 1, 10),
        new Date(2011, 0, 3, 16),
        new Date(2012, 0, 5, 22),
        new Date(2013, 0, 7, 4),
        new Date(2014, 0, 9, 10),
        new Date(2015, 0, 11, 16),
        new Date(2016, 0, 13, 22)
    ], { years: 1, days: 2, hours: 6 },
    ["2010", "2011", "2012", "2013", "2014", "2015", "2016"]);
});

QUnit.test("format is calculated by ticks and tickInterval in years, months and hours", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2010, 0, 1, 10),
        new Date(2011, 2, 1, 16),
        new Date(2012, 4, 1, 22),
        new Date(2013, 6, 1, 4),
        new Date(2014, 8, 1, 10),
        new Date(2015, 10, 1, 16)
    ], { years: 1, months: 2, hours: 6 },
    ["January 2010", "March 2011", "May 2012", "July 2013", "September 2014", "November 2015"]);
});

QUnit.test("format is calculated by ticks and tickInterval in hours and minutes (day changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 14, 18, 10),
        new Date(2015, 11, 14, 20, 25),
        new Date(2015, 11, 14, 22, 40),
        new Date(2015, 11, 15, 0, 55),
        new Date(2015, 11, 15, 3, 10),
        new Date(2015, 11, 15, 5, 25)
    ], { hours: 2, minutes: 15 },
    ["6:10 PM", "8:25 PM", "10:40 PM", "15", "3:10 AM", "5:25 AM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in hours and minutes (month changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 4, 31, 18, 10),
        new Date(2015, 4, 31, 20, 25),
        new Date(2015, 4, 31, 22, 40),
        new Date(2015, 5, 1, 0, 55),
        new Date(2015, 5, 1, 3, 10),
        new Date(2015, 5, 1, 5, 25)
    ], { hours: 2, minutes: 15 },
    ["6:10 PM", "8:25 PM", "10:40 PM", "June 1", "3:10 AM", "5:25 AM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in days, hours and minutes (years changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 26, 18, 10),
        new Date(2015, 11, 28, 20, 25),
        new Date(2015, 11, 30, 22, 40),
        new Date(2016, 0, 1, 0, 55),
        new Date(2016, 0, 3, 3, 10),
        new Date(2016, 0, 5, 5, 25)
    ], { days: 2, hours: 2, minutes: 15 },
    ["26 6:10 PM", "28 8:25 PM", "30 10:40 PM", "January 2016", "3 3:10 AM", "5 5:25 AM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in minutes and seconds", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 26, 18, 10, 10),
        new Date(2015, 11, 26, 18, 25, 30),
        new Date(2015, 11, 26, 18, 40, 50),
        new Date(2015, 11, 26, 18, 56, 10)
    ], { minutes: 15, seconds: 20 },
    ["6:10:10 PM", "6:25:30 PM", "6:40:50 PM", "6:56:10 PM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in minutes and seconds (day changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 11, 27, 23, 25, 30),
        new Date(2015, 11, 27, 23, 40, 50),
        new Date(2015, 11, 27, 23, 56, 10),
        new Date(2015, 11, 28, 0, 11, 30),
        new Date(2015, 11, 28, 0, 26, 50)
    ], { minutes: 15, seconds: 20 },
    ["11:25:30 PM", "11:40:50 PM", "11:56:10 PM", "28 12:11 AM", "12:26:50 AM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in minutes and seconds (month, day changed)", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 4, 31, 23, 25, 30),
        new Date(2015, 4, 31, 23, 40, 50),
        new Date(2015, 4, 31, 23, 56, 10),
        new Date(2015, 5, 1, 0, 11, 30),
        new Date(2015, 5, 1, 0, 26, 50)
    ], { minutes: 15, seconds: 20 },
    ["11:25:30 PM", "11:40:50 PM", "11:56:10 PM", "June 1 12:11 AM", "12:26:50 AM"]);
});

QUnit.test("format is calculated by ticks and tickInterval in seconds", function(assert) {
    this.testFormat(assert, {
        argumentType: "datetime",
        label: {
            visible: true
        }
    }, [
        new Date(2015, 4, 31, 23, 25, 30),
        new Date(2015, 4, 31, 23, 25, 50),
        new Date(2015, 4, 31, 23, 26, 10),
        new Date(2015, 4, 31, 23, 26, 30),
        new Date(2015, 4, 31, 23, 26, 50),
        new Date(2015, 4, 31, 23, 27, 10),
        new Date(2015, 4, 31, 23, 27, 30),
        new Date(2015, 4, 31, 23, 27, 50),
        new Date(2015, 4, 31, 23, 28, 10),
    ], { seconds: 20 },
    ["11:25:30 PM", "11:25:50 PM", "11:26 PM", "11:26:30 PM", "11:26:50 PM", "11:27 PM", "11:27:30 PM", "11:27:50 PM", "11:28 PM"]);
});

QUnit.module("Custom formatting. Tick labels", environment);

QUnit.test("Currency format", function(assert) {
    this.createAxis({
        label: {
            format: "currency",
            precision: 3,
            visible: true
        }
    });
    this.generatedTicks = [0, 1, 2];
    this.translator.stub("translate").withArgs(1).returns(100);
    this.translator.stub("translate").withArgs(2).returns(100);
    this.translator.stub("translate").withArgs(3).returns(100);

    this.axis.draw(this.canvas);

    assert.equal(this.renderer.text.callCount, 3, "number of rendered labels");
    assert.equal(this.renderer.text.getCall(0).args[0], "$0.000");
    assert.equal(this.renderer.text.getCall(1).args[0], "$1.000");
    assert.equal(this.renderer.text.getCall(2).args[0], "$2.000");
});

QUnit.test("Date format with custom", function(assert) {
    this.createAxis({
        label: {
            format: "month",
            precision: 2,
            visible: true
        }
    });
    this.generatedTicks = [new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1)];
    this.axis.draw(this.canvas);

    assert.equal(this.renderer.text.callCount, 3, "number of rendered labels");
    assert.equal(this.renderer.text.getCall(0).args[0], "February");
    assert.equal(this.renderer.text.getCall(1).args[0], "March");
    assert.equal(this.renderer.text.getCall(2).args[0], "April");
});

QUnit.test("setPercentLabelFormat for default format", function(assert) {
    this.createAxis({});

    this.axis.setPercentLabelFormat();

    assert.equal(this.axis.getOptions().label.format, "percent");
});

QUnit.test("setPercentLabelFormat for auto set up format (datetime)", function(assert) {
    this.createAxis({});
    this.generatedTicks = [new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1)];

    this.axis.draw(this.canvas);
    this.axis.setPercentLabelFormat();

    assert.equal(this.axis.getOptions().label.format, "percent");
});

QUnit.test("resetAutoLabelFormat for default format", function(assert) {
    this.createAxis({});

    this.axis.setPercentLabelFormat();
    this.axis.resetAutoLabelFormat();

    assert.equal(this.axis.getOptions().label.format, undefined, "default format");
});

QUnit.test("resetAutoLabelFormat for auto set up format (datetime without setPercentLabelFormat call)", function(assert) {
    this.createAxis({});
    this.generatedTicks = [new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1)];

    this.axis.draw(this.canvas);

    this.axis.resetAutoLabelFormat();

    assert.equal(this.axis.getOptions().label.format, undefined, "default format");
});

QUnit.test("setPercentLabelFormat for user format", function(assert) {
    this.createAxis({
        label: {
            format: "fixedPoint"
        }
    });

    this.axis.setPercentLabelFormat();

    assert.equal(this.axis.getOptions().label.format, "fixedPoint", "user format");
});

QUnit.test("resetAutoLabelFormat for user format", function(assert) {
    this.createAxis({
        label: {
            format: "fixedPoint"
        }
    });

    this.axis.setPercentLabelFormat();
    this.axis.resetAutoLabelFormat();

    assert.equal(this.axis.getOptions().label.format, "fixedPoint", "user format");
});

QUnit.module("getFormattedValue", environment);

QUnit.test("No value - return null", function(assert) {
    this.createAxis({
        label: {
            visible: false
        }
    });
    this.generatedTickInterval = 100;
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue(undefined);

    assert.strictEqual(result, null);
});

QUnit.test("No format specified - use auto format", function(assert) {
    this.createAxis({
        label: {
            visible: false
        }
    });
    this.generatedTickInterval = 100;
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue(1002);

    assert.strictEqual(result, "1K");
});

QUnit.test("Value is string - retrun as is", function(assert) {
    this.createAxis({
        label: {
            format: "currency",
            visible: false
        }
    });
    this.generatedTickInterval = 100;
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue("1002");

    assert.strictEqual(result, "1002");
});

QUnit.test("Axis label has format - use axis label format", function(assert) {
    this.createAxis({
        label: {
            format: {
                type: "currency",
                precision: 3
            },
            visible: false
        }
    });
    this.generatedTickInterval = 100;
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue(1002);

    assert.strictEqual(result, "$1,002.000");
});

QUnit.test("Pass options with format, axis label has format - use passed format", function(assert) {
    this.createAxis({
        label: {
            format: {
                type: "currency",
                precision: 3
            },
            visible: false
        }
    });
    this.generatedTickInterval = 100;
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue(1002, { format: { type: "fixedPoint", precision: 2 } });

    assert.strictEqual(result, "1,002.00");
});

QUnit.test("T297683. Axis label has format with precision = 0", function(assert) {
    this.createAxis({
        label: {
            format: "fixedPoint",
            precision: 0
        }
    });
    this.generatedTickInterval = 100;
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue(2.53);

    assert.strictEqual(result, "3");
});

QUnit.test("T297683. Pass options and point - check customizeText arguments", function(assert) {
    var customizeText = sinon.spy(function(value) {
        return "customized";
    });

    this.createAxis({
        label: {
            format: {
                type: "currency",
                precision: 3
            },
            visible: false
        }
    });
    this.generatedTickInterval = 100;
    this.axis.setBusinessRange({ min: 10, max: 20 });
    this.axis.draw(this.canvas);

    var result = this.axis.getFormattedValue(2.53, { customizeText: customizeText }, "passedPoint");

    assert.equal(customizeText.callCount, 1);
    assert.strictEqual(customizeText.firstCall.args[0], customizeText.firstCall.thisValue);
    assert.deepEqual(customizeText.firstCall.args[0], { valueText: "$2.530", value: 2.53, point: "passedPoint", min: 10, max: 20 });
    assert.strictEqual(result, "customized");
});

QUnit.module("Date markers", environment);

QUnit.test("No custom format - use auto formatting", function(assert) {
    //arrange
    var date0 = new Date(2011, 5, 29, 0, 0, 0),
        date1 = new Date(2011, 5, 30, 0, 0, 0),
        date2 = new Date(2011, 6, 1, 0, 0, 0),
        date3 = new Date(2011, 6, 2, 0, 0, 0),
        date4 = new Date(2011, 6, 2, 23, 59, 59);

    this.createAxis({
        isHorizontal: true,
        argumentType: "datetime",
        marker: {
            visible: true,
            label: {}
        }
    });

    this.axis.setBusinessRange({ minVisible: date0, maxVisible: date4, invert: false, addRange: function() { } });

    this.generatedTicks = [date0, date1, date2, date3, date4];
    this.generatedTickInterval = "hour";

    //act
    this.axis.draw(this.canvas);

    var text = this.renderer.text;
    assert.strictEqual(text.getCall(0).args[0], "29");
    assert.strictEqual(text.getCall(1).args[0], "Thursday, 30");
    assert.strictEqual(text.getCall(2).args[0], "July 1");
    assert.strictEqual(text.getCall(3).args[0], "Saturday, 2");
});

QUnit.test("Custom format - use custom format", function(assert) {
    //arrange
    var date0 = new Date(2011, 5, 29, 0, 0, 0),
        date1 = new Date(2011, 5, 30, 0, 0, 0),
        date2 = new Date(2011, 6, 1, 0, 0, 0),
        date3 = new Date(2011, 6, 2, 0, 0, 0),
        date4 = new Date(2011, 6, 2, 23, 59, 59);

    this.createAxis({
        isHorizontal: true,
        argumentType: "datetime",
        marker: {
            visible: true,
            label: {
                format: "month"
            }
        }
    });

    this.axis.setBusinessRange({ minVisible: date0, maxVisible: date4, invert: false, addRange: function() { } });

    this.generatedTicks = [date0, date1, date2, date3, date4];
    this.generatedTickInterval = "hour";

    //act
    this.axis.draw(this.canvas);

    var text = this.renderer.text;

    assert.strictEqual(text.getCall(0).args[0], "June");
    assert.strictEqual(text.getCall(1).args[0], "June");
    assert.strictEqual(text.getCall(2).args[0], "July");
    assert.strictEqual(text.getCall(3).args[0], "July");
});

QUnit.test("Tick labels do not show date transition", function(assert) {
    //arrange
    var date0 = new Date(2011, 5, 30, 0, 0, 0),
        date1 = new Date(2011, 5, 30, 12, 0, 0),
        date2 = new Date(2011, 6, 1, 0, 0, 0),
        date3 = new Date(2011, 6, 1, 12, 0, 0);

    this.createAxis({
        isHorizontal: true,
        argumentType: "datetime",
        label: {
            visible: true
        },
        marker: {
            visible: true,
            label: {}
        }
    });

    this.axis.setBusinessRange({ minVisible: date0, maxVisible: date3, invert: false, addRange: function() { } });

    this.generatedTicks = [date0, date1, date2, date3];
    this.generatedTickInterval = "hour";

    //act
    this.axis.draw(this.canvas);

    var text = this.renderer.text;
    assert.strictEqual(text.getCall(0).args[0], "12:00 AM");
    assert.strictEqual(text.getCall(1).args[0], "12:00 PM");
    assert.strictEqual(text.getCall(2).args[0], "12:00 AM");
    assert.strictEqual(text.getCall(3).args[0], "12:00 PM");
});

QUnit.test("Custom format for tick labels - use custom format", function(assert) {
    //arrange
    var date0 = new Date(2011, 5, 30, 0, 0, 0),
        date1 = new Date(2011, 5, 30, 12, 0, 0),
        date2 = new Date(2011, 6, 1, 0, 0, 0),
        date3 = new Date(2011, 6, 1, 12, 0, 0);

    this.createAxis({
        isHorizontal: true,
        argumentType: "datetime",
        label: {
            visible: true,
            format: "month"
        },
        marker: {
            visible: true,
            label: {}
        }
    });

    this.axis.setBusinessRange({ minVisible: date0, maxVisible: date3, invert: false, addRange: function() { } });

    this.generatedTicks = [date0, date1, date2, date3];
    this.generatedTickInterval = "hour";

    //act
    this.axis.draw(this.canvas);

    var text = this.renderer.text;
    assert.strictEqual(text.getCall(0).args[0], "June");
    assert.strictEqual(text.getCall(1).args[0], "June");
    assert.strictEqual(text.getCall(2).args[0], "July");
    assert.strictEqual(text.getCall(3).args[0], "July");
});
