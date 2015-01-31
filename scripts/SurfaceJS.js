var grv = require('./GregRossVis.js');
var ls = require('./LeastSquares.cjsx');


module.exports = function setUp(div, dim, pointClasses) {
    var num = 24;

    var tooltipStrings = new Array();

    var data = {
        values: [],
        getNumberOfRows: function () {
            return num;
        },
        getNumberOfColumns: function () {
            return num;
        },
        getFormattedValue: function (i, j) {
            return this.values[i][j];
        }
    };

    var d = 360 / num;
    var idx = 0;

    for (var i = 0; i < num; i++) {

        data.values.push([]);

        for (var j = 0; j < num; j++) {

            var scaledI = i * dim / num;
            var scaledJ = j * dim / num;

            var lso = ls.leastSquaresObjective({x:i,y:j}, pointClasses)
            var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0));

            data.values[i].push( ls.projectErrorToRadius(lso) );

            tooltipStrings[idx] = "x:" + i + ", y:" + j;
            idx++;
        }
    }

    var options = {
        xPos: 70,
        yPos: 70,
        width: dim,
        height: dim,
        colourGradient: makeColourGradient(),
        fillPolygons: true,
        tooltips: tooltipStrings,
        xTitle: "X",
        yTitle: "Y",
        zTitle: "Z",
        restrictXRotation: true
    };

    var surfacePlot = new grv.SurfacePlot(div);
    surfacePlot.draw(data, options);
};

function makeColourGradient() {
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
    return [colour1, colour2, colour3, colour4, colour5];
};