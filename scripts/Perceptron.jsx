/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>,Array<P2>];

var {add, scale, pointClassesTransform, classify, classTransform, dotProduct} = require("./VectorUtils.jsx");

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

  objective: function(w: P2, pointClasses: PointClasses): number {
    var pointGroups = [0, 1].map(function(label) {return {label, points: pointClasses[label]}});

    for (var k = 0, maxk = pointGroups.length; k < maxk; k = k + 1) {
      var {points, label} = pointGroups[k];
      if (label == 0) {
        if (points.some((p) => dotProduct(p, w) <= 0)) {
          return 0; // there was a misclassification
        }
      } else {
        if (points.some((p) => dotProduct(p, w) > 0)) {
          return 0;
        }
      }
    }

    return 0.6;
  },

  optimise: function(startWeight: P2, pointClasses: PointClasses): Array<P2> {
    var pointGroups = [0, 1].map(function(label) {return {label, points: pointClasses[label]}});

    var w = startWeight;
    var stops = [w];
    for (var epoch = 0; epoch < EPOCHS; epoch = epoch + 1){

      for (var k = 0, maxk = pointGroups.length; k < maxk; k = k + 1) {
        var {points, label} = pointGroups[k];

        for (var i = 0, maxi = points.length; i < maxi; i = i + 1) {
          var trainingVector = points[i];
          if (classify(w, trainingVector) !== label) {
            // there was a classification error, so we should add or subtract the trainingVector.
            w = add(w)(scale(-1 * PERCEPTRON_NU * classTransform(label))( trainingVector ));
            stops.push(w);
          }
        }
      }
    }
    return stops;
  },

};
