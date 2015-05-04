/* @flow */
"use strict";

type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type GeneratedBy = {
  center: P2;
  params: {l: number; theta: number};
};

var {add, rotate} = require("./VectorUtils.jsx");



var ELLIPSE_FIXED_RADIUS = 0.35;

var labelToColour: F<number, string> = (c) => ["red", "blue"][c];

var POINTS_PER_AREA = 20;

var generatePoints = function(generatedBy: GeneratedBy): Array<P2> {
  var {l, theta} = generatedBy.params;
  var area = Math.PI * l * ELLIPSE_FIXED_RADIUS;
  var numberOfPoints = Math.floor(area * POINTS_PER_AREA);

  var project = (rand) => 0.4 * (Math.pow(2 * rand - 1, 3) + 2 * rand - 1);

  var newPoints = [];
  for (var i = 0; i < numberOfPoints; i = i + 1) {
    var offset = {
      x: project(Math.random()) * ELLIPSE_FIXED_RADIUS,
      y: project(Math.random()) * l,
    };
    var rotatedOffset = rotate(theta, offset);
    newPoints.push(add(generatedBy.center)(rotatedOffset));
  }
  return newPoints;
};

module.exports = {generatePoints, ELLIPSE_FIXED_RADIUS, labelToColour};
