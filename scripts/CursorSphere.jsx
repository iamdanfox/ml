/* @flow */
"use strict";

var React = require("react/addons");
var THREE = require("three");

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>; editingInProgress: bool};
type Props = {
  highlightedW: P2;
  pointGroups: Array<PointGrp>;
  objective: (w: P2, pointGroups: Array<PointGrp>) => number;
  scene: THREE.Scene;
}


var CursorSphere = React.createClass({
  propTypes: {
    highlightedW: React.PropTypes.object.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    objective: React.PropTypes.func.isRequired,
    scene: React.PropTypes.any.isRequired
  },

  getInitialState: function() {
    return {
      sphere: new THREE.Mesh( new THREE.SphereGeometry(6 / this.props.dim, 6, 6) , new THREE.MeshLambertMaterial() )
    };
  },

  componentWillMount: function() {
    this.props.scene.add(this.state.sphere);
  },

  componentWillUnmount: function() {
    this.props.scene.remove(this.state.sphere);
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.highlightedW !== this.props.highlightedW ||
      this.props.pointGroups !== nextProps.pointGroups ||
      this.props.objective !== nextProps.objective);
  },

  componentWillReceiveProps: function(nextProps: Props) {
    if (this.shouldComponentUpdate(nextProps)) {
      var highlightedW = nextProps.highlightedW;

      if (typeof highlightedW !== "undefined" && highlightedW !== null) {
        var {x, y} = highlightedW;
        var z = nextProps.objective(highlightedW, nextProps.pointGroups);
        this.state.sphere.position.set(x, y, z);
      }
    }
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = CursorSphere;
