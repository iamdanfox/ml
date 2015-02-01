/* @flow */
var React = require('react');
var THREE = require('three');
var {projectErrorForGraph: projectErrorForGraph,
  leastSquaresObjective: leastSquaresObjective} = require('./LeastSquares.jsx');


type F<U, V> = (x:U) => V;
type P2 = {x: number; y: number};


type State = {
  angle:number;
  startAngle: ?number;
  mouseDownClientX: ?number;
  mouseDownCamera: ?THREE.Camera;
  mouseDownPoint: ?THREE.Vector3
}
type Props = {
  dim:number;
  pointClasses: [Array<P2>, Array<P2>];
  highlightedW: ?[number, number];
  highlightW: F<[number, number],void>
}



var graph: THREE.Mesh = null;
var scene: THREE.Scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ); // Field of view, aspect ratio, near clip, far clip
camera.up = new THREE.Vector3( 0, 0, 1 );
camera.position.z = 180;

var sphere = new THREE.Mesh( new THREE.SphereGeometry(3, 32, 32) , new THREE.MeshLambertMaterial() );
scene.add(sphere);



var renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setClearColor( 0x111111, 1 );
var renderScene = function() {
  renderer.render(scene, camera);
};



var Surface = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    highlightW: React.PropTypes.func.isRequired,
    highlightedW: React.PropTypes.any, // technically a tuple...
    pointClasses: React.PropTypes.array.isRequired
  },

  getInitialState: function (): State {
    return {
      angle: 0,
      startAngle: null,
      mouseDownClientX: null,
      mouseDownCamera: null,
      mouseDownPoint: null
    };
  },

  componentDidMount: function() {
    this.updateGraphMesh(this.props);

    this.updateSpherePosition(this.props);

    this.updateCamera(this.state);
    renderer.setSize( this.props.dim, this.props.dim );
    this.refs.container.getDOMNode().appendChild(renderer.domElement);
    renderScene();
  },

  componentWillReceiveProps: function (nextProps: Props) {
    if ((nextProps.pointClasses[0].length != this.props.pointClasses[0].length) ||
      (nextProps.pointClasses[1].length != this.props.pointClasses[1].length)) {
        this.updateGraphMesh(nextProps);
    }

    this.updateSpherePosition(nextProps);
  },

  componentWillUpdate: function(nextProps:Props, nextState?: State): void {
    if (nextState != null) {
      this.updateCamera(nextState);
    }
    renderScene();
  },

  updateCamera: function (state: State): void {
    camera.position.x = Math.cos(state.angle) * 300;
    camera.position.y = Math.sin(state.angle) * 300;
    camera.lookAt(new THREE.Vector3(0,0,0));
  },

  updateSpherePosition: function (props: Props): void {
    if (props.highlightedW != null) {
      var [x,y] = props.highlightedW;
      var lso = leastSquaresObjective({x:x,y:y}, props.pointClasses);
      var z = projectErrorForGraph(lso);
      sphere.position.set(x,y,z);
    }
  },

  updateGraphMesh: function (props:Props): void {
    scene.remove(graph);
    graph = new THREE.Mesh(
      this.colourGraphGeometry(this.buildGraphGeometry(props)),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        vertexColors: THREE.FaceColors
      })
    );
    scene.add( graph );
  },

  buildGraphGeometry: function (props:Props): THREE.ParametricGeometry {
    var polarMeshFunction = function (i: number, j: number): THREE.Vector3 {
      var theta = i * 2 * Math.PI;
      var r = Math.pow(2, 0.7* j) - 1; // this ensures there are lots of samples near the origin.
      var x = r * Math.cos(theta) * props.dim;
      var y = r * Math.sin(theta) * props.dim;
      var lso = leastSquaresObjective({x,y}, props.pointClasses);
      return new THREE.Vector3(x, y, projectErrorForGraph(lso));
    };

    var RESOLUTION = 24;
    return new THREE.ParametricGeometry( polarMeshFunction, 8* RESOLUTION, 0.5* RESOLUTION, true );
  },

  colourGraphGeometry: function (graphGeometry: THREE.ParametricGeometry): THREE.ParametricGeometry {
    graphGeometry.computeBoundingBox();
    var zMin = graphGeometry.boundingBox.min.z;
    var zRange = graphGeometry.boundingBox.max.z - zMin;

    var hue = 0.54;
    var sat = 0.8;
    var colourCurve = (z) => 0.07 + 0.93*Math.pow(z, 2);

    for (var i=0; i < graphGeometry.faces.length; i++) {
      var face = graphGeometry.faces[i];
      var totalZ = graphGeometry.vertices[face.a].z + graphGeometry.vertices[face.b].z + graphGeometry.vertices[face.c].z;
      var normalizedZ = (totalZ - 3*zMin) / (3*zRange);
      face.color.setHSL( hue, sat, colourCurve(normalizedZ));
    }
    return graphGeometry;
  },

  mouseDown: function (e: React.SyntheticEvent): void {
    var intersections = this.raycast(camera, e).intersectObject(graph);
    if (intersections.length > 0){ // try to drag
      this.setState({
        mouseDownCamera: camera.clone(),
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

  mouseMove: function(e: React.SyntheticEvent):void {
    if (this.state.mouseDownClientX != null && this.state.startAngle != null)
      if (this.state.mouseDownPoint != null && this.state.mouseDownCamera != null)
        this.handleGraphDrag(e, this.state.startAngle, this.state.mouseDownPoint, this.state.mouseDownCamera);
      else
        this.handleSpaceDrag(e, this.state.startAngle, this.state.mouseDownClientX);
    else
      this.handleHover(e);
  },

  handleGraphDrag: function (e:React.SyntheticEvent, startAngle: number, mouseDownPoint: THREE.Vector3, mouseDownCamera: THREE.Camera): void {
    var plane = new THREE.Plane(new THREE.Vector3(0,0,1), -mouseDownPoint.z);
    var raycaster = this.raycast(mouseDownCamera, e);
    var cursorPoint = raycaster.ray.intersectPlane(plane);
    if (cursorPoint != null) {
      var angle = function (point: P2):number {
        return Math.atan(point.y / point.x);
      };
      var fudge = (cursorPoint.x>0 && mouseDownPoint.x<=0) || (cursorPoint.x<=0 && mouseDownPoint.x>0) ? Math.PI : 0;
      var deltaAngle = angle(cursorPoint) - fudge - angle(mouseDownPoint);
      this.setState({
        angle: startAngle - deltaAngle
      });
    }
  },

  handleSpaceDrag: function (e: React.SyntheticEvent, startAngle: number, mouseDownClientX: number): void {
    var deltaX = e.clientX - mouseDownClientX;
    var deltaAngle = (deltaX/this.props.dim) * 2 * Math.PI;
    this.setState({
      angle: startAngle - deltaAngle
    });
  },

  handleHover: function (e: React.SyntheticEvent): void {
    var intersections = this.raycast(camera, e).intersectObject(graph);
    if (intersections.length > 0) {
      var {x:x,y:y} = intersections[0].point;
      this.props.highlightW(x, y);
    }
  },

  raycast: function (camera: THREE.Camera, e:React.SyntheticEvent): THREE.Raycaster {
    var {left:left, top:top} = this.refs.container.getDOMNode().getBoundingClientRect();
    var x = 2 * (e.clientX - left) / this.props.dim - 1;
    var y = - 2 * (e.clientY - top) / this.props.dim + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.set( camera.position, camera );
    raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(camera.position).normalize();
    return raycaster;
  },

  render: function(): ?ReactElement {
    return (
      <div ref='container' style={{display:'inline-block'}}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}></div>
    );
  }
});

module.exports = Surface;