/* @flow */
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
"use strict";

var React = require("react/addons");
var THREE = require("three");

type State = {
  angle: number;
  camera: THREE.PerspectiveCamera;
  mouseDownCamera: ?THREE.Camera;
  mouseDownClientX: ?number;
  mouseDownPoint: ?THREE.Vector3;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  startAngle: ?number;
}
type PointGrp = {label: number; points: Array<P2>};
type Props = {
  dim: number;
  highlightW: F<P2, void>;
  pointGroups: Array<PointGrp>;
  objective: (w: P2, pointGroups: Array<PointGrp>) => number;
}


var Draggable3DScene = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    highlightW: React.PropTypes.func.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    objective: React.PropTypes.func.isRequired
  },

  getDistance: function(): number {
    return 1.4;
  },

  getInitialState: function(): State {
    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.01, 1000 ); // Field of view, aspect ratio, near clip, far clip
    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
    initialCamera.position.z = 0.4 * this.getDistance();

    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
    initialRenderer.setClearColor( 0x111111, 1 );
    initialRenderer.setSize(this.props.dim, this.props.dim);

    return {
      angle: 0,
      camera: initialCamera,
      mouseDownCamera: null,
      mouseDownClientX: null,
      mouseDownPoint: null,
      renderer: initialRenderer,
      scene: new THREE.Scene(),
      startAngle: null,
    };
  },

  componentWillMount: function() {
    this.updateCamera(this.state);
  },

  componentDidMount: function() {
    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);
    this.state.renderer.render(this.state.scene, this.state.camera);
  },

  componentWillUpdate: function(nextProps: Props, nextState?: State): void {
    if (typeof nextState !== "undefined" && nextState !== null) {
      this.updateCamera(nextState);
    }
    if (nextProps.dim !== this.props.dim) {
      this.state.renderer.setSize(nextProps.dim, nextProps.dim);
    }
  },

  updateCamera: function(state: State): void {
    this.state.camera.position.x = Math.cos(state.angle) * this.getDistance();
    this.state.camera.position.y = Math.sin(state.angle) * this.getDistance();
    this.state.camera.lookAt(new THREE.Vector3(0, 0, -0.3));
  },

  mouseDown: function(e: React.SyntheticEvent): void {
    var intersections = this.getGraphIntersections(e);
    if (intersections.length > 0){ // try to drag
      this.setState({
        mouseDownCamera: this.state.camera.clone(),
        mouseDownPoint: intersections[0].point,
      });
    }
    this.setState({
      mouseDownClientX: e.clientX,
      startAngle: this.state.angle
    });
  },

  mouseUp: function(): void {
    this.setState({
      mouseDownClientX: null,
      startAngle: null,
      mouseDownCamera: null,
      mouseDownPoint: null
    });
  },

  mouseMove: function(e: React.SyntheticEvent): void {
    if (typeof this.state.mouseDownClientX !== "undefined" && this.state.mouseDownClientX !== null &&
        typeof this.state.startAngle !== "undefined" && this.state.startAngle !== null) {
      if (typeof this.state.mouseDownPoint !== "undefined" && this.state.mouseDownPoint !== null &&
          typeof this.state.mouseDownCamera !== "undefined" && this.state.mouseDownCamera !== null) {
        this.handleSceneDrag(e, this.state.startAngle, this.state.mouseDownPoint, this.state.mouseDownCamera);
      } else {
        this.handleSpaceDrag(e, this.state.startAngle, this.state.mouseDownClientX);
      }
    } else {
      this.handleHover(e);
    }
  },

  handleSceneDrag: function(e: React.SyntheticEvent,
      startAngle: number,
      mouseDownPoint: THREE.Vector3,
      mouseDownCamera: THREE.Camera): void {
    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -mouseDownPoint.z);
    var raycaster = this.raycast(mouseDownCamera, e);
    var cursorPoint = raycaster.ray.intersectPlane(plane);
    if (typeof cursorPoint !== "undefined" && cursorPoint !== null) {
      var angle = function(point: P2): number {
        return Math.atan(point.y / point.x);
      };
      var fudge = (cursorPoint.x > 0 && mouseDownPoint.x < 0) ||
        (cursorPoint.x < 0 && mouseDownPoint.x > 0) ? Math.PI : 0;
      var deltaAngle = angle(cursorPoint) - fudge - angle(mouseDownPoint);
      this.setState({
        angle: startAngle - deltaAngle
      });
    }
  },

  handleSpaceDrag: function(e: React.SyntheticEvent, startAngle: number, mouseDownClientX: number): void {
    var deltaX = e.clientX - mouseDownClientX;
    var deltaAngle = (deltaX / this.props.dim) * 2 * Math.PI;
    this.setState({
      angle: startAngle - deltaAngle
    });
  },

  getGraphIntersections: function(e: React.SyntheticEvent): Array<THREE.Vector3> {
    // exclude line & CursorSphere
    var graph = this.state.scene.children.filter((child) =>
      child instanceof THREE.Mesh && !(child.geometry instanceof THREE.SphereGeometry));
    return this.raycast(this.state.camera, e).intersectObjects(graph);
  },

  handleHover: function(e: React.SyntheticEvent): void {
    var intersections = this.getGraphIntersections(e);
    if (intersections.length > 0) {
      this.props.highlightW(intersections[0].point);
    }
  },

  raycast: function(camera: THREE.Camera, e: React.SyntheticEvent): THREE.Raycaster {
    var {left: left, top: top} = this.refs.container.getDOMNode().getBoundingClientRect();
    var x = 2 * (e.clientX - left) / this.props.dim - 1;
    var y = -2 * (e.clientY - top) / this.props.dim + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.set( camera.position, camera );
    raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(camera.position).normalize();
    return raycaster;
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
      <div ref="container"
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseMove={this.mouseMove}>
        {children}
      </div>
    );
  }
});

module.exports = Draggable3DScene;
