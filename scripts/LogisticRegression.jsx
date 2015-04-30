/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransform, dotProduct} = require("./VectorUtils.jsx");


function sigmoid(z: number): number {
  return 1 / (1 + Math.pow(Math.E, -z));
}

function logSigmoid(wx): number {
  return Math.log(sigmoid(wx));
}

function logOneMinusSigmoid(wx): number {
  return Math.log(1) - Math.log((Math.pow(Math.E, wx) + 1 ));
}

// PRECISION FREAKOUTS... TODO: investigate `Big.js`

// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {

  var points = pointClassesTransform(pointClasses);

  var sum = points.map(function sumElement(point: P2t): number {
    var wx = dotProduct(w, point);
    console.log(sigmoid(wx));
    return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
  });
  var v = sum.reduce(function(a, b) {return a + b;}, 0);
  return v;
}

module.exports = {
  objective: objective,
};
