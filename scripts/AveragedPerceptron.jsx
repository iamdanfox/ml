/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>; editingInProgress: bool};
type Params = {
  PERCEPTRON_NU: number;
  EPOCHS: number;
};

var {add, scale, classify, classTransform} = require("./VectorUtils.jsx");


/**
Given some data and a start weight, return a list of vectors w such that describes
the algorithm's progression.  First w is the start weight, last w is the result of the algorithm

Maximum list length = 300 (for non-terminating stuff)
*/

module.exports = {

  name: "AveragedPerceptron",

  /*
  The Perceptron training algorithm cycles through each training
  example (xn) in turn and,

  if the example is correctly classified no change is made,

  otherwise the example’s vector is added or subtracted
  (depending on its class label) from the current weight
  vector.
  */
  objective: function(w: P2, pointGroups: Array<PointGrp>): number {
    var misClassifieds = 0;
    var totalPoints = 0;

    for (var k = 0; k < pointGroups.length; k = k + 1) {
      var {points, label} = pointGroups[k];
      var len = points.length;
      totalPoints = totalPoints + len;
      for (var i = 0; i < len; i = i + 1) {
        if (classify(points[i], w) !== label) {
          misClassifieds = misClassifieds + 1;
        }
      }
    }

    return 0.5 * (1 - misClassifieds / totalPoints) - 0.2;
  },

  optimise: function(startWeight: P2, pointGroups: Array<PointGrp>, {PERCEPTRON_NU, EPOCHS}: Params): Array<P2> {
    var w = startWeight;
    var c = 1;
    var stops = [w];

    for (var k = 0; k < pointGroups.length * EPOCHS; k = k + 1) {
      var {points, label} = pointGroups[k % pointGroups.length];
      for (var i = 0, maxi = points.length; i < maxi; i = i + 1) {
        c = c + 1;
        if (classify(w, points[i]) !== label) {
          // there was a classification error, so we should add or subtract the points[i].
          var downScaledW = scale((c - 1) / c)(w);
          w = add(downScaledW)(scale(-1 * classTransform(label) / c)( points[i] ));
          stops.push(w);
        }
      }
    }
    return stops;
  },
  /*
  The value of nu is interesting to observe.

  <0.05 - often doesn't reach optimal (runs out of data points)
  0.1 - almost always reaches the optimum. Occasionally stops just shy of optimal.
  0.5 - seems to work pretty fast.  Occasionally overshoots a bit.
  >0.75 - seems to work, but ends up with a large w.
  */

  DEFAULT_PARAMS: {
    PERCEPTRON_NU: 0.5,
    EPOCHS: 2,
  },

  paramOptions: function(paramName: string): Array<number> {
    var PARAM_OPTIONS = {
      PERCEPTRON_NU: [0.01, 0.1, 0.25, 0.5, 1],
      EPOCHS: [1, 2, 5],
    };
    return PARAM_OPTIONS[paramName];
  },

};
