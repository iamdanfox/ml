/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];
"use strict";


var {add, dotProduct, scale} = require("./VectorUtils.jsx");

/*
The Perceptron training algorithm cycles through each training
example (xn) in turn and,

if the example is correctly classified no change is made,

otherwise the example’s vector is added or subtracted
(depending on its class label) from the current weight
vector.
*/


function classify(w: P2, vectorToClassify: P2) {
  if (dotProduct(vectorToClassify, w) > 0) {
    return 0;
  } else {
    return 1;
  }
}

function classTransform(classification: number): number {
  if (classification === 0) {
    return -1;
  } else {
    console.assert(classification === 1);
    return 1;
  }
}

function pointClassesTransform(pointClasses: PointClasses): Array<P2t> {
  var [class0, class1] = pointClasses;
  var transformedClass0 = class0.map(function(p) {
    return {x: p.x, y: p.y, t: -1};
  });
  var transformedClass1 = class1.map(function(p) {
    return {x: p.x, y: p.y, t: 1};
  });
  return transformedClass0.concat(transformedClass1);
}

/**
Given some data and a start weight, return a list of vectors w such that describes
the algorithm's progression.  First w is the start weight, last w is the result of the algorithm

Maximum list length = 300 (for non-terminating stuff)
*/
var PERCEPTRON_NU = 0.1;
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
