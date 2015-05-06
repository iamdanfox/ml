/* @flow */
"use strict";

/* flow-include import type * as THREE from 'three'; */
type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Result = {faces: Array<any>; vertices: Array<any>};
type Props = {
  dim: number;
  pointGroups: Array<PointGrp>;
  rResolution: number;
  scene: THREE.Scene;
  thetaResolution: number;
}
type State = {
  graph: ?THREE.Mesh;
  uuid: ?string;
}

var React = require("react/addons");
var WebWorkerGraphSlug = require("./WebWorkerGraphSlug.jsx");
var WorkerBridge = require("./WorkerBridge.jsx");




var WebWorkerGraph = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
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

  componentWillReceiveProps: function(nextProps: Props): void {
    if (this.shouldComponentUpdate(nextProps)) {
      this.unsubscribeFromWebWorker(); // ignore outstanding responses
      this.synchronouslyComputeInitialGraph(nextProps);
      // start rendering afresh
      var webWorkerChannel = this.subscribeToWebWorker();
      setTimeout(() => this.asyncRequestGraphs(0, webWorkerChannel, nextProps), 100);
    }
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.pointGroups !== this.props.pointGroups);
  },

  synchronouslyComputeInitialGraph: function(props: Props) {
    if (this.state.graph) {
      this.props.scene.remove(this.state.graph);
    }
    var {thetaResolution, rResolution, dim, pointGroups} = props;
    var result = WebWorkerGraphSlug.respond(thetaResolution, rResolution, dim, pointGroups);
    var graph = WebWorkerGraphSlug.reconstruct(result);
    this.setState({graph: graph});
    props.scene.add(graph);
  },

  asyncRequestGraphs: function(requestNumber: number, webWorkerChannel, props: Props) {
     var requestQueue = [
      {thetaResolution: 36, rResolution: 12},
      {thetaResolution: 72, rResolution: 24}
    ];
    if (requestNumber < requestQueue.length) {
      console.log("SENDING", requestNumber);
      var {thetaResolution, rResolution} = requestQueue[requestNumber];
      webWorkerChannel(requestNumber, thetaResolution, rResolution, props.dim, props.pointGroups);
    } else {
      console.log('done requesting')
    }
  },

  subscribeToWebWorker: function() {
    var uuid = Math.random().toString();
    var webWorkerChannel = WorkerBridge.subscribe(uuid, this.receiveWebWorkerResponse);
    this.setState({uuid});
    return webWorkerChannel;
  },

  receiveWebWorkerResponse: function(requestNumber: number, result: Result): void {
    console.log("RECEIVE ", requestNumber);
    var newGraph = WebWorkerGraphSlug.reconstruct(result);
    this.props.scene.remove(this.state.graph);
    this.props.scene.add(newGraph);
    this.setState({graph: newGraph});
    this.props.forceParentUpdate();

    this.unsubscribeFromWebWorker();
    var channel = this.subscribeToWebWorker();
    this.asyncRequestGraphs(requestNumber + 1, channel, this.props);
  },

  unsubscribeFromWebWorker: function() {
    if (typeof this.state.uuid !== "undefined" && this.state.uuid !== null){
      WorkerBridge.unsubscribe(this.state.uuid);
      this.setState({uuid: null});
    }
  },

  componentWillMount: function() {
    this.synchronouslyComputeInitialGraph(this.props);
    var webWorkerChannel = this.subscribeToWebWorker();
    this.asyncRequestGraphs(0, webWorkerChannel, this.props);
  },

  componentWillUnmount: function() {
    this.unsubscribeFromWebWorker();
    this.props.scene.remove(this.state.graph);
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = WebWorkerGraph;
