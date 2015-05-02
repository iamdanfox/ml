/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransformZeroOne, dotProduct, scale, modulus} = require("./VectorUtils.jsx");



function logSigmoid(wx): number {
  return -Math.log(1 + Math.exp(-wx));
}

function logOneMinusSigmoid(wx): number {
  return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
}

// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  var antiOverflowFudgeFactor = 1 / 200;
  var smallerW = scale(antiOverflowFudgeFactor)(w);

  var points = pointClassesTransformZeroOne(pointClasses);

  var sum = -points
    .map(function sumElement(point: P2t): number { // crucially, t is either 0 or 1.
      var wx = dotProduct(smallerW, point);
      return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
    })
    .reduce(function(a, b) {return a + b;}, 0);
  return 100 - Math.log(1 + sum) * 10;
}

module.exports = {
  objective: objective,
};
