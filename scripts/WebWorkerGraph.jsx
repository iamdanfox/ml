/* @flow */
"use strict";

var React = require("react/addons");
var workerSlug = require("./WebWorkerGraphSlug.jsx");
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
    var graph = workerSlug(thetaResolution, rResolution, dim, pointClasses)
    this.setState({graph});
    this.props.scene.add(graph);

    // set up worker connection
    var reactElementId = this._reactInternalInstance._rootNodeID; // maybe cache a UUID instead?
    var webWorkerChannel = WorkerBridge.subscribe(reactElementId, this.receiveWebWorkerResponse);
    webWorkerChannel(120, 40, 400, this.props.pointClasses);
  },

  receiveWebWorkerResponse: function(mesh): void {
    console.log('reactElement received', mesh);
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
