/* @flow */
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

"use strict";

var {pointClassesTransformZeroOne, dotProduct, scale, add, modulus} = require("./VectorUtils.jsx");

function sigmoid(wx): number {
  return 1 / (1 + Math.exp(-wx));
}

function logSigmoid(wx): number {
  return -Math.log(1 + Math.exp(-wx));
}

function logOneMinusSigmoid(wx): number {
  return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
}

// the objective function is used to generate the surface
function objective(w: P2, pointClasses: PointClasses): number {
  var antiOverflowFudgeFactor = 1 / 200;
  var smallerW = scale(antiOverflowFudgeFactor)(w);
  var points = pointClassesTransformZeroOne(pointClasses);

  // we're actually trying to minimise this.
  var sum = -points
    .map(function sumElement(point: P2t): number { // crucially, t is either 0 or 1.
      var wx = dotProduct(smallerW, point);
      return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
    })
    .reduce(function(a, b) {return a + b;}, 0);

  // flip representation because Surface.jsx shows maximisation
  return 100 - Math.log(1 + sum) * 10;
}


// gradient at w
// https://www.cs.ox.ac.uk/teaching/materials13-14/machinelearning/lecture_logistic_regression.pdf
// slide 12
function gradient(w: P2, pointClasses: PointClasses): P2 {
  var antiOverflowFudgeFactor = 1 / 200;
  var smallerW = scale(antiOverflowFudgeFactor)(w);
  var points = pointClassesTransformZeroOne(pointClasses);

  var grad = points
    .map(function(point: P2t): P2 {
      var wx = dotProduct(smallerW, point);
      return scale(sigmoid(wx) - point.t)(point);
    })
    .reduce(function(a, b) { return add(a)(b); }, {x: 0, y: 0});

  return grad;
}

var NU = 0.005;

function optimise(startW: P2, pointClasses: PointClasses): Array<P2> {
  var w = startW;
  var grad = gradient(w, pointClasses);
  var stops = [w];
  while (modulus(grad) > 1) {
    grad = gradient(w, pointClasses);
    w = add(w)(scale(-1 * NU)(grad));
    stops.push(w);
  }
  return stops;
}

  // var trainingData = pointClassesTransform(pointClasses);
  // var resultantWeights = [startWeight];
  // for (var i = 0; i < trainingData.length; i = i + 1){
  //   var trainingVector = trainingData[i];
  //   var lastW = resultantWeights[resultantWeights.length - 1];
  //   if (classTransform(classify(lastW, trainingVector)) !== trainingVector.t) {
  //     // there was a classification error, so we should add or subtract the trainingVector.
  //     var nextWeight = add(lastW)(scale(-1 * PERCEPTRON_NU * trainingVector.t)( trainingVector ));
  //     resultantWeights.push(nextWeight);
  //   }
  // }
  // return resultantWeights;
// }

module.exports = {
  objective: objective,
  gradient: gradient,
  optimise: optimise
};
