/* @flow */
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
"use strict";

var React = require("react/addons");
var THREE = require("three");

type State = {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
}
type PointGrp = {label: number; points: Array<P2>; editingInProgress: bool};
type Props = {
  dim: number;
  pointGroups: Array<PointGrp>;
  objective: (w: P2, pointGroups: Array<PointGrp>) => number;
  angle: number;
}


var ThreeScene = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    objective: React.PropTypes.func.isRequired,
    angle: React.PropTypes.number.isRequired,
  },

  getDistance: function(): number {
    return 1.4;
  },

  getInitialState: function(): State {
    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.01, 100 ); // Field of view, aspect ratio, near clip, far clip
    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
    this.updateCamera(initialCamera, this.props.angle);

    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
    initialRenderer.setClearColor( 0x111111, 1 );
    initialRenderer.setSize(this.props.dim, this.props.dim);

    return {
      camera: initialCamera,
      renderer: initialRenderer,
      scene: new THREE.Scene(),
    };
  },

  componentDidMount: function() {
    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);
    this.state.renderer.render(this.state.scene, this.state.camera);
  },

  componentWillUpdate: function(nextProps: Props): void {
    if (nextProps.angle !== this.props.angle) {
      this.updateCamera(this.state.camera, nextProps.angle);
    }
    if (nextProps.dim !== this.props.dim) {
      this.state.renderer.setSize(nextProps.dim, nextProps.dim);
    }
  },

  updateCamera: function(camera: THREE.Camera, angle: number): void {
    camera.position.x = Math.cos(angle) * this.getDistance();
    camera.position.y = Math.sin(angle) * this.getDistance();
    camera.position.z = 0.4 * this.getDistance();
    camera.lookAt(new THREE.Vector3(0, 0, -0.3));
  },

  render: function(): ?ReactElement {
    var mergeInProps = {
      pointGroups: this.props.pointGroups,
      objective: this.props.objective,
      scene: this.state.scene,
      forceParentUpdate: () => this.forceUpdate()
    };
    var children = React.Children.map(this.props.children, function(childElement) {
      if (React.isValidElement(childElement)) {
        return React.cloneElement(childElement, mergeInProps);
      } else {
        return null;
      }
    });

    this.state.renderer.render(this.state.scene, this.state.camera);

    return (
      <div ref="container">
        { children }
      </div>
    );
  }
});

module.exports = ThreeScene;
