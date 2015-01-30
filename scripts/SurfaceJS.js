var grv = require('./GregRossVis.js')


module.exports = function setUp(div) {
    var numRows = 45;
    var numCols = 45;

    var tooltipStrings = new Array();

    var data = {
        values: [],
        getNumberOfRows: function () {
            return numRows;
        },
        getNumberOfColumns: function () {
            return numCols;
        },
        getFormattedValue: function (i, j) {
            return this.values[i][j];
        }
    };

    var d = 360 / numRows;
    var idx = 0;

    for (var i = 0; i < numRows; i++) {

        data.values.push([]);

        for (var j = 0; j < numCols; j++) {
            var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0));

            data.values[i].push(value / 4.0);

            tooltipStrings[idx] = "x:" + i + ", y:" + j + " = " + value;
            idx++;
        }
    }

    var surfacePlot = new grv.SurfacePlot(div);

    // Don't fill polygons in IE. It's too slow.
    var fillPly = true;

    // Define a colour gradient.
    var colour1 = {
        red: 0,
        green: 0,
        blue: 255
    };
    var colour2 = {
        red: 0,
        green: 255,
        blue: 255
    };
    var colour3 = {
        red: 0,
        green: 255,
        blue: 0
    };
    var colour4 = {
        red: 255,
        green: 255,
        blue: 0
    };
    var colour5 = {
        red: 255,
        green: 0,
        blue: 0
    };
    var colours = [colour1, colour2, colour3, colour4, colour5];

    // Axis labels.
    var xAxisHeader = "X";
    var yAxisHeader = "Y";
    var zAxisHeader = "Z";

    var options = {
        xPos: 50,
        yPos: 50,
        width: 500,
        height: 500,
        colourGradient: colours,
        fillPolygons: fillPly,
        tooltips: tooltipStrings,
        xTitle: xAxisHeader,
        yTitle: yAxisHeader,
        zTitle: zAxisHeader,
        restrictXRotation: false
    };

    surfacePlot.draw(data, options);
};