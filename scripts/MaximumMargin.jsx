/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";



// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  // compute the `margin` for all points in pointClasses
  // find the minimum of these
  // normalise by w.
}


// optimisation algorithm is used to overlay the line
// function optimise(startWeight: P2, pointClasses: PointClasses): Array<P2> {
//   return [];
// }
