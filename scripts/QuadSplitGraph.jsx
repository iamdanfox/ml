/* @flow */
"use strict";

var React = require("react/addons");
var THREE = require("three");
var FasterGeometry = require("./FasterGeometry.js");

type F<U,V> = (x: U) => V;
type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Props = {
  colourFunction: (boundingBox: any,
    v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3,
    mutableFaceColor: THREE.Color) => void;
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


var QuadSplitGraph = React.createClass({
  propTypes: {
    colourFunction: React.PropTypes.func.isRequired,
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
      mutableFaceColor.setHSL(0.31, 0.8, 0.20 + 0.82 * Math.pow(normalizedZ, 2));
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
    var {rResolution, thetaResolution} = this.props;
    var {geometry} = this.state.graph;
    geometry.computeBoundingBox();

    this.props.colourFunction(geometry.boundingBox,
      geometry.vertices[geometry.faces[0].a],
      geometry.vertices[geometry.faces[0].b],
      geometry.vertices[geometry.faces[0].c],
      geometry.faces[0].color);
    geometry.faces[1].color.copy(geometry.faces[0].color);

    var colourStep = (squareSize) => {
      // we know all the top lefts have been done, need to do all the top rights,
      // bottom lefts, and bottom rights
      var prevSquareSize = 2 * squareSize;

      for (var y = 0; y < thetaResolution; y = y + squareSize) {
        for (var x = 0; x < rResolution; x = x + squareSize) {
          // only colour the square if it wasn't done in the prev. step
          var faceIndex = 2 * ((y * rResolution) + x);
          var face = geometry.faces[faceIndex];

          if ((x % prevSquareSize !== 0) || (y % prevSquareSize !== 0)) {
            this.props.colourFunction(geometry.boundingBox,
              geometry.vertices[face.a],
              geometry.vertices[face.b],
              geometry.vertices[face.c],
              face.color);
            geometry.faces[faceIndex + 1].color.copy(face.color);
            geometry.faces[faceIndex + 1].computedColor = true;
          }
        }
      }

      // // now need to do some colour copying in the three new squares (don't touch top left)
      for (var y = 0; y < thetaResolution; y = y + 1) {
        for (var x = 0; x < rResolution; x = x + 1) {
          var squareX = x % squareSize;
          var squareY = y % squareSize;
          var prevSquareX = x % prevSquareSize;
          var prevSquareY = y % prevSquareSize;

          // pixels in the top left square were also in the top left square in the last iteration
          // we can safely ignore them
          if (!(squareX === prevSquareX && squareY === prevSquareY)) {
            var prevIndex = 2 * (((y - squareY) * rResolution) + (x - squareX));
            var index = 2 * ((y * rResolution) + x);
            geometry.faces[index].color.copy(geometry.faces[prevIndex].color);
            geometry.faces[index + 1].color.copy(geometry.faces[prevIndex].color);
          }
        }
      }

      if (squareSize > 1) {
        return () => colourStep(squareSize / 2);
      } else {
        return null;
      }
    };

    var timeoutRecurse: F<any, void> = (step) => {
      var continuation = step();
      geometry.colorsNeedUpdate = true;
      geometry.verticesNeedUpdate = true;
      geometry.facesNeedUpdate = true;
      this.props.forceParentUpdate();
      if (continuation !== null) {
        this.setState({timer: setTimeout(() => timeoutRecurse(continuation), 10)});
      }
    };

    var biggestDimension = Math.max(rResolution + 1, thetaResolution + 1);
    var nextBiggestPowerOf2 = Math.pow(2, Math.floor(Math.log2(biggestDimension)));

    timeoutRecurse(() => colourStep(nextBiggestPowerOf2));
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

  buildInitialGeometry: function(props: Props): FasterGeometry {
    var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
      var r = (i + i * i) / 2; // this ensures there are lots of samples near the origin and gets close to 0!
      var theta = j * 2 * Math.PI;
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);
      var z = props.objective({x, y}, props.pointGroups);
      return new THREE.Vector3(x, y, z);
    };
    var geometry = new FasterGeometry(polarMeshFunction,
      this.props.rResolution, this.props.thetaResolution, true);

    var DEFAULT_COLOUR = new THREE.Color();
    DEFAULT_COLOUR.setHSL(0.31, 0.8, 0.20);
    for (var i = 0; i < geometry.faces.length; i = i + 1) {
      geometry.faces[i].color.copy(DEFAULT_COLOUR);
    }

    return geometry;
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = QuadSplitGraph;
