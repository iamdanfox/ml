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
  var pointGroups = [0, 1].map(function(label) {return {label, points: smallPointClasses[label]}});
  var sum = 0;

  for (var k = 0, maxk = pointGroups.length; k < maxk; k = k + 1) {
    var {points, label} = pointGroups[k];
    if (label === 0) {
      for (var i = 0, len = points.length; i < len; i = i + 1) {
        var p = points[i];
        sum = sum - Math.log(1 + Math.exp(-200 * (smallW.x * p.x + smallW.y * p.y))); // inlined logSigmoid
      }
    } else {
      for (var j = 0, len2 = points.length; j < len2; j = j + 1) {
        var q = points[j];
        sum = sum - Math.log(Math.exp(200 * (smallW.x * q.x + smallW.y * q.y)) + 1); // inlined logOneMinusSigmoid
      }
    }
  }

  // flip representation because Surface.jsx shows maximisation
  return (7 - Math.log(1 - sum)) / 10;
}



var NU = 0.03;
var ACCEPTING_GRAD = 1 / 200; // we reach this in ~ 300 loops
var MAX_STOPS = 250;

function optimise(smallStartW: P2, smallPointClasses: PointClasses): Array<P2> {
  var pointGroups = [0, 1].map(function(label) {return {label, points: smallPointClasses[label]}});

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

  var w = smallStartW;
  var grad;
  var stops = [w];
  while (grad = gradient(w), modulus(grad) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
    w = add(w)(scale(-1 * NU)(grad));
    stops.push(w);
  }
  return stops;
}


function fastOptimise(smallStartW: P2, smallPointClasses: PointClasses): number {
  var pointGroups = [0, 1].map(function(label) {return {label, points: smallPointClasses[label]}});

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
  objective: objective,
  optimise: optimise,
  fastOptimise: fastOptimise
};
