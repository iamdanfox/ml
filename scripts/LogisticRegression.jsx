/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>, Array<P2>];

"use strict";

var {pointClassesTransformZeroOne,  scale, add, modulus} = require("./VectorUtils.jsx");

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
function objective(smallW: P2, smallPointClasses: PointClasses): number {
  var [class0, class1] = smallPointClasses;
  var sum = 0;

  for (var i = 0, len = class0.length; i < len; i = i + 1) {
    var p = class0[i];
    sum = sum - Math.log(1 + Math.exp(-200 * (smallW.x * p.x + smallW.y * p.y))); // inlined logSigmoid
  }

  for (var j = 0, len2 = class1.length; j < len2; j = j + 1) {
    var q = class1[j];
    sum = sum - Math.log(Math.exp(200 * (smallW.x * q.x + smallW.y * q.y)) + 1); // inlined logOneMinusSigmoid
  }

  // flip representation because Surface.jsx shows maximisation
  return (7 - Math.log(1 - sum)) / 10;
}



var NU = 0.03;
var ACCEPTING_GRAD = 1 / 200; // we reach this in ~ 300 loops
var MAX_STOPS = 250;

function optimise(smallStartW: P2, smallPointClasses: PointClasses): Array<P2> {

  var points = pointClassesTransformZeroOne(smallPointClasses);
  var len = points.length;

  function gradient(w: P2): P2 {
    var grad = {x: 0, y: 0};

    for (var i = 0; i < len; i = i + 1) {
      var point = points[i];
      var scaleFactor = sigmoid(200 * (w.x * point.x + w.y * point.y)) - point.t;
      grad.x = grad.x + scaleFactor * point.x;
      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
    }
    return grad;
  }

  var w = smallStartW;
  var grad;
  var stops = [w];
  while (grad = gradient(w), modulus(grad) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
    w.x = w.x - NU * grad.x;
    w.y = w.y - NU * grad.y;
    stops.push(w);
  }
  return stops;
}


function fastOptimise(smallStartW: P2, smallPointClasses: PointClasses): number {

  var points = pointClassesTransformZeroOne(smallPointClasses);
  var len = points.length;

  function gradient(w: P2): P2 {
    var grad = {x: 0, y: 0};

    for (var i = 0; i < len; i = i + 1) {
      var point = points[i];
      var scaleFactor = sigmoid(200 * (w.x * point.x + w.y * point.y)) - point.t;
      grad.x = grad.x + scaleFactor * point.x;
      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
    }
    return grad;
  }

  var w = smallStartW;
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
  objective: objective,
  optimise: optimise,
  fastOptimise: fastOptimise
};
