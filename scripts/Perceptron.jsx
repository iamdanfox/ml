/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};

var {add, scale, classify, classTransform} = require("./VectorUtils.jsx");

/*
The Perceptron training algorithm cycles through each training
example (xn) in turn and,

if the example is correctly classified no change is made,

otherwise the example’s vector is added or subtracted
(depending on its class label) from the current weight
vector.
*/

/**
Given some data and a start weight, return a list of vectors w such that describes
the algorithm's progression.  First w is the start weight, last w is the result of the algorithm

Maximum list length = 300 (for non-terminating stuff)
*/
var DEFAULT_PARAMS = {
  PERCEPTRON_NU: 0.1,
  EPOCHS: 2,
}

var PARAM_OPTIONS = {
  PERCEPTRON_NU: [0.05, 0.1, 0.25, 0.5],
  EPOCHS: [1, 2, 5, 10],
}

var PERCEPTRON_NU = 0.1;
var EPOCHS = 2;
/*
The value of nu is interesting to observe.

<0.05 - often doesn't reach optimal (runs out of data points)
0.1 - almost always reaches the optimum. Occasionally stops just shy of optimal.
0.5 - seems to work pretty fast.  Occasionally overshoots a bit.
>0.75 - seems to work, but ends up with a large w.
*/

module.exports = {

  objective: function(w: P2, pointGroups: Array<PointGrp>): number {
    for (var k = 0; k < pointGroups.length; k = k + 1) {
      var {points, label} = pointGroups[k];
      if (points.some((p) => classify(p, w) !== label)) {
        return 0; // there was a misclassification
      }
    }

    return 0.3;
  },

  optimise: function(startWeight: P2, pointGroups: Array<PointGrp>): Array<P2> {
    var w = startWeight;
    var stops = [w];

    for (var k = 0; k < pointGroups.length * EPOCHS; k = k + 1) {
      var {points, label} = pointGroups[k % pointGroups.length];
      for (var i = 0, maxi = points.length; i < maxi; i = i + 1) {
        if (classify(w, points[i]) !== label) {
          // there was a classification error, so we should add or subtract the points[i].
          w = add(w)(scale(-1 * PERCEPTRON_NU * classTransform(label))( points[i] ));
          stops.push(w);
        }
      }
    }
    return stops;
  },

  DEFAULT_PARAMS,

  paramOptions: function(paramName: string): Array<number> {
    return PARAM_OPTIONS[paramName];
  },

};
