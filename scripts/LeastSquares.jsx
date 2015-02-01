/* @flow */
"use strict";

type P2 = {x: number; y: number};

var {rot90: rot90, dotProduct: dotProduct, sizeSquared: sizeSquared} = require("./VectorUtils.jsx");


// returns the square of the distance to rot90w's line
var findError = function(rot90w: P2, point: P2): number {
  // consider a triangle made of the vector `point`, the line `rot90w` and the distance `d`.
  // let `theta` be the angle at the origin
  // trigonometry: d = |point| * sin(theta)
  // we desire d^2
  //           d^2 = |point|^2 * sin^2(theta)
  // trignometric identity
  //           d^2 = |point|^2 * (1 - cos^2(theta))
  // we can find `cos(theta)` using the dot product
  //           d^2 = |point|^2 * (1 - (rot90w . point)^2/(|rot90w| * |point|)^2 )
  // eliminating factors of |point|^2
  //           d^2 = |point|^2 - (rot90w . point)^2 / |rot90w|^2

  var dp: number = dotProduct(rot90w, point);
  return sizeSquared(point) - ( (dp * dp) / sizeSquared(rot90w) );
};

var class0error = function(w: P2, class0points: Array<P2>, rot90w: P2): number {
  var error = 0;
  for (var i = 0; i < class0points.length; i = i + 1) {
    var p = class0points[i];
    if (dotProduct(p, w) <= 0) {
      error = error + findError(rot90w, p);
    }
  }
  return error;
};

var class1error = function(w: P2, class1points: Array<P2>, rot90w: P2): number {
  var error = 0;
  for (var j = 0; j < class1points.length; j = j + 1) {
    var q = class1points[j];
    if (dotProduct(q, w) > 0) {
      error = error + findError(rot90w, q);
    }
  }
  return error;
};

module.exports = {

  projectErrorToRadius: function(error: number): number {
    return 10 - 0.7 * Math.log(error + 1); // errors are roughly ~1132257, so log makes them reasonable.
  },

  projectErrorForGraph: function(error: number): number {
    return 10 * (10 - 0.7 * Math.log(error + 1));
  },

  // for every misclassified point, find the distance squared to the separating line
  leastSquaresObjective: function(w: P2, pointClasses: [Array<P2>, Array<P2>]): number {
    var rot90w = rot90(w);
    var [class0points, class1points] = pointClasses;
    return class0error(w, class0points, rot90w) + class1error(w, class1points, rot90w);
  },
};

