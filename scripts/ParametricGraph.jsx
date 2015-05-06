/* @flow */
"use strict";

var React = require("react/addons");
var THREE = require("three");

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Props = {
  colourFunction: (boundingBox: any,
    v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3,
    mutableFaceColor: THREE.Color) => void;
  dim: number;
  pointGroups: Array<PointGrp>;
  objective: (w: P2, pointGroups: Array<PointGrp>) => number;
  rResolution: number;
  scene: THREE.Scene;
  thetaResolution: number;
}
type State = {
  graph: THREE.Mesh;
}



var MATERIAL = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  vertexColors: THREE.FaceColors,
  opacity: 0.8,
  transparent: true,
});


var ParametricGraph = React.createClass({
  propTypes: {
    colourFunction: React.PropTypes.func.isRequired,
    dim: React.PropTypes.number.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    objective: React.PropTypes.func.isRequired,
    rResolution: React.PropTypes.number.isRequired,
    scene: React.PropTypes.any.isRequired,
    thetaResolution: React.PropTypes.number.isRequired,
  },

  statics: {
    COLOUR_FUNCTION: function(boundingBox, vertex1, vertex2, vertex3, mutableFaceColor): void {
      var zMin = boundingBox.min.z;
      var zRange = boundingBox.max.z - zMin;
      var totalZ = vertex1.z + vertex2.z + vertex3.z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      mutableFaceColor.setHSL(0.54, 0.8, 0.08 + 0.82 * Math.pow(normalizedZ, 2));
    }
  },

  // 120 * 40 looks great... 4800 computations
  // 96 * 32 - default
  // 72 * 24
  // 36 * 12
  // 24 * 8 is pretty much a minimum.

  getInitialState: function(): State {
    return {
      graph: new THREE.Mesh(this.colourGeometry(this.buildInitialGeometry(this.props)), MATERIAL.clone())
    };
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.graph);
  },

  componentWillUnmount: function() {
    this.props.scene.remove(this.state.graph);
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.pointGroups !== this.props.pointGroups ||
      nextProps.objective !== this.props.objective);
  },

  componentWillReceiveProps: function(nextProps: Props) {
    if (this.shouldComponentUpdate(nextProps)) {
      var geometry = this.state.graph.geometry;

      for (var i = 0; i < geometry.vertices.length; i = i + 1) {
        var vertex = geometry.vertices[i];
        vertex.setZ(nextProps.objective(vertex, nextProps.pointGroups));
      }

      this.colourGeometry(geometry);
      this.state.graph.geometry.verticesNeedUpdate = true;
    }
  },

  buildInitialGeometry: function(props: Props): THREE.ParametricGeometry {
    var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
      var theta = i * 2 * Math.PI;
      var r = (Math.pow(1.8, j * j) - 1); // this ensures there are lots of samples near the origin and gets close to 0!
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);
      var z = props.objective({x, y}, props.pointGroups);
      return new THREE.Vector3(x, y, z);
    };

    return new THREE.ParametricGeometry(polarMeshFunction,
      this.props.thetaResolution, this.props.rResolution, true);
  },

  colourGeometry: function(graphGeometry: THREE.ParametricGeometry): THREE.ParametricGeometry {
    graphGeometry.computeBoundingBox();

    for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
      var face = graphGeometry.faces[i];
      this.props.colourFunction(graphGeometry.boundingBox,
        graphGeometry.vertices[face.a],
        graphGeometry.vertices[face.b],
        graphGeometry.vertices[face.c],
        face.color);
    }

    graphGeometry.colorsNeedUpdate = true;
    return graphGeometry;
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = ParametricGraph;
