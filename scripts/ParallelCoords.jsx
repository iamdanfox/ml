/* @flow */
"use strict";

var React = require("react");
var THREE = require("three");


var ParallelCoords = React.createClass({

  getInitialState: function() {
    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ); // Field of view, aspect ratio, near clip, far clip
    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
    initialCamera.position.z = 180;

    var initialScene = new THREE.Scene();
    // add axes to scene
    var RADIUS = 30;
    var DIMENSION = 3;
    var baseCoords = [0, 1, 2]
      .map( (axis) => (axis / DIMENSION) * 2 * Math.PI )
      .map(function(angle) {
        return {
          x: RADIUS * Math.cos(angle),
          y: RADIUS * Math.sin(angle),
        }
      });
    console.log(baseCoords);

    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
    initialRenderer.setClearColor( 0x111111, 1 );

    return {
      camera: initialCamera,
      scene: initialScene,
      renderer: initialRenderer,
    };
  },

  componentDidMount: function() {
    this.state.renderer.setSize( this.props.dim, this.props.dim );
    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);
    this.state.renderer.render(this.state.scene, this.state.camera);
  },

  render: function(): ?ReactElement {
    return (
      <div ref="container" style={{display: "inline-block"}}></div>
    );
  }
});

module.exports = ParallelCoords;
