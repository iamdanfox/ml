/* @flow */
"use strict";

type P2 = {x: number; y: number};

// Class0 points, p, have dotProduct(p, w) > 0
// Class1 points, p, have dotProduct(p, w) <= 0

var {rot90, dotProduct, sizeSquared} = require("./VectorUtils.jsx");


function projectErrorForGraph(error: number): number {
  return 10 * (10 - 0.7 * Math.log(error + 1));
}

function misclassifieds(w: P2, pointClasses: [Array<P2>, Array<P2>]): Array<P2> {
  var class0 = pointClasses[0].filter(function(p) { return dotProduct(p, w) <= 0; });
  var class1 = pointClasses[1].filter(function(p) { return dotProduct(p, w) > 0; });
  return class0.concat(class1);
}

module.exports = {
  projectedError: function(w: P2, pointClasses: [Array<P2>, Array<P2>]): number {
    return projectErrorForGraph(leastSquaresObjective(w, pointClasses));
  },

  perceptronError: function(w: P2, pointClasses: [Array<P2>, Array<P2>]): number {
    if (misclassifieds(w, pointClasses).length === 0) {
      return 100;
    } else {
      return 0;
    }
  },
};

