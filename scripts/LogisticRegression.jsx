/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransform, dotProduct, scale} = require("./VectorUtils.jsx");



function logSigmoid(wx): number {
  return -Math.log(1 + Math.exp(-wx));
}

function logOneMinusSigmoid(wx): number {
  return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
}

// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  var smallerW = scale(1 / 200)(w); // scaling hack to prevent overflows!

  var points = pointClassesTransform(pointClasses);

  var sum = points.map(function sumElement(point: P2t): number {
    var wx = dotProduct(smallerW, point);
    return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
  });
  var v = sum.reduce(function(a, b) {return a + b;}, 0);
  return -20 + 10 * Math.log(-v); // I think this Math.log is absorbing an infinity or something...
}

module.exports = {
  objective: objective,
};
