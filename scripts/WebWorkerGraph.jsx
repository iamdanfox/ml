/* @flow */
"use strict";

var React = require("react/addons");
var workerSlug = require("./WebWorkerGraphSlug.jsx");

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];
type Props = {
  dim: number;
  pointClasses: PointClasses;
  rResolution: number;
  scene: THREE.Scene;
  thetaResolution: number;
}
type State = {
  graph: THREE.Mesh;
}



var WebWorkerGraph = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired, // 400
    pointClasses: React.PropTypes.array.isRequired,
    rResolution: React.PropTypes.number.isRequired, // 8
    scene: React.PropTypes.any.isRequired,
    thetaResolution: React.PropTypes.number.isRequired, // 24
  },

  // 120 * 40 looks great... 4800 computations
  // 96 * 32
  // 72 * 24
  // 36 * 12
  // 24 * 8 is pretty much a minimum.

  getInitialState: function(): State {
    // synchronously compute the first graph.
    var {thetaResolution, rResolution, dim, pointClasses} = this.props;
    return {
      graph: workerSlug(thetaResolution, rResolution, dim, pointClasses)
    };
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.graph);
  },

  componentWillUnmount: function() {
    this.props.scene.remove(this.state.graph);
  },

  shouldComponentUpdate: function(): bool {
    console.log('TODO');
    return false;
  },

  // componentWillReceiveProps: function(nextProps: Props) {
  //   if (this.shouldComponentUpdate(nextProps)) {
  //     var geometry = this.state.graph.geometry;

  //     for (var i = 0; i < geometry.vertices.length; i = i + 1) {
  //       var vertex = geometry.vertices[i];
  //       vertex.setZ(nextProps.projectedError(vertex, nextProps.pointClasses));
  //     }

  //     this.colourGeometry(geometry);
  //     this.state.graph.geometry.verticesNeedUpdate = true;
  //   }
  // },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = WebWorkerGraph;
