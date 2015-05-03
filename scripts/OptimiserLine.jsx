/* @flow */
"use strict";

var React = require("react");
var THREE = require('three');


var OptimiserLine = React.createClass({
  propTypes: {
    vertices: React.PropTypes.array.isRequired,
    projectedError: React.PropTypes.func.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    scene: React.PropTypes.any.isRequired
  },

  getInitialState: function() {
    return {line: null};
  },

  componentWillMount: function() {
    // this.props.scene.add(this.state.line);
  },

  componentWillUnmount: function() {
    // this.props.scene.remove(this.state.line);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (nextProps.vertices !== this.props.vertices ||
      nextProps.pointClasses !== this.props.pointClasses ||
      nextProps.projectedError !== this.props.projectedError)
  },

  componentWillReceiveProps: function(nextProps) {
    var vertices = nextProps.vertices;
    if (typeof vertices !== "undefined" && vertices !== null) {
      this.props.scene.remove(this.state.line)

      var LINE_MATERIAL = new THREE.LineBasicMaterial({color: 0xffffff});
      var geometry = new THREE.Geometry();
      var line = new THREE.Line(geometry, LINE_MATERIAL);

      geometry.vertices = vertices.map(
        (w) => {
          var z = nextProps.projectedError(w, nextProps.pointClasses);
          return new THREE.Vector3(w.x, w.y, z + 3); // hack to keep the line above the surface. (better would be smart interpolation)
        }
      );

      nextProps.scene.add(line);
      this.setState({
        line: line
      });
    }
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = OptimiserLine;
