/* @flow */
"use strict";

var React = require("react/addons");
var WebWorkerGraphSlug = require("./WebWorkerGraphSlug.jsx");
var WorkerBridge = require("./WorkerBridge.jsx");

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
    return {graph: null};
  },

  componentWillMount: function() {
    // synchronously compute the first graph.
    var {thetaResolution, rResolution, dim, pointClasses} = this.props;
    var result = WebWorkerGraphSlug.respond(thetaResolution, rResolution, dim, pointClasses)
    var graph = WebWorkerGraphSlug.reconstruct(result);
    this.setState({graph});
    this.props.scene.add(graph);

    // set up worker connection
    var reactElementId = this._reactInternalInstance._rootNodeID; // maybe cache a UUID instead?
    var webWorkerChannel = WorkerBridge.subscribe(reactElementId, this.receiveWebWorkerResponse);
    webWorkerChannel(36, 12, this.props.dim, this.props.pointClasses);
    webWorkerChannel(72, 24, this.props.dim, this.props.pointClasses);
    webWorkerChannel(120, 40, this.props.dim, this.props.pointClasses);
  },

  receiveWebWorkerResponse: function(result): void {
    var newGraph = WebWorkerGraphSlug.reconstruct(result);
    this.props.scene.remove(this.state.graph);
    this.props.scene.add(newGraph);
    this.setState({graph: newGraph});
  },

  componentWillUnmount: function() {
    this.props.scene.remove(this.state.graph);
  },

  shouldComponentUpdate: function(): bool {
    // console.log('TODO');
    return false;
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = WebWorkerGraph;
