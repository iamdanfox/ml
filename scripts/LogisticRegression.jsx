/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointGrp = {label: number; points: Array<P2>};

"use strict";

var {scale, add, modulus} = require("./VectorUtils.jsx");

function sigmoid(wx): number {
  return 1 / (1 + Math.exp(-wx));
}

// function logSigmoid(wx): number {
//   return -Math.log(1 + Math.exp(-wx));
// }

// function logOneMinusSigmoid(wx): number {
//   return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
// }


// the objective function is used to generate the surface
function objective(smallW: P2, pointGroups: Array<PointGrp>): number {
  var sum = 0;

  pointGroups.filter((pg) => pg.label === 0).forEach(function({points}) {
    for (var i = 0, len = points.length; i < len; i = i + 1) {
      var p = points[i];
      sum = sum - Math.log(1 + Math.exp(-200 * (smallW.x * p.x + smallW.y * p.y))); // inlined logSigmoid
    }
  });

  pointGroups.filter((pg) => pg.label === 1).forEach(function({points}) {
    for (var j = 0, len2 = points.length; j < len2; j = j + 1) {
      var q = points[j];
      sum = sum - Math.log(Math.exp(200 * (smallW.x * q.x + smallW.y * q.y)) + 1); // inlined logOneMinusSigmoid
    }
  });
  // flip representation because Surface.jsx shows maximisation
  return (7 - Math.log(1 - sum)) / 30;
}

var DEFAULT_PARAMS = {
  NU: 0.02,
  ACCEPTING_GRAD: 1 / 200,
  MAX_STOPS: 250
};

var PARAM_OPTIONS = {
  NU: [0.005, 0.01, 0.02, 0.03],
  ACCEPTING_GRAD: [3 / 200, 1 / 200, 1 / 400],
  MAX_STOPS: [150, 250, 450],
}

var NU = 0.02;
var ACCEPTING_GRAD = 1 / 200; // we reach this in ~ 300 loops
var MAX_STOPS = 250;

function optimise(smallStartW: P2, pointGroups: Array<PointGrp>): Array<P2> {
  function gradient(w: P2): P2 {
    var grad = {x: 0, y: 0};

    for (var k = 0; k < pointGroups.length; k = k + 1){
      var {label, points} = pointGroups[k];
      for (var i = 0, l = points.length; i < l; i = i + 1) {
        var p = points[i];
        var scaleFactor = sigmoid(200 * (w.x * p.x + w.y * p.y)) - (1 - label);
        grad.x = grad.x + scaleFactor * p.x;
        grad.y = grad.y + scaleFactor * p.y;
      }
    }

    return grad;
  }

  var w = smallStartW;
  var grad;
  var stops = [w];
  while (grad = gradient(w), modulus(grad) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
    w = add(w)(scale(-1 * NU)(grad));
    stops.push(w);
  }
  return stops;
}


function fastOptimise(smallStartW: P2, pointGroups: Array<PointGrp>): number {
  function gradient(w: P2): P2 {
    var grad = {x: 0, y: 0};

    for (var k = 0, kmax = pointGroups.length; k < kmax; k = k + 1){
      var {label, points} = pointGroups[k];
      for (var i = 0, l = points.length; i < l; i = i + 1) {
        var p = points[i];
        var scaleFactor = sigmoid(200 * (w.x * p.x + w.y * p.y)) - (1 - label);
        grad.x = grad.x + scaleFactor * p.x;
        grad.y = grad.y + scaleFactor * p.y;
      }
    }

    return grad;
  }

  var w = Object.create(smallStartW);
  var grad;
  var stops = 1;
  while (grad = gradient(w), modulus(grad) > ACCEPTING_GRAD && stops < MAX_STOPS) {
    w.x = w.x - NU * grad.x;
    w.y = w.y - NU * grad.y;
    stops = stops + 1;
  }
  return stops;
}



module.exports = {
  objective,
  optimise,
  fastOptimise,
  DEFAULT_PARAMS,
  paramOptions: function(paramName: string): Array<number> {
    return PARAM_OPTIONS[paramName];
  },
};
