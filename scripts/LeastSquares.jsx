/* @flow */
"use strict";

type P2 = {x: number; y: number};

var THREE = require("three");
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

function projectErrorForGraph(error: number): number {
  return 10 * (10 - 0.7 * Math.log(error + 1));
}

function leastSquaresObjective(w: P2, pointClasses: [Array<P2>, Array<P2>]): number {
  var rot90w = rot90(w);

  var class0error = 0;
  for (var i = 0; i < pointClasses[0].length; i = i + 1) {
    var p = pointClasses[0][i];
    if (dotProduct(p, w) <= 0) {
      class0error = class0error + findError(rot90w, p);
    }
  }

  var class1error = 0;
  for (var i = 0; i < pointClasses[1].length; i = i + 1) {
    var p = pointClasses[1][i];
    if (dotProduct(p, w) > 0) {
      class1error = class1error + findError(rot90w, p);
    }
  }

  return class0error + class1error;
}

module.exports = {

  projectErrorToRadius: function(error: number): number {
    return 10 - 0.7 * Math.log(error + 1); // errors are roughly ~1132257, so log makes them reasonable.
  },

  projectErrorForGraph: projectErrorForGraph,

  // for every misclassified point, find the distance squared to the separating line
  leastSquaresObjective: leastSquaresObjective,

  projectedError: function(w: P2, pointClasses: [Array<P2>, Array<P2>]): number {
    return projectErrorForGraph(leastSquaresObjective(w, pointClasses));
  },

  polarMeshFunction: function(i: number, j: number, dim: number, pointClasses: [Array<P2>, Array<P2>]): THREE.Vector3 {
    var theta = i * 2 * Math.PI;
    var r = Math.pow(2, 0.7 * j) - 1; // this ensures there are lots of samples near the origin.
    var x = r * Math.cos(theta) * dim;
    var y = r * Math.sin(theta) * dim;
    var lso = leastSquaresObjective({x, y}, pointClasses);
    return new THREE.Vector3(x, y, projectErrorForGraph(lso));
  },

  polarMeshFunction2: function(i: number, j: number, dim: number, pointClasses: [Array<P2>, Array<P2>]): THREE.Vector3 {
    var theta = i * 2 * Math.PI;
    var r = Math.pow(2, 0.7 * j) - 1; // this ensures there are lots of samples near the origin.
    var x = r * Math.cos(theta) * dim;
    var y = r * Math.sin(theta) * dim;
    var lso = leastSquaresObjective({x, y}, pointClasses);
    return new THREE.Vector3(x, y, 0.1 * projectErrorForGraph(lso));
  },
};

