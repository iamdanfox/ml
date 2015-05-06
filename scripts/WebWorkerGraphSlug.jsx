/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Request = {
  vertices: Array<any>;
  faces: Array<any>;
  boundingBox: any;
  pointGroups: Array<PointGrp>;
};
type Result = {faces: Array<any>};


var {fastOptimise} = require("./LogisticRegression.jsx");
var THREE = require("three");



module.exports = {
  startProcessing: function(request: Request): {result: Result, continuation: any} {
    var {boundingBox, faces, vertices, pointGroups} = request;

    var colourFunction = (boundingBox, vertex1, vertex2, vertex3, mutableFaceColor) => {
      var zMin = boundingBox.min.z;
      var zRange = boundingBox.max.z - zMin;
      var totalZ = vertex1.z + vertex2.z + vertex3.z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      var stops = fastOptimise(vertex1, pointGroups) / 250;
      mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8, 0.08 + 0.82 * Math.pow(normalizedZ, 2));
    };

    // get necessary prototypes & functions all set up
    var faces = faces.map((f) => {
      var {r, g, b} = f.color;
      return new THREE.Face3(f.a, f.b, f.c, f.normal, new THREE.Color(r, g, b), f.materialIndex)
      // Note this isnt exactly replicating the originals... the vertexNormals are [] for example...
    });
    var numFaces = faces.length;

    // do face 0.
    var face = faces[0];
    colourFunction(boundingBox, vertices[face.a], vertices[face.b], vertices[face.c], face.color);

    var processStep = function(base: number): {result: Result, continuation: any} {

      for (var i = 0; i < numFaces; i = i + 1) {
        var face = faces[i];
        // we want to colour pixels that have not been coloured already!
        if (i % base === 0 && i % (2 * base) !== 0) {
          // compute this face
          colourFunction(boundingBox, vertices[face.a], vertices[face.b], vertices[face.c], face.color);
        } else {
          // otherwise, just use the last computed number
          var previousComputedColour = Math.floor(i / base) * base;
          var lastComputedColour = faces[previousComputedColour].color;
          face.color.copy(lastComputedColour);
        }
      }

      var nextBase = Math.floor(base / 2);
      return {
        result: {faces},
        continuation: (nextBase > 0) ? () => processStep(nextBase) : null
      };
    };

    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(faces.length)))
    return processStep(nextBiggestPowerOf2);
  }
}
