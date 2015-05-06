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



var MATERIAL = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  vertexColors: THREE.FaceColors,
  opacity: 0.8,
  transparent: true,
});

var colourFunction = (pointGroups, boundingBox, vertex1, vertex2, vertex3, mutableFaceColor) => {
  var zMin = boundingBox.min.z;
  var zRange = boundingBox.max.z - zMin;
  var totalZ = vertex1.z + vertex2.z + vertex3.z;
  var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
  var stops = LogisticRegression.fastOptimise(vertex1, pointGroups) / 250;
  mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8, 0.08 + 0.82 * Math.pow(normalizedZ, 2));
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
    return function(j: number, i: number): THREE.Vector3 {
      // var r = (Math.pow(1.8, i * i) - 1); // this ensures there are lots of samples near the origin and gets close to 0!
      var r = (i + i * i) / 2; // this ensures there are lots of samples near the origin and gets close to 0!
      var theta = j * 2 * Math.PI;
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);
      var z = props.objective({x, y}, props.pointGroups);
      return new THREE.Vector3(x, y, z);
    }
  },

  buildInitialGeometry: function(props: Props): THREE.ParametricGeometry {
    var geometry = new THREE.ParametricGeometry(this.polarMeshFunction(props),
      this.props.thetaResolution, this.props.rResolution, true);

    var DEFAULT_COLOUR = new THREE.Color();
    DEFAULT_COLOUR.setHSL(0.54, 0.8, 0.08);
    for (var i = 0; i < geometry.faces.length; i = i + 1) {
      geometry.faces[i].color.copy(DEFAULT_COLOUR);
    }

    geometry.computeBoundingBox();
    return geometry;
  },

  buildCoarseGeometry: function(props: Props): THREE.ParametricGeometry {
    var geometry = new THREE.ParametricGeometry(this.polarMeshFunction(props),
      Math.floor(props.thetaResolution / 7), Math.floor(props.rResolution / 7), true);
    return this.colourGeometry(props, geometry);
  },

  colourGeometry: function(props: Props, graphGeometry: THREE.ParametricGeometry): THREE.ParametricGeometry {
    graphGeometry.computeBoundingBox();

    for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
      var face = graphGeometry.faces[i];
      colourFunction(props.pointGroups, graphGeometry.boundingBox,
        graphGeometry.vertices[face.a],
        graphGeometry.vertices[face.b],
        graphGeometry.vertices[face.c],
        face.color);
    }

    graphGeometry.colorsNeedUpdate = true;
    return graphGeometry;
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.coarseGraph);
    this.asyncRequestColouring(this.props);
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
      // show coarse one, colour synchronously
      this.props.scene.remove(this.state.graph);
      this.props.scene.add(this.state.coarseGraph);
      this.colourGeometry(nextProps, this.state.coarseGraph.geometry);
      this.props.forceParentUpdate();

      // debounces mousemove events so that we only send to the web worker when mouse stops moving
      if (this.state.timer) {
        clearTimeout(this.state.timer);
      }
      var timer = setTimeout(() => {
        // compute new fine geometry
        var geometry = this.state.graph.geometry;
        for (var i = 0; i < geometry.vertices.length; i = i + 1) {
          var vertex = geometry.vertices[i];
          vertex.setZ(nextProps.objective(vertex, nextProps.pointGroups));
        }
        this.state.graph.geometry.verticesNeedUpdate = true;

        console.log('[React] requesting');
        this.asyncRequestColouring(nextProps);
      }, 300);
      this.setState({timer});
    }
  },

  asyncRequestColouring: function(props: Props) {
    var {thetaResolution, rResolution, pointGroups} = props;
    console.log("[React] Request colouring")
    WorkerBridge.request({thetaResolution, rResolution, pointGroups}, (result) => {
      var {hsls} = result;
      var len = hsls.length;
      for (var i = 0; i < len; i = i + 1) {
        var {h, s, l} = hsls[i];
        this.state.graph.geometry.faces[i].color.setHSL(h, s, l);
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
