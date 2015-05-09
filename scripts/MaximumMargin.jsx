/* @flow */
type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};

"use strict";

var {modulus, classTransform} = require("./VectorUtils.jsx");


// the objective function is used to generate the surface
function objective(w: P2, pointGroups: Array<PointGrp>): number {
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
  return 0.2 + 0.5 * minimumMargin / modulus(w);
}

module.exports = {
  objective,
  DEFAULT_PARAMS: {},
  paramOptions: function(): Array<number> {
    return [];
  }
};
