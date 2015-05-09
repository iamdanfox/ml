/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
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

var colourFunction = function(pointGroups, focussedModelParams, vertex, hues, index) {
  var stops = fastOptimise(vertex, pointGroups, focussedModelParams) / focussedModelParams.MAX_STOPS;
  hues[index] = 256 * (0.31 -  stops * 0.3);
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
    var {faces, vertices} = buildInitialGeometry(request);

    // get necessary prototypes & functions all set up
    var numFaces = faces.length;
    var hues = new Uint8Array(numFaces);
    for (var i = 0; i < numFaces; i = i + 1) {
      hues[i] = 20; // just compute hue! 256 * 0.20
    }

    // do face 0.
    colourFunction(request.pointGroups, request.focussedModelParams, vertices[faces[0].b], hues, 0);

    var processStep = function(base: number): {result: Result; continuation: any} {

      for (var i = 0; i < numFaces; i = i + 1) {
        var face = faces[i];
        // we want to colour pixels that have not been coloured already!
        if (i % base === 0 && i % (2 * base) !== 0) {
          // compute this face
          colourFunction(request.pointGroups, request.focussedModelParams, vertices[face.b], hues, i);
        } else {
          // otherwise, just use the last computed number
          hues[i] = hues[base * Math.floor(i / base)];
        }
      }

      return {
        result: {hues},
        continuation: (Math.floor(base / 2) > 1) ? () => processStep(Math.floor(base / 2)) : null
      };
    };

    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(faces.length)));
    return processStep(nextBiggestPowerOf2);
  }
};
