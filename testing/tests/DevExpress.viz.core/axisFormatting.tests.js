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

QUnit.module("Discrete axis.", environment);

QUnit.test("Datetime - single format by ticks", function(assert) {
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
    ], 1, //tickGenerator returns that tickInterval for discrete data
    ["December 2009", "January 2010", "February 2010"]);
});

QUnit.test("Numeric - no format", function(assert) {
    this.testFormat(assert, {
        type: "discrete",
        argumentType: "numeric",
        label: {
            visible: true
        }
    }, [
        10010,
        11001,
        20000
    ], 1, //tickGenerator returns that tickInterval for discrete data
    ["10010", "11001", "20000"]);
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
