/* @flow */
"use strict";

var React = require("react");
var THREE = require('three');

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];
type Props = {
  highlightedW: ?[number, number];
  pointClasses: PointClasses;
  projectedError: (w: P2, pointClasses: PointClasses) => number;
  scene: THREE.Scene;
}


var CursorSphere = React.createClass({
  propTypes: {
    highlightedW: React.PropTypes.any.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    projectedError: React.PropTypes.func.isRequired,
    scene: React.PropTypes.any.isRequired
  },

  getInitialState: function() {
    return {
      sphere: new THREE.Mesh( new THREE.SphereGeometry(3, 32, 32) , new THREE.MeshLambertMaterial() )
    };
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.sphere);
  },

  componentWillUnmount: function() {
    this.props.scene.remove(this.state.sphere);
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.highlightedW !== this.props.highlightedW);
  },

  componentWillReceiveProps: function(nextProps: Props) {
    var highlightedW = nextProps.highlightedW;
    if (typeof highlightedW !== "undefined" && highlightedW !== null) {
      var [x, y] = highlightedW;
      var z = nextProps.projectedError({x, y}, nextProps.pointClasses);
      this.state.sphere.position.set(x, y, z);
    }
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = CursorSphere;
