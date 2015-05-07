/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Request = {
  thetaResolution: number;
  rResolution: number;
  pointGroups: Array<PointGrp>;
};
type Result = {hsls: Uint8Array};


var {fastOptimise, objective} = require("./LogisticRegression.jsx");
var THREE = require("three");
var FasterGeometry = require("./FasterGeometry.js");

var colourFunction = function(pointGroups, boundingBox, vertex1, vertex2, vertex3, hsls, startIndex) {
  var zMin = boundingBox.min.z;
  var zRange = boundingBox.max.z - zMin;
  var totalZ = vertex1.z + vertex2.z + vertex3.z;
  var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
  var stops = fastOptimise(vertex2, pointGroups) / 250;
  hsls[startIndex] = 256 * (0.54 + stops * 0.3);
  hsls[startIndex + 1] = 256 * (0.08 + 0.82 * Math.pow(normalizedZ, 2));
};

var buildInitialGeometry = function(request: Request): FasterGeometry {
  var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
    var r = (i + i * i) / 2; // this ensures there are lots of samples near the origin and gets close to 0!
    var theta = j * 2 * Math.PI;
    var x = r * Math.cos(theta);
    var y = r * Math.sin(theta);
    var z = objective({x, y}, request.pointGroups);
    return new THREE.Vector3(x, y, z);
  };
  var geometry = new FasterGeometry(polarMeshFunction,
    request.rResolution, request.thetaResolution, true);

  geometry.computeBoundingBox();
  return geometry;
};


module.exports = {
  startProcessing: function(request: Request): {result: Result; continuation: any} {
    // construct Worker-side clone of the entire graph.
    var {boundingBox, faces, vertices} = buildInitialGeometry(request);

    // get necessary prototypes & functions all set up
    var numFaces = faces.length;
    var hsls = new Uint8Array(2 * numFaces);
    for (var i = 0; i < numFaces * 2; i = i + 2) {
      hsls[i] = 138;
      hsls[i + 1] = 20;
    }

    // do face 0.
    colourFunction(request.pointGroups, boundingBox,
      vertices[faces[0].a], vertices[faces[0].b], vertices[faces[0].c], hsls, 0);

    var processStep = function(base: number): {result: Result; continuation: any} {

      for (var i = 0; i < numFaces; i = i + 1) {
        var face = faces[i];
        // we want to colour pixels that have not been coloured already!
        if (i % base === 0 && i % (2 * base) !== 0) {
          // compute this face
          colourFunction(request.pointGroups, boundingBox,
            vertices[face.a], vertices[face.b], vertices[face.c], hsls, 2 * i);
        } else {
          // otherwise, just use the last computed number
          var lastComputed = base * Math.floor(i / base);
          hsls[2 * i] = hsls[2 * lastComputed];
          hsls[2 * i + 1] = hsls[2 * lastComputed + 1];
        }
      }

      return {
        result: {hsls},
        continuation: (Math.floor(base / 2) > 1) ? () => processStep(Math.floor(base / 2)) : null
      };
    };

    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(faces.length)));
    return processStep(nextBiggestPowerOf2);
  }
};
