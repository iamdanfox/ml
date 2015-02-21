/* @flow */
"use strict";

var React = require("react");
var {Scene, PerspectiveCamera, Mesh, Object3D} = require("react-three");

var THREE = require("three");



var SPHERE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xff0000});


var Surface2 = React.createClass({
  getInitialState: function() {
    return {
      angle: 0
    };
  },

  render: function(): ?ReactElement {
    var geometry = new THREE.SphereGeometry(3, 32, 32);
    geometry.makeGroups();


    var spherePosition = new THREE.Vector3(0, 0, 0);
    if (typeof this.props.highlightedW !== "undefined" && this.props.highlightedW !== null) {
      var [x, y] = this.props.highlightedW;
      var z = this.props.projectedError({x, y}, this.props.pointClasses);
      spherePosition = new THREE.Vector3(x, y, z);
    }

    return (
      <Scene width={this.props.dim} height={this.props.dim} camera="maincamera">

        <PerspectiveCamera name="maincamera" fov={75} aspect={1} near={0.1} far={1000}
          position={new THREE.Vector3(300 * Math.cos(this.state.angle), 300 * Math.sin(this.state.angle), 180)}
          lookat={new THREE.Vector3(0, 0, 0)} />

        { spherePosition && <Mesh
            geometry={geometry}
            material={SPHERE_MATERIAL}
            position={spherePosition} /> }

      </Scene>
    );
  }
});

module.exports = Surface2;

