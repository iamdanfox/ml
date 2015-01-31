React = require 'react'
THREE = require 'three'
{projectErrorForGraph, leastSquaresObjective} = require './leastSquares.cjsx'


material = new THREE.MeshNormalMaterial
  color: 0x00ff00
  side: THREE.DoubleSide

num = 24

module.exports = Surface = React.createClass

  getInitialState: ->
    rotation: 0

  scene: null
  camera: null
  renderer: null
  graph: null

  componentDidMount: ->
    @scene = new THREE.Scene()
    @camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ) # Field of view, aspect ratio, near clip, far clip

    @renderer = new THREE.WebGLRenderer({antialias:true} )
    @renderer.setSize( @props.dim, @props.dim );

    meshFunction = (i,j) =>
      x = (i - 0.5) * @props.dim
      y = (j - 0.5) * @props.dim
      lso = leastSquaresObjective({x,y}, @props.pointClasses)
      return new THREE.Vector3(x, y, projectErrorForGraph lso);

    @graphGeometry = new THREE.ParametricGeometry( meshFunction, num, num, true );

    @graph = new THREE.Mesh( @graphGeometry, material )
    @scene.add( @graph )

    @camera.position.set(200,200,200);
    @camera.up = new THREE.Vector3( 0, 0, 1 );
    @camera.lookAt(@scene.position);

    @refs.container.getDOMNode().appendChild(@renderer.domElement)

    @doRender()

    console.log @graph

  doRender: ->
    @scene.remove @graph

    meshFunction = (i,j) =>
      x = (i - 0.5) * @props.dim
      y = (j - 0.5) * @props.dim
      lso = leastSquaresObjective({x,y}, @props.pointClasses)
      return new THREE.Vector3(x, y, projectErrorForGraph lso);

    @graphGeometry = new THREE.ParametricGeometry( meshFunction, num, num, true );

    @graph = new THREE.Mesh( @graphGeometry, material )
    @scene.add( @graph )

    # spin the world
    if @props.highlightedW?
      [x,y] = @props.highlightedW
      @graph.rotation.z = Math.atan(y/x) + (if x > 0 then Math.PI else 0)

    # draw onto box
    @renderer?.render(@scene, @camera)

  componentWillUpdate: (nextProps, nextState) ->
    @doRender()

  render: ->
    <div ref='container'></div>
