/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";


var {add, scale, pointClassesTransform, classify, classTransform} = require("./VectorUtils.jsx");

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
/*
The value of nu is interesting to observe.

<0.05 - often doesn't reach optimal (runs out of data points)
0.1 - almost always reaches the optimum. Occasionally stops just shy of optimal.
0.5 - seems to work pretty fast.  Occasionally overshoots a bit.
>0.75 - seems to work, but ends up with a large w.
*/
function computePerceptronWeight(startWeight: P2, pointClasses: PointClasses): Array<P2> {
  var trainingData = pointClassesTransform(pointClasses);

  var resultantWeights = [startWeight];
  for (var i = 0; i < trainingData.length; i = i + 1){
    var trainingVector = trainingData[i];
    var lastW = resultantWeights[resultantWeights.length - 1];
    if (classTransform(classify(lastW, trainingVector)) !== trainingVector.t) {
      // there was a classification error, so we should add or subtract the trainingVector.
      var nextWeight = add(lastW)(scale(-1 * PERCEPTRON_NU * trainingVector.t)( trainingVector ));
      resultantWeights.push(nextWeight);
    }
  }
  return resultantWeights;
}

module.exports = {
  computePerceptronWeight: computePerceptronWeight
};
