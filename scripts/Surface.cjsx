React = require 'react'

THREE = require 'three'

module.exports = Surface = React.createClass

  getInitialState: ->
    rotation: 0

  scene: null
  camera: null
  renderer: null
  cube: null

  componentDidMount: ->
    @scene = new THREE.Scene()
    @camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ) # Field of view, aspect ratio, near clip, far clip

    @renderer = new THREE.WebGLRenderer()
    @renderer.setSize( @props.dim, @props.dim );

    geometry = new THREE.BoxGeometry( 1, 1, 1 )
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    @cube = new THREE.Mesh( geometry, material )
    @scene.add( @cube )

    @camera.position.z = 5

    @refs.container.getDOMNode().appendChild(@renderer.domElement)

  componentWillUpdate: (nextProps, nextState) ->
    if @props.highlightedW?
      [x,y] = @props.highlightedW
      @cube.rotation.z = Math.atan(y/x)
    @renderer?.render(@scene, @camera)

  render: ->
    <div ref='container'></div>
