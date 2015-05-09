/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Result = {faces: Array<any>; vertices: Array<any>};
type Props = {
  pointGroups: Array<PointGrp>;
  rResolution: number;
  scene: THREE.Scene;
  thetaResolution: number;
  objective: (w: P2, pointGroups: Array<PointGrp>) => number;
  forceParentUpdate: () => void;
}
type State = {
  graph: THREE.Mesh;
  timer: ?number;
}

var React = require("react/addons");
var THREE = require("three");
var WorkerBridge = require("./WorkerBridge.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var FasterGeometry = require("./FasterGeometry.js");



var MATERIAL = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  vertexColors: THREE.FaceColors,
  opacity: 0.8,
  transparent: true,
});

var colourFunction = (pointGroups, boundingBox, vertex2, vertex3, mutableFaceColor) => {
  var zMin = boundingBox.min.z;
  var zRange = boundingBox.max.z - zMin;
  // only using two because the avg of these is the middle of two faces (ie one square).
  var totalZ = vertex2.z + vertex3.z;
  var normalizedZ = (totalZ - 2 * zMin) / (2 * zRange);
  var stops = LogisticRegression.fastOptimise(vertex2, pointGroups) / 250;
  mutableFaceColor.setHSL(0.31 -  stops * 0.3, 0.8, 0.20 + 0.82 * Math.pow(normalizedZ, 2));
};


var WebWorkerGraph = React.createClass({
  propTypes: {
    pointGroups: React.PropTypes.array.isRequired,
    rResolution: React.PropTypes.number.isRequired, // 8
    scene: React.PropTypes.any.isRequired,
    objective: React.PropTypes.func.isRequired,
    thetaResolution: React.PropTypes.number.isRequired, // 24
    forceParentUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState: function(): State {
    return {
      graph: new THREE.Mesh(this.buildInitialGeometry(this.props), MATERIAL.clone()),
      coarseGraph: new THREE.Mesh(this.buildCoarseGeometry(this.props), MATERIAL.clone()),
      timer: null,
    };
  },

  polarMeshFunction: function(props: Props): any {
    return function(r: number, j: number): THREE.Vector3 {
      // var r = (Math.pow(1.8, i * i) - 1); // this ensures there are lots of samples near the origin and gets close to 0!
      // var r = (i + i * i) / 2; // this ensures there are lots of samples near the origin and gets close to 0!
      var theta = j * 2 * Math.PI;
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);
      var z = props.objective({x, y}, props.pointGroups);
      return new THREE.Vector3(x, y, z);
    };
  },

  buildInitialGeometry: function(props: Props): FasterGeometry {
    var geometry = new FasterGeometry(this.polarMeshFunction(props),
      this.props.rResolution, this.props.thetaResolution, true);

    geometry.computeBoundingBox();
    return geometry;
  },

  buildCoarseGeometry: function(props: Props): FasterGeometry {
    var geometry = new FasterGeometry(this.polarMeshFunction(props),
      Math.floor(props.rResolution / 12), Math.floor(props.thetaResolution / 12), true);
    return this.colourGeometry(props, geometry);
  },

  colourGeometry: function(props: Props, graphGeometry: FasterGeometry): FasterGeometry {
    graphGeometry.computeBoundingBox();

    for (var i = 0, len = graphGeometry.faces.length; i < len; i = i + 2) {
      var face = graphGeometry.faces[i];
      colourFunction(props.pointGroups, graphGeometry.boundingBox,
        graphGeometry.vertices[face.b],
        graphGeometry.vertices[face.c],
        face.color);
      graphGeometry.faces[i + 1].color.copy(face.color);
    }

    graphGeometry.colorsNeedUpdate = true;
    return graphGeometry;
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.coarseGraph);
    this.asyncRequestColouring(this.props);
    this.props.forceParentUpdate();
  },

  componentWillUnmount: function() {
    WorkerBridge.abort();
    this.props.scene.remove(this.state.coarseGraph);
    this.props.scene.remove(this.state.graph);
    this.props.forceParentUpdate();
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.pointGroups !== this.props.pointGroups ||
      nextProps.objective !== this.props.objective);
  },

  refreshGeometryZValues: function(props: Props, geometry: THREE.Geometry): void {
    var {vertices} = geometry;
    var len = vertices.length;
    for (var i = 0; i < len; i = i + 1) {
      var vertex = vertices[i];
      vertex.setZ(props.objective(vertex, props.pointGroups));
    }
    geometry.verticesNeedUpdate = true;
  },

  swapCoarseGraphBackIn: function(props: Props) {
    this.props.scene.remove(this.state.graph);
    this.refreshGeometryZValues(props, this.state.coarseGraph.geometry);
    this.colourGeometry(props, this.state.coarseGraph.geometry);
    this.props.scene.add(this.state.coarseGraph);
    this.props.forceParentUpdate();
  },

  componentWillReceiveProps: function(nextProps: Props) {
    if (this.shouldComponentUpdate(nextProps)) {
      this.swapCoarseGraphBackIn(nextProps);

      WorkerBridge.abort();

      var mouseDown = nextProps.pointGroups.some((pg) => pg.mouseDownDiff);
      if (!mouseDown) {
        this.refreshGeometryZValues(nextProps, this.state.graph.geometry);
        this.asyncRequestColouring(nextProps);
      }
    }
  },

  asyncRequestColouring: function({thetaResolution, rResolution, pointGroups}: Props) {
    console.log('[React] sending request');

    WorkerBridge.request({thetaResolution, rResolution, pointGroups}, ({hues}) => {
      var {boundingBox, faces, vertices} = this.state.graph.geometry;
      var zRange = boundingBox.max.z - boundingBox.min.z;

      for (var i = 0, len = hues.length; i < len; i = i + 1) {
        var face = faces[i];
        var normalizedZ = (vertices[face.a].z + vertices[face.a].z + vertices[face.a].z -
          3 * boundingBox.min.z) / (3 * zRange);
        face.color.setHSL(hues[i] / 256, 0.8, 0.20 + 0.82 * Math.pow(normalizedZ, 2));
      }

      this.state.graph.geometry.colorsNeedUpdate = true;
      this.props.scene.remove(this.state.coarseGraph);
      this.props.scene.add(this.state.graph);
      this.props.forceParentUpdate();
    });
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = WebWorkerGraph;
