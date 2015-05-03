/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransformZeroOne, dotProduct, scale, add, modulus} = require("./VectorUtils.jsx");

function sigmoid(wx): number {
  return 1 / (1 + Math.exp(-wx));
}

function logSigmoid(wx): number {
  return -Math.log(1 + Math.exp(-wx));
}

function logOneMinusSigmoid(wx): number {
  return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
}

var ANTI_OVERFLOW_FUDGE = 1 / 200;

// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  var smallerW = scale(ANTI_OVERFLOW_FUDGE)(w);
  var points = pointClassesTransformZeroOne(pointClasses);

  // we're actually trying to minimise this.
  var sum = -points
    .map(function sumElement(point: P2t): number { // crucially, t is either 0 or 1.
      var wx = dotProduct(smallerW, point);
      return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
    })
    .reduce(function(a, b) {return a + b;}, 0);

  // flip representation because Surface.jsx shows maximisation
  return 100 - Math.log(1 + sum) * 10;
}


var NU = 0.03;
var ACCEPTING_GRAD = 1; // we reach this in ~ 300 loops, but it takes more like 6000 to reach 0.1!
var MAX_STOPS = 500;

function optimise(startW: P2, pointClasses: PointClasses): Array<P2> {
  var points = pointClassesTransformZeroOne(pointClasses);
  var len = points.length;

  function gradient(w: P2): P2 {
    var smallerW = scale(ANTI_OVERFLOW_FUDGE)(w);
    var grad = {x: 0, y: 0};

    for (var i = 0; i < len; i = i + 1) {
      var point = points[i];
      var scaleFactor = sigmoid(smallerW.x * point.x + smallerW.y * point.y) - point.t;
      grad.x = grad.x + scaleFactor * point.x;
      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
    }
    return grad;
  }

  var w = startW;
  var grad;
  var stops = [w];
  while (grad = gradient(w, pointClasses), modulus(grad) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
    w = add(w)(scale(-1 * NU)(grad));
    stops.push(w);
  }
  return stops;
}

module.exports = {
  objective: objective,
  optimise: optimise
};
