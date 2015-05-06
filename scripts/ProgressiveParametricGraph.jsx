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
  scene: THREE.Scene;
  thetaResolution: number;
  rResolution: number;
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


var ProgressiveParametricGraph = React.createClass({
  propTypes: {
    colourFunction: React.PropTypes.func.isRequired,
    dim: React.PropTypes.number.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    objective: React.PropTypes.func.isRequired,
    scene: React.PropTypes.any.isRequired,
    rResolution: React.PropTypes.number.isRequired,
    thetaResolution: React.PropTypes.number.isRequired,
    forceParentUpdate: React.PropTypes.func.isRequired,
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
    var geometry = this.buildInitialGeometry(this.props);
    return {
      graph: new THREE.Mesh(geometry, MATERIAL.clone()),
      timer: null,
    };
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.graph);
    this.startProgressiveColouring();
  },

  startProgressiveColouring: function() {
    if (this.state.timer !== null) {
      clearTimeout(this.state.timer);
    }
    var {geometry} = this.state.graph;
    geometry.computeBoundingBox();
    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(geometry.faces.length)))
    this.colourStep(nextBiggestPowerOf2);
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

      this.state.graph.geometry.verticesNeedUpdate = true;
      this.startProgressiveColouring();
    }
  },

  buildInitialGeometry: function(props: Props): THREE.ParametricGeometry {
    var polarMeshFunction = function(j: number, i: number): THREE.Vector3 {
      var r = (Math.pow(1.8, i * i) - 1); // this ensures there are lots of samples near the origin and gets close to 0!
      var theta = j * 2 * Math.PI;
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);
      var z = props.objective({x, y}, props.pointGroups);
      return new THREE.Vector3(x, y, z);
    };
    var geometry = new THREE.ParametricGeometry(polarMeshFunction,
      this.props.thetaResolution, this.props.rResolution, true)

    var DEFAULT_COLOUR = new THREE.Color()
    DEFAULT_COLOUR.setHSL(0.54, 0.8, 0.08);
    for (var i = 0; i < geometry.faces.length; i = i + 1) {
      geometry.faces[i].color.copy(DEFAULT_COLOUR);
    }

    return geometry;
  },

  colourStep: function(base: number): void {
    var {geometry} = this.state.graph;
    var numFaces = geometry.faces.length;

    if (base === numFaces) {
      var face = geometry.faces[0];
      this.props.colourFunction(geometry.boundingBox,
        geometry.vertices[face.a],
        geometry.vertices[face.b],
        geometry.vertices[face.c],
        face.color);
    }

    for (var i = 0; i < numFaces; i = i + 1) {
      var face = geometry.faces[i];
      // we want to colour pixels that have not been coloured already!
      if (i % base === 0 && i % (2 * base) !== 0) {
        // compute this face
        this.props.colourFunction(geometry.boundingBox,
          geometry.vertices[face.a],
          geometry.vertices[face.b],
          geometry.vertices[face.c],
          face.color);
        face.hasBeenComputed = true;
      } else {
        // otherwise, just use the last computed number
        var previousComputedColour = Math.floor(i / base) * base;
        var lastComputedColour = geometry.faces[previousComputedColour].color;
        face.color.copy(lastComputedColour);
      }
    }

    geometry.colorsNeedUpdate = true;
    this.props.forceParentUpdate();

    var nextBase = Math.floor(base / 2);
    if (nextBase > 0) {
      this.setState({
        timer: setTimeout(() => this.colourStep(nextBase), 1)
      });
    }
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = ProgressiveParametricGraph;
