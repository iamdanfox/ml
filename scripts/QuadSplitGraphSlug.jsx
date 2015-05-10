/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>; editingInProgress: bool};
type Request = {
  thetaResolution: number;
  rResolution: number;
  pointGroups: Array<PointGrp>;
  focussedModelParams: any;
};
type Result = {hues: Uint8Array};


var {fastOptimise, objective} = require("./LogisticRegression.jsx");
var THREE = require("three");
var FasterGeometry = require("./FasterGeometry.js");

var colourFunction = function({pointGroups, focussedModelParams}: Request, vertex, hues, index) {
  var stops = fastOptimise(vertex, pointGroups, focussedModelParams) / focussedModelParams.MAX_STOPS;
  hues[index] = 256 * (0.31 - stops * 0.3);
};

var buildInitialGeometry = function(request: Request): FasterGeometry {
  var polarMeshFunction = function(r: number, j: number): THREE.Vector3 {
    var theta = j * 2 * Math.PI;
    var x = r * Math.cos(theta);
    var y = r * Math.sin(theta);
    var z = objective({x, y}, request.pointGroups);
    return new THREE.Vector3(x, y, z);
  };
  var geometry = new FasterGeometry(polarMeshFunction,
    request.rResolution, request.thetaResolution, true);

  return geometry;
};

module.exports = {
  startProcessing: function(request: Request): {result: Result; continuation: any} {
    // construct Worker-side clone of the entire graph.
    var {thetaResolution, rResolution} = request;
    var {faces, vertices} = buildInitialGeometry(request);

    // get necessary prototypes & functions all set up
    var numFaces = faces.length;
    var hues = new Uint8Array(numFaces);

    // do face 0.
    colourFunction(request, vertices[faces[0].b], hues, 0);
    hues[1] = hues[0];

    var colourStep = (squareSize) => {
      // we know all the top lefts have been done, need to do all the top rights,
      // bottom lefts, and bottom rights
      var prevSquareSize = 2 * squareSize;

      for (var y = 0; y < thetaResolution; y = y + squareSize) {
        for (var x = 0; x < rResolution; x = x + squareSize) {
          // only colour the square if it wasn't done in the prev. step
          var faceIndex = 2 * ((y * rResolution) + x);
          var face = faces[faceIndex];

          if ((x % prevSquareSize !== 0) || (y % prevSquareSize !== 0)) {
            colourFunction(request, vertices[face.b], hues, faceIndex);
            hues[faceIndex + 1] = hues[faceIndex];
          }
        }
      }

      // now need to do some colour copying in the three new squares (don't touch top left)
      for (var y = 0; y < thetaResolution; y = y + 1) {
        var squareY = y % squareSize;
        var prevSquareY = y % prevSquareSize;

        for (var x = 0; x < rResolution; x = x + 1) {
          var squareX = x % squareSize;
          var prevSquareX = x % prevSquareSize;

          // pixels in the top left square were also in the top left square in the last iteration
          // we can safely ignore them
          if (!(squareX === prevSquareX && squareY === prevSquareY)) {
            var prevIndex = 2 * (((y - squareY) * rResolution) + (x - squareX));
            var index = 2 * ((y * rResolution) + x);
            hues[index] = hues[prevIndex];
            hues[index + 1] = hues[prevIndex];
          }
        }
      }

      return {
        result: {hues},
        continuation: (Math.floor(squareSize / 2) > 0) ? () => colourStep(Math.floor(squareSize / 2)) : null
      };
    };

    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(faces.length)));
    return colourStep(nextBiggestPowerOf2);
  }
};
