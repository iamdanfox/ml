/* @flow */
"use strict";

var React = require("react");
var {Scene, PerspectiveCamera, Mesh, Line} = require("react-three");

var THREE = require("three");



var SPHERE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xff0000});


var Surface2 = React.createClass({
  getInitialState: function() {
    return {
      angle: 0,
      lineGeom: new THREE.Geometry()
    };
  },

  // buildGraphGeometry: function(props: Props): THREE.ParametricGeometry {
  //   var polarMeshFunction = function(i: number, j: number): THREE.Vector3 {
  //     var theta = i * 2 * Math.PI;
  //     var r = Math.pow(2, 0.7 * j) - 1; // this ensures there are lots of samples near the origin.
  //     var x = r * Math.cos(theta) * props.dim;
  //     var y = r * Math.sin(theta) * props.dim;
  //     var z = this.props.projectedError({x, y}, props.pointClasses);
  //     return new THREE.Vector3(x, y, z);
  //   };

  //   var RESOLUTION = 24;
  //   return new THREE.ParametricGeometry( polarMeshFunction.bind(this), 8 * RESOLUTION, 0.5 * RESOLUTION, true );
  // },


  drawOptimiserLine: function(x: number, y: number): void {
    var HOVER_AMOUNT = 3; // hack to keep the line above the surface. (better would be smart interpolation)

    this.state.lineGeom.vertices = this.props.optimiserFunction({x, y}, this.props.pointClasses).map(
      (w) => {
        var z = this.props.projectedError(w, this.props.pointClasses);
        return new THREE.Vector3(w.x, w.y, z + HOVER_AMOUNT);
      }
    );
  },

  render: function(): ?ReactElement {
    var geometry = new THREE.SphereGeometry(3, 32, 32);
    geometry.makeGroups();


    var spherePosition = new THREE.Vector3(0, 0, 0);


    if (typeof this.props.highlightedW !== "undefined" && this.props.highlightedW !== null) {
      var [x, y] = this.props.highlightedW;
      var z = this.props.projectedError({x, y}, this.props.pointClasses);
      spherePosition = new THREE.Vector3(x, y, z);


      if (typeof this.props.optimiserFunction !== "undefined" && this.props.optimiserFunction !== null){
        this.drawOptimiserLine(x, y);
      }
    }

    // var graphMesh = new THREE.Mesh(
    //   this.buildGraphGeometry(this.props),
    //   new THREE.MeshNormalMaterial()
    // );

    return (
      <Scene width={this.props.dim} height={this.props.dim} camera="maincamera">

        <PerspectiveCamera name="maincamera" fov={75} aspect={1} near={0.1} far={1000}
          position={new THREE.Vector3(300 * Math.cos(this.state.angle), 300 * Math.sin(this.state.angle), 180)}
          lookat={new THREE.Vector3(0, 0, 0)} />

        { spherePosition && <Mesh
            geometry={geometry}
            material={SPHERE_MATERIAL}
            position={spherePosition} /> }

        { this.state.lineGeom &&
          <Line
            geometry={this.state.lineGeom}
            material={new THREE.LineBasicMaterial({color: 0xff0000})} /> }

      </Scene>
    );
  }
});

module.exports = Surface2;

