/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransform, dotProduct, modulus} = require("./VectorUtils.jsx");


// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  // compute the `margin` for all points in pointClasses
  var points = pointClassesTransform(pointClasses);
  var margins = points.map( (point) => point.t * dotProduct(w, point) );
  // find the minimum of these
  var minimumMargin = Math.min.apply(null, margins);
  // normalise by w.
  var normalisationFactor = 1 / modulus(w);
  return normalisationFactor * minimumMargin;
}


// optimisation algorithm is used to overlay the line
// function optimise(startWeight: P2, pointClasses: PointClasses): Array<P2> {
//   return [];
// }

module.exports = {
  objective: objective,
};
