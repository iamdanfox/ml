/* @flow */
"use strict";

var React = require("react");
var {Scene, PerspectiveCamera, Mesh, Object3D} = require("react-three");

var THREE = require("three");



var SPHERE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xff0000});


var Surface2 = React.createClass({
 render: function(): ?ReactElement {
    var geometry = new THREE.SphereGeometry(3, 32, 32);
    geometry.makeGroups();

    return (
      <Scene width={this.props.dim} height={this.props.dim} camera="maincamera">

        <PerspectiveCamera name="maincamera" fov={75} aspect={1} near={0.1} far={1000}
          position={new THREE.Vector3(50, 50, 80)} lookat={new THREE.Vector3(0, 0, 0)} />


        <Mesh
          geometry={geometry}
          material={SPHERE_MATERIAL}
          position={new THREE.Vector3(0, 0, 0)} />

      </Scene>
    );
  }
});

module.exports = Surface2;

