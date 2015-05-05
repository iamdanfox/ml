/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransform, dotProduct, modulus} = require("./VectorUtils.jsx");


// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {

  // compute the `margin` for all points in pointClasses
  var [class0, class1] = pointClasses;

  // var margins = points.map( (point) => -1 * point.t * dotProduct(w, point) ); // -1 fudge
  var margins0 = class0.map( (point) => dotProduct(w, point) );
  var minimumMargin0 = Math.min.apply(null, margins0);

  var margins1 = class1.map( (point) => -1 * dotProduct(w, point) );
  var minimumMargin1 = Math.min.apply(null, margins1);

  var minimumMargin = Math.min(minimumMargin0, minimumMargin1);
  // find the minimum of these
  // normalise by w.
  var normalisationFactor = 1 / modulus(w);
  return normalisationFactor * minimumMargin;
}

module.exports = {objective};
