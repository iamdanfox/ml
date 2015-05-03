/* @flow */
"use strict";

var React = require("react");
var THREE = require('three');

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];
type Props = {
  dim: number;
  pointClasses: PointClasses;
  projectedError: (w: P2, pointClasses: PointClasses) => number;
  scene: THREE.Scene;
}
type State = {
  graph: ?THREE.Mesh;
}



var ParametricGraph = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    projectedError: React.PropTypes.func.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    scene: React.PropTypes.any.isRequired
  },

  getInitialState: function(): State {
    return {graph: null};
  },

  componentWillMount: function() {
    this.buildGraph(this.props);
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.pointClasses !== this.props.pointClasses ||
      nextProps.projectedError !== this.props.projectedError);
  },

  componentWillReceiveProps: function(nextProps: Props) {
    if (this.shouldComponentUpdate(nextProps)) {
      this.buildGraph(nextProps);
    }
  },

  buildGraph: function(props: Props): void {
    this.props.scene.remove(this.state.graph);

    var newGraph = new THREE.Mesh(
      this.colourGraphGeometry(this.buildGraphGeometry(props)),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        vertexColors: THREE.FaceColors
      })
    );

    this.setState({graph: newGraph});
    this.props.scene.add( newGraph );
  },

  buildGraphGeometry: function(props: Props): THREE.ParametricGeometry {
    var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
      var theta = i * 2 * Math.PI;
      var r = Math.pow(1.8, j * j) - 1; // this ensures there are lots of samples near the origin and gets close to 0!
      var x = r * Math.cos(theta) * props.dim;
      var y = r * Math.sin(theta) * props.dim;
      var z = props.projectedError({x, y}, props.pointClasses);
      return new THREE.Vector3(x, y, z);
    };

    var RESOLUTION = 24;
    return new THREE.ParametricGeometry( polarMeshFunction.bind(this), 8 * RESOLUTION, 0.5 * RESOLUTION, true );
  },

  colourGraphGeometry: function(graphGeometry: THREE.ParametricGeometry): THREE.ParametricGeometry {
    graphGeometry.computeBoundingBox();
    var zMin = graphGeometry.boundingBox.min.z;
    var zRange = graphGeometry.boundingBox.max.z - zMin;

    var colourCurve = (z) => 0.07 + 0.93 * Math.pow(z, 2);

    for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
      var face = graphGeometry.faces[i];
      var totalZ = graphGeometry.vertices[face.a].z +
        graphGeometry.vertices[face.b].z +
        graphGeometry.vertices[face.c].z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      face.color.setHSL( 0.54, 0.8, colourCurve(normalizedZ));
    }
    return graphGeometry;
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = ParametricGraph;
