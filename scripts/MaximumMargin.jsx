/* @flow */
type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];

"use strict";

var {modulus, classTransform} = require("./VectorUtils.jsx");


// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  var pointGroups = [0, 1].map(function(label) {return {label, points: pointClasses[label]};});

  var minimumMargin = Infinity;

  for (var k = 0, maxk = pointGroups.length; k < maxk; k = k + 1) {
    var {points, label} = pointGroups[k];

    for (var i = 0, l = points.length; i < l; i = i + 1) {
      var p = points[i];
      var addOrSubtract = -1 * classTransform(label);
      minimumMargin = Math.min(minimumMargin, addOrSubtract * (w.x * p.x + w.y * p.y));
    }
  }

  // normalise by w.
  return minimumMargin / modulus(w);
}

module.exports = {objective};
