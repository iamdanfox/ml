/* @flow */
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
"use strict";

var React = require("react");
var THREE = require("three");

type State = {
  angle: number;
  startAngle: ?number;
  mouseDownClientX: ?number;
  mouseDownCamera: ?THREE.Camera;
  mouseDownPoint: ?THREE.Vector3;
  camera: THREE.PerspectiveCamera;
  graph: THREE.Mesh;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
}
type PointClasses = [Array<P2>, Array<P2>];
type Props = {
  dim: number;
  highlightW: F<[number, number], void>;
  pointClasses: PointClasses;
  projectedError: (w: P2, pointClasses: PointClasses) => number;
}



var Surface = React.createClass({

  getInitialState: function(): State {
    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ); // Field of view, aspect ratio, near clip, far clip
    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
    initialCamera.position.z = 180;

    var initialScene = new THREE.Scene();

    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
    initialRenderer.setClearColor( 0x111111, 1 );

    return {
      angle: 0,
      startAngle: null,
      mouseDownClientX: null,
      mouseDownCamera: null,
      mouseDownPoint: null,
      camera: initialCamera,
      graph: this.buildGraphMesh(this.props),
      scene: initialScene,
      renderer: initialRenderer,
    };
  },

  componentDidMount: function() {
    this.updateGraphMesh(this.props);


    this.updateCamera(this.state);
    this.state.renderer.setSize( this.props.dim, this.props.dim );
    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);

    this.state.renderer.render(this.state.scene, this.state.camera);
  },

  componentWillUpdate: function(nextProps: Props, nextState?: State): void {
    if ((nextProps.pointClasses[0].length !== this.props.pointClasses[0].length) ||
      (nextProps.pointClasses[1].length !== this.props.pointClasses[1].length)) {
      this.updateGraphMesh(nextProps);
    }
    if (typeof nextState !== "undefined" && nextState !== null) {
      this.updateCamera(nextState);
    }
  },

  updateCamera: function(state: State): void {
    this.state.camera.position.x = Math.cos(state.angle) * 300;
    this.state.camera.position.y = Math.sin(state.angle) * 300;
    this.state.camera.lookAt(new THREE.Vector3(0, 0, 0));
  },

  updateGraphMesh: function(props: Props): void {
    this.state.scene.remove(this.state.graph);
    var newGraph = this.buildGraphMesh(props);
    this.setState({graph: newGraph});
    this.state.scene.add( newGraph );
  },

  buildGraphMesh: function(props: Props): THREE.Mesh {
    return new THREE.Mesh(
      this.colourGraphGeometry(this.buildGraphGeometry(props)),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        vertexColors: THREE.FaceColors
      })
    );
  },

  buildGraphGeometry: function(props: Props): THREE.ParametricGeometry {
    var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
      var theta = i * 2 * Math.PI;
      var r = Math.pow(1.8, j * j) - 1; // this ensures there are lots of samples near the origin and gets close to 0!
      var x = r * Math.cos(theta) * props.dim;
      var y = r * Math.sin(theta) * props.dim;
      var z = this.props.projectedError({x, y}, props.pointClasses);
      return new THREE.Vector3(x, y, z);
    };

    var RESOLUTION = 24;
    return new THREE.ParametricGeometry( polarMeshFunction.bind(this), 8 * RESOLUTION, 0.5 * RESOLUTION, true );
  },

  colourGraphGeometry: function(graphGeometry: THREE.ParametricGeometry): THREE.ParametricGeometry {
    graphGeometry.computeBoundingBox();
    var zMin = graphGeometry.boundingBox.min.z;
    var zRange = graphGeometry.boundingBox.max.z - zMin;

    var colourCurve = (z) => 0.07 + 0.93 * Math.pow(z, 2);

    for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
      var face = graphGeometry.faces[i];
      var totalZ = graphGeometry.vertices[face.a].z +
        graphGeometry.vertices[face.b].z +
        graphGeometry.vertices[face.c].z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      face.color.setHSL( 0.54, 0.8, colourCurve(normalizedZ));
    }
    return graphGeometry;
  },

  mouseDown: function(e: React.SyntheticEvent): void {
    var intersections = this.raycast(this.state.camera, e).intersectObject(this.state.graph);
    if (intersections.length > 0){ // try to drag
      this.setState({
        mouseDownCamera: this.state.camera.clone(),
        mouseDownPoint: intersections[0].point
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
        this.handleGraphDrag(e, this.state.startAngle, this.state.mouseDownPoint, this.state.mouseDownCamera);
      } else {
        this.handleSpaceDrag(e, this.state.startAngle, this.state.mouseDownClientX);
      }
    } else {
      this.handleHover(e);
    }
  },

  handleGraphDrag: function(e: React.SyntheticEvent,
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

  handleHover: function(e: React.SyntheticEvent): void {
    var intersections = this.raycast(this.state.camera, e).intersectObject(this.state.graph);
    if (intersections.length > 0) {
      var {x, y} = intersections[0].point;
      this.props.highlightW(x, y);
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
      pointClasses: this.props.pointClasses,
      projectedError: this.props.projectedError,
      scene: this.state.scene
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
      <div ref="container" style={{display: "inline-block"}}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseMove={this.mouseMove}>
        {children}
      </div>
    );
  }
});

module.exports = Surface;
