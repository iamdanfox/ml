/* @flow */
type P2 = {x: number; y: number};
type PointClasses = [Array<P2>,Array<P2>];
"use strict";


var {add} = require("./VectorUtils.jsx");

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
function computePerceptronWeight(startWeight: P2, pointClasses: PointClasses): Array<P2> {
  // var [class0, class1] = pointClasses;
  // var transformedClass0 = class0.map((p) => {x: p.x, y: p.y, t: -1});
  // var transformedClass1 = class1.map((p) => {x: p.x, y: p.y, t: 1});
  // var trainingData = transformedClass0.concat(transformedClass1);

  var offset = {x: 10, y: 20};
  var w1 = add(offset)(startWeight);
  var w2 = add(offset)(w1);
  var w3 = add(offset)(w2);

  return [startWeight, w1, w2, w3];
}

module.exports = {
  computePerceptronWeight: computePerceptronWeight
};
