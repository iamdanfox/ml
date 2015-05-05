/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>, Array<P2>];

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



// the objective function is used to generate the surface
function objective(smallW: P2, smallPointClasses: PointClasses): number {
  var w = scale(200)(smallW);
  var points = pointClassesTransformZeroOne(smallPointClasses);

  // we're actually trying to minimise this.
  var sum = -points
    .map(function sumElement(point: P2t): number { // crucially, t is either 0 or 1.
      var wx = dotProduct(w, point);
      return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
    })
    .reduce(function(a, b) {return a + b;}, 0);


  // flip representation because Surface.jsx shows maximisation
  // return 3 - sum / 20;
  return (100 - Math.log(1 + sum) * 10) / 200;
}



var NU = 0.03;
var ACCEPTING_GRAD = 1; // we reach this in ~ 300 loops, but it takes more like 6000 to reach 0.1!
var MAX_STOPS = 250;

function optimise(smallStartW: P2, smallPointClasses: PointClasses): Array<P2> {

  var points = pointClassesTransformZeroOne(smallPointClasses);
  var len = points.length;

  function gradient(bigW: P2): P2 {
    var grad = {x: 0, y: 0};

    for (var i = 0; i < len; i = i + 1) {
      var point = points[i];
      var scaleFactor = sigmoid(bigW.x * point.x + bigW.y * point.y) - point.t;
      grad.x = grad.x + scaleFactor * point.x;
      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
    }
    return grad;
  }

  var w = smallStartW;
  var grad;
  var stops = [scale(200)(w)];
  while (grad = gradient(scale(200)(w)), modulus(scale(200)(grad)) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
    w = add(w)(scale(-1 * NU)(grad));
    stops.push(scale(200)(w));
  }
  return stops.map(scale( 1 / 200));
}


function fastOptimise(smallStartW: P2, smallPointClasses: PointClasses): number {

  var points = pointClassesTransformZeroOne(smallPointClasses);
  var len = points.length;

  function gradient(bigW: P2): P2 {
    var grad = {x: 0, y: 0};

    for (var i = 0; i < len; i = i + 1) {
      var point = points[i];
      var scaleFactor = sigmoid(bigW.x * point.x + bigW.y * point.y) - point.t;
      grad.x = grad.x + scaleFactor * point.x;
      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
    }
    return grad;
  }

  var w = smallStartW;
  var grad;
  var stops = 1;
  while (grad = gradient(scale(200)(w)), modulus(scale(200)(grad)) > ACCEPTING_GRAD && stops < MAX_STOPS) {
    w = add(w)(scale(-1 * NU)(grad));
    stops = stops + 1;
  }
  return stops;
}



module.exports = {
  objective: objective,
  optimise: optimise,
  fastOptimise: fastOptimise
};
