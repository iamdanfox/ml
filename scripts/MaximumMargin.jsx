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

  if (class0.length > 0) {
    for (var i = class0.length; i = i - 1;) {
      var p = class0[i];
      minimumMargin = Math.min(minimumMargin, w.x * p.x + w.y * p.y)
    }
  }

  if (class1.length > 0) {
    for (var i = class1.length; i = i - 1;) {
      var p = class1[i];
      minimumMargin = Math.min(minimumMargin, -1 * (w.x * p.x + w.y * p.y));
    }
  }

  // normalise by w.
  return minimumMargin / modulus(w);
}

module.exports = {objective};
