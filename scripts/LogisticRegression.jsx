/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransform, dotProduct} = require("./VectorUtils.jsx");
var Decimal = require('decimal.js');
Decimal.config({
  errors: false // otherwise the constructor won't accept numbers like -134.94875696261266 (> 15 significant digits)
});


function preciseSigmoid(z) { // e.g. z = 2
  var minusZ = new Decimal(-z);         // minusZ = -2
  var exp = minusZ.exponential(); // already base e. exp = 0.135...
  var denominator = exp.plus(1);
  return Decimal.ONE.dividedBy(denominator);
}

function preciseLogSigmoid(z) {
  return preciseSigmoid(z).naturalLogarithm();
}

function preciseLogOneMinusSigmoid(z) {
  return Decimal.ONE.minus(preciseSigmoid(z)).naturalLogarithm();
}


// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {

  var points = pointClassesTransform(pointClasses);

  var sum = points.map(function sumElement(point: P2t): number {
    var wx = dotProduct(w, point);
    return point.t * preciseLogSigmoid(wx).toNumber() + (1 - point.t) * preciseLogOneMinusSigmoid(wx).toNumber();
  });
  var v = sum.reduce(function(a, b) {return a + b;}, 0);
  return v;
}

module.exports = {
  objective: objective,
};
