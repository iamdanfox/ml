React = require 'react'
THREE = require 'three'
{projectErrorForGraph, leastSquaresObjective} = require './leastSquares.cjsx'


material = new THREE.MeshNormalMaterial
  color: 0x00ff00
  side: THREE.DoubleSide

num = 48

module.exports = Surface = React.createClass

  getInitialState: ->
    angle: 0
    down: null

  scene: null
  camera: null
  renderer: null
  graph: null

  componentDidMount: ->
    @scene = new THREE.Scene()
    @camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ) # Field of view, aspect ratio, near clip, far clip

    @renderer = new THREE.WebGLRenderer({antialias:true} )
    @renderer.setSize( @props.dim, @props.dim );

    @addGraphMesh(@props)

    geometry = new THREE.SphereGeometry(3, 32, 32)
    basicMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    @sphere = new THREE.Mesh( geometry, basicMaterial );
    @updateSphere(@props)
    @scene.add( @sphere );

    @camera.up = new THREE.Vector3( 0, 0, 1 );
    @camera.position.z = 180

    @refs.container.getDOMNode().appendChild(@renderer.domElement)

    @raycaster = new THREE.Raycaster();
    @mouse = new THREE.Vector2();

    @doRender()

  doRender: ->
    @camera.position.x = Math.cos(@state.angle) * 300
    @camera.position.y = Math.sin(@state.angle) * 300
    @camera.lookAt(@scene.position);

    @renderer?.render(@scene, @camera)

  addGraphMesh: (props) ->
    meshFunction = (i,j) =>
      x = (i - 0.5) * props.dim
      y = (j - 0.5) * props.dim
      lso = leastSquaresObjective({x,y}, props.pointClasses)
      return new THREE.Vector3(x, y, projectErrorForGraph lso);
    graphGeometry = new THREE.ParametricGeometry( meshFunction, num, num, true );

    @graph = new THREE.Mesh( graphGeometry, material )
    @scene.add( @graph )

  updateSphere: (props) ->
    if props.highlightedW?
      [x,y] = props.highlightedW
      lso = leastSquaresObjective({x,y}, props.pointClasses)
      z = projectErrorForGraph lso;
      @sphere.position.set(x,y,z)

  componentWillReceiveProps: (nextProps) ->
    if (nextProps.pointClasses[0].length isnt @props.pointClasses[0].length) or (nextProps.pointClasses[1].length isnt @props.pointClasses[1].length)
      @scene.remove @graph
      @addGraphMesh(nextProps)

    @updateSphere(nextProps)

  componentWillUpdate: (nextProps, nextState) ->
    @doRender()

  mm: (e) ->
    if @state.down?
      deltax = e.clientX - @state.down
      angle = (deltax/@props.dim) * 2 * Math.PI

      @setState
        angle: @state.startAngle - angle
    else
      #raycaster mode
      {left, top} = @refs.container.getDOMNode().getBoundingClientRect()
      x = 2 * (e.clientX - left) / @props.dim - 1
      y = - 2 * (e.clientY - top) / @props.dim + 1

              # this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera ).sub( camera.position ).normalize();


      @raycaster.set( @camera.position, @camera );
      @raycaster.ray.direction.set(x, y, 0.5).unproject(@camera).sub(@camera.position).normalize()

      console.log @scene.children, @raycaster.intersectObjects( @scene.children )
        # console.log 'a'
        # intersect.object.material.color = new THREE.Color( 0xff0000 )

      @doRender()

  render: ->
    <div ref='container' style={display:'inline-block'}
     onMouseDown={(e)=> @setState down:e.clientX, startAngle:@state.angle }
     onMouseUp={=> @setState down:null}
     onMouseMove={@mm}></div>
