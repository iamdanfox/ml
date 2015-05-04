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
    dim: React.PropTypes.number.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    rResolution: React.PropTypes.number.isRequired, // 8
    scene: React.PropTypes.any.isRequired,
    thetaResolution: React.PropTypes.number.isRequired, // 24
  },

  getInitialState: function(): State {
    return {
      graph: null,
      uuid: null,
    };
  },

  componentWillReceiveProps: function(nextProps): void {
    if (this.shouldComponentUpdate(nextProps)) {
      this.unsubscribeFromWebWorker(); // ignore outstanding responses
      this.synchronouslyComputeInitialGraph(nextProps);

      var webWorkerChannel = this.subscribeToWebWorker();
      this.asyncRequestGraphs(webWorkerChannel, nextProps);
    }
  },

  shouldComponentUpdate: function(nextProps): bool {
    return (nextProps.pointClasses != this.props.pointClasses);
  },

  synchronouslyComputeInitialGraph: function(props) {
    if (this.state.graph) {
      this.props.scene.remove(this.state.graph);
    }
    var {thetaResolution, rResolution, dim, pointClasses} = props;
    var result = WebWorkerGraphSlug.respond(thetaResolution, rResolution, dim, pointClasses)
    var graph = WebWorkerGraphSlug.reconstruct(result);
    this.setState({graph: graph});
    props.scene.add(graph);
  },

  asyncRequestGraphs: function(webWorkerChannel, props) {
    webWorkerChannel(36, 12, props.dim, props.pointClasses);
    webWorkerChannel(72, 24, props.dim, props.pointClasses);
    webWorkerChannel(120, 40, props.dim, props.pointClasses);
  },

  subscribeToWebWorker: function() {
    var uuid = this._reactInternalInstance._rootNodeID + Math.random().toString();
    var webWorkerChannel = WorkerBridge.subscribe(uuid, this.receiveWebWorkerResponse);
    this.setState({uuid});
    return webWorkerChannel;
  },

  receiveWebWorkerResponse: function(result): void {
    var newGraph = WebWorkerGraphSlug.reconstruct(result);
    this.props.scene.remove(this.state.graph);
    this.props.scene.add(newGraph);
    this.setState({graph: newGraph});
  },

  unsubscribeFromWebWorker: function() {
    WorkerBridge.unsubscribe(this.state.uuid);
    this.setState({uuid: null, webWorkerChannel: null});
  },

  componentWillMount: function() {
    this.synchronouslyComputeInitialGraph(this.props);
    var webWorkerChannel = this.subscribeToWebWorker();
    this.asyncRequestGraphs(webWorkerChannel, this.props);
  },

  componentWillUnmount: function() {
    this.unsubscribeFromWebWorker()
    this.props.scene.remove(this.state.graph);
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = WebWorkerGraph;
