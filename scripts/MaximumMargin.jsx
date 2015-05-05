/* @flow */
type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];

"use strict";

var {modulus} = require("./VectorUtils.jsx");


// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  // compute the `margin` for all points in pointClasses
  var [class0, class1] = pointClasses;

  var minimumMargin = Infinity;

  for (var i = 0, l = class0.length; i < l; i = i + 1) {
    var p = class0[i];
    minimumMargin = Math.min(minimumMargin, w.x * p.x + w.y * p.y);
  }

  for (var j = 0, m = class1.length; j < m; j = j + 1) {
    var q = class1[j];
    minimumMargin = Math.min(minimumMargin, -1 * (w.x * q.x + w.y * q.y));
  }

  // normalise by w.
  return minimumMargin / modulus(w);
}

module.exports = {objective};
