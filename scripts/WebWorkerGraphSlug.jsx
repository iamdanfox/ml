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



var {fastOptimise, objective} = require("./LogisticRegression.jsx");
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



// var MATERIAL = new THREE.MeshBasicMaterial({
//   side: THREE.DoubleSide,
//   vertexColors: THREE.FaceColors,
//   opacity: 0.8,
//   transparent: true,
// });

// function build(thetaResolution, rResolution, dim, pointGroups): THREE.ParametricGeometry {
//   var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
//     var theta = i * 2 * Math.PI;
//     var r = (Math.pow(1.8, j * j) - 1) / 400; // this ensures there are lots of samples near the origin and gets close to 0!
//     var x = r * Math.cos(theta) * dim;
//     var y = r * Math.sin(theta) * dim;
//     var z = objective({x, y}, pointGroups);
//     return new THREE.Vector3(x, y, z);
//   };

//   return new THREE.ParametricGeometry(polarMeshFunction, thetaResolution, rResolution, true);
// }

// function colour(graphGeometry, pointGroups): void {
//   graphGeometry.computeBoundingBox();
//   var zMin = graphGeometry.boundingBox.min.z;
//   var zRange = graphGeometry.boundingBox.max.z - zMin;

//   var colourFunction = function(vertex1, vertex2, vertex3, mutableFaceColor): void {
//     var totalZ = vertex1.z + vertex2.z + vertex3.z;
//     var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
//     var stops = fastOptimise(vertex1, pointGroups) / 250; // should match MAX_STOPS
//     mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
//   };

//   for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
//     var face = graphGeometry.faces[i];
//     colourFunction(
//       graphGeometry.vertices[face.a],
//       graphGeometry.vertices[face.b],
//       graphGeometry.vertices[face.c],
//       face.color);
//   }

//   graphGeometry.colorsNeedUpdate = true;
// }

// module.exports = {
//   respond: function(thetaResolution: number, rResolution: number, dim: number, pointGroups: Array<PointGrp>): Result {
//     var graphGeometry = build(thetaResolution, rResolution, dim, pointGroups);
//     colour(graphGeometry, pointGroups);
//     var {faces, vertices} = graphGeometry;
//     return {faces, vertices}; // clonable to send back!
//   },

//   reconstruct: function(result: Result): THREE.Mesh {
//     var {faces, vertices} = result;
//     var geometry = new THREE.Geometry();
//     geometry.vertices = vertices;
//     geometry.verticesNeedUpdate = true;
//     geometry.faces = faces;
//     geometry.facesNeedUpdate = true;
//     return new THREE.Mesh(geometry, MATERIAL.clone());
//   }
// };

