React = require 'react'

THREE = require 'three'

module.exports = Surface = React.createClass

  componentDidMount: ->
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ) # Field of view, aspect ratio, near clip, far clip

    renderer = new THREE.WebGLRenderer()
    renderer.setSize( @props.dim, @props.dim );

    @refs.container.getDOMNode().appendChild(renderer.domElement)

  render: ->
    <div ref='container'>
    aljf
    </div>
