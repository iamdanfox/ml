/* @flow */
"use strict";

var React = require("react");
var {Scene, PerspectiveCamera} = require("react-three");
var THREE = require("three");



var Surface2 = React.createClass({
 render: function(): ?ReactElement {
    return (
      <Scene width={this.props.dim} height={this.props.dim} camera="maincamera">

        <PerspectiveCamera name="maincamera" fov={75} aspect={1} near={0.1} far={1000}
          position={new THREE.Vector3(100, 100, 180)} lookat={new THREE.Vector3(0, 0, 0)}
          up={new THREE.Vector3(0, 0, 1)} />

      </Scene>
    );
  }
});

module.exports = Surface2;
