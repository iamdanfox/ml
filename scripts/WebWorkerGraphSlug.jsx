/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Request = {
  thetaResolution: number;
  rResolution: number;
  pointGroups: Array<PointGrp>;
};
type Result = {hsls: Array<any>};


var {fastOptimise, objective} = require("./LogisticRegression.jsx");
var THREE = require("three");

var buildInitialGeometry = function(request: Request): THREE.ParametricGeometry {
  var polarMeshFunction = function(j: number, i: number): THREE.Vector3 {
    var r = (i + i * i) / 2; // this ensures there are lots of samples near the origin and gets close to 0!
    var theta = j * 2 * Math.PI;
    var x = r * Math.cos(theta);
    var y = r * Math.sin(theta);
    var z = objective({x, y}, request.pointGroups);
    return new THREE.Vector3(x, y, z);
  };
  var geometry = new THREE.ParametricGeometry(polarMeshFunction,
    request.thetaResolution, request.rResolution, true);

  geometry.computeBoundingBox();
  return geometry;
};


module.exports = {
  startProcessing: function(request: Request): {result: Result; continuation: any} {
    // construct Worker-side clone of the entire graph.

    var {pointGroups} = request;
    var {boundingBox, faces, vertices} = buildInitialGeometry(request);

    var colourFunction = (boundingBox, vertex1, vertex2, vertex3, mutableHSL) => {
      var zMin = boundingBox.min.z;
      var zRange = boundingBox.max.z - zMin;
      var totalZ = vertex1.z + vertex2.z + vertex3.z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      var stops = fastOptimise(vertex1, pointGroups) / 250;
      mutableHSL.h = 0.54 + stops * 0.3;
      mutableHSL.s = 0.8;
      mutableHSL.l = 0.08 + 0.82 * Math.pow(normalizedZ, 2);
    };

    // get necessary prototypes & functions all set up
    var hsls = faces.map((f) => {
      return {h: 0.54, s: 0.8, l: 0.08};
      // var {r, g, b} = f.color;
      // return new THREE.Face3(f.a, f.b, f.c, f.normal, new THREE.Color(r, g, b), f.materialIndex);
      // Note this isnt exactly replicating the originals... the vertexNormals are [] for example...
    });
    var numFaces = faces.length;
    var OFFSET = faces.length - 100; // colours at zero are all boring.

    // do face 0.
    var firstFace = faces[(0 + OFFSET) % numFaces];
    colourFunction(boundingBox,
      vertices[firstFace.a],
      vertices[firstFace.b],
      vertices[firstFace.c],
      firstFace.color);

    var processStep = function(base: number): {result: Result; continuation: any} {

      for (var i = 0; i < numFaces; i = i + 1) {
        var face = faces[(i + OFFSET) % numFaces];
        var hsl = hsls[(i + OFFSET) % numFaces]
        // we want to colour pixels that have not been coloured already!
        if (i % base === 0 && i % (2 * base) !== 0) {
          // compute this face
          colourFunction(boundingBox, vertices[face.a], vertices[face.b], vertices[face.c], hsl);
        } else {
          // otherwise, just use the last computed number
          var previousComputedColour = Math.floor(i / base) * base;
          var lastComputed = hsls[(previousComputedColour + OFFSET) % numFaces];
          hsl.h = lastComputed.h;
          hsl.s = lastComputed.s;
          hsl.l = lastComputed.l;
        }
      }

      var nextBase = Math.floor(base / 2);
      return {
        result: {hsls},
        continuation: (nextBase > 1) ? () => processStep(nextBase) : null
      };
    };

    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(faces.length)));
    return processStep(nextBiggestPowerOf2);
  }
};
