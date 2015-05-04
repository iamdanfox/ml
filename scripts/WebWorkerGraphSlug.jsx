/* @flow */
"use strict";
type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];


var {fastOptimise, objective} = require("./LogisticRegression.jsx");
var THREE = require("three");


var MATERIAL = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  vertexColors: THREE.FaceColors,
  opacity: 0.8,
  transparent: true,
});

function build(thetaResolution, rResolution, dim, pointClasses): THREE.ParametricGeometry {
  var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
    var theta = i * 2 * Math.PI;
    var r = Math.pow(1.8, j * j) - 1; // this ensures there are lots of samples near the origin and gets close to 0!
    var x = r * Math.cos(theta) * dim;
    var y = r * Math.sin(theta) * dim;
    var z = objective({x, y}, pointClasses);
    return new THREE.Vector3(x, y, z);
  };

  return THREE.ParametricGeometry(polarMeshFunction, thetaResolution, rResolution, true);
}

function colour(graphGeometry, pointClasses): void {
  graphGeometry.computeBoundingBox();
  var zMin = graphGeometry.boundingBox.min.z;
  var zRange = graphGeometry.boundingBox.max.z - zMin;

  var colourFunction = function(vertex1, vertex2, vertex3, mutableFaceColor): void {
    var totalZ = vertex1.z + vertex2.z + vertex3.z;
    var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
    var stops = fastOptimise(vertex1, pointClasses) / 250; // should match MAX_STOPS
    mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
  };

  for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
    var face = graphGeometry.faces[i];
    colourFunction(
      graphGeometry.vertices[face.a],
      graphGeometry.vertices[face.b],
      graphGeometry.vertices[face.c],
      face.color);
  }

  graphGeometry.colorsNeedUpdate = true;
}

module.exports = function respond(thetaResolution: number, rResolution: number, dim: number, pointClasses: PointClasses) {
  var graphGeometry = build(thetaResolution, rResolution, dim, pointClasses);
  colour(graphGeometry, pointClasses);
  return new THREE.Mesh(graphGeometry, MATERIAL.clone());
};
