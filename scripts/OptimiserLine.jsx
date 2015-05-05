/* @flow */
"use strict";

var React = require("react/addons");
var THREE = require("three");

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];
type Props = {
  vertices: Array<P2>;
  pointClasses: PointClasses;
  projectedError: (w: P2, pointClasses: PointClasses) => number;
  scene: THREE.Scene;
}
type State = {
  line: ?THREE.Line;
}


var OptimiserLine = React.createClass({
  propTypes: {
    vertices: React.PropTypes.array.isRequired,
    projectedError: React.PropTypes.func.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    scene: React.PropTypes.any.isRequired
  },

  getInitialState: function(): State {
    return {line: null};
  },

  shouldComponentUpdate: function(nextProps: Props): bool {
    return (nextProps.vertices !== this.props.vertices ||
      nextProps.pointClasses !== this.props.pointClasses ||
      nextProps.projectedError !== this.props.projectedError);
  },

  componentWillReceiveProps: function(nextProps: Props) {
    if (this.shouldComponentUpdate(nextProps)) {
      var vertices = nextProps.vertices;
      this.props.scene.remove(this.state.line);

      if (typeof vertices !== "undefined" && vertices !== null) {

        var LINE_MATERIAL = new THREE.LineBasicMaterial({color: 0xffffff});
        var geometry = new THREE.Geometry();
        var line = new THREE.Line(geometry, LINE_MATERIAL);

        geometry.vertices = vertices.map(
          (w) => {
            var z = nextProps.projectedError(w, nextProps.pointClasses);
            return new THREE.Vector3(w.x, w.y, z + 0.01); // hack to keep the line above the surface. (better would be smart interpolation)
          }
        );

        nextProps.scene.add(line);
        this.setState({line: line});
      }
    }
  },

  render: function(): ?ReactElement {
    return null;
  }
});

module.exports = OptimiserLine;
