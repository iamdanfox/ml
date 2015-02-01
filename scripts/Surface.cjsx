React = require 'react'
THREE = require 'three'
{projectErrorForGraph, leastSquaresObjective} = require './LeastSquares.jsx'


module.exports = Surface = React.createClass
  displayName: 'Surface'

  getInitialState: ->
    angle: 0
    mouseDownClientX: null
    mouseDownCamera: null
    mouseDownPoint: null

  componentDidMount: ->
    @scene = new THREE.Scene()

    @updateGraphMesh(@props)

    @sphere = @initializeSphere()
    @updateSpherePosition(@props)

    @initializeCamera()
    @updateCamera(@state)

    @initializeRenderer()
    @renderScene()

  componentWillReceiveProps: (nextProps) ->
    if (nextProps.pointClasses[0].length isnt @props.pointClasses[0].length) or
      (nextProps.pointClasses[1].length isnt @props.pointClasses[1].length)
        @updateGraphMesh(nextProps)

    @updateSpherePosition(nextProps)

  componentWillUpdate: (nextProps, nextState) ->
    @updateCamera(nextState)
    @renderScene()

  initializeRenderer: ->
    renderer = new THREE.WebGLRenderer
      antialias: true
    renderer.setSize( @props.dim, @props.dim )
    renderer.setClearColor( 0x111111, 1 )
    @renderScene = -> renderer.render(@scene, @camera)
    @refs.container.getDOMNode().appendChild(renderer.domElement)

  initializeCamera: ->
    @camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ) # Field of view, aspect ratio, near clip, far clip
    @camera.up = new THREE.Vector3( 0, 0, 1 )
    @camera.position.z = 180

  updateCamera: (state) ->
    @camera.position.x = Math.cos(state.angle) * 300
    @camera.position.y = Math.sin(state.angle) * 300
    @camera.lookAt(new THREE.Vector3(0,0,0))

  initializeSphere: ->
    sphereGeometry = new THREE.SphereGeometry(3, 32, 32)
    sphereMaterial = new THREE.MeshLambertMaterial()
    sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
    @scene.add( sphere )
    return sphere

  updateSpherePosition: (props) ->
    if props.highlightedW?
      [x,y] = props.highlightedW
      lso = leastSquaresObjective({x,y}, props.pointClasses)
      z = projectErrorForGraph lso
      @sphere.position.set(x,y,z)

  updateGraphMesh: (props) ->
    @scene.remove @graph
    @graph = new THREE.Mesh(
      @colourGraphGeometry(@buildGraphGeometry(props)),
      new THREE.MeshBasicMaterial
        side: THREE.DoubleSide
        vertexColors: THREE.FaceColors
    )
    @scene.add( @graph )

  buildGraphGeometry: (props) ->
    polarMeshFunction = (i,j) ->
      theta = i * 2 * Math.PI
      r = Math.pow(2, 0.7* j) - 1 # this ensures there are lots of samples near the origin.
      x = r * Math.cos(theta) * props.dim
      y = r * Math.sin(theta) * props.dim
      lso = leastSquaresObjective({x,y}, props.pointClasses)
      return new THREE.Vector3(x, y, projectErrorForGraph lso)

    RESOLUTION = 24
    return new THREE.ParametricGeometry( polarMeshFunction, 8* RESOLUTION, 0.5* RESOLUTION, true )

  colourGraphGeometry: (graphGeometry) ->
    graphGeometry.computeBoundingBox()
    zMin = graphGeometry.boundingBox.min.z
    zRange = graphGeometry.boundingBox.max.z - zMin

    hue = 0.54
    sat = 0.8
    colourCurve = (z) -> 0.07 + 0.93*Math.pow(z, 2)

    faceIndices = [ 'a', 'b', 'c']
    for face in graphGeometry.faces
      totalZ = faceIndices
        .map (x) -> graphGeometry.vertices[face[x]].z
        .reduce ((a,b) -> a + b), 0
      normalizedZ = (totalZ - 3*zMin) / (3*zRange)
      face.color.setHSL( hue, sat, colourCurve(normalizedZ))
    return graphGeometry

  mouseDown: (e) ->
    intersections = @raycast(@camera, e).intersectObject(@graph)
    if intersections.length > 0 # try to drag
      @setState
        mouseDownCamera: @camera.clone()
        mouseDownPoint: intersections[0].point

    @setState
      mouseDownClientX: e.clientX
      startAngle: @state.angle

  mouseUp: ->
    @setState
      mouseDownClientX: null
      mouseDownCamera: null
      mouseDownPoint: null

  mouseMove: (e) ->
    if @state.mouseDownClientX?
      if @state.mouseDownPoint?
        @handleGraphDrag(e)
      else
        @handleSpaceDrag(e)
    else
      @handleHover(e)

  handleGraphDrag: (e) ->
    plane = new THREE.Plane(new THREE.Vector3(0,0,1), -@state.mouseDownPoint.z)
    raycaster = @raycast(@state.mouseDownCamera, e)
    cursorPoint = raycaster.ray.intersectPlane(plane)
    if cursorPoint?
      angle = (point) -> Math.atan(point.y/point.x)
      fudge = if (cursorPoint.x>0 and @state.mouseDownPoint.x<=0) or (cursorPoint.x<=0 and @state.mouseDownPoint.x>0) then Math.PI else 0
      deltaAngle = angle(cursorPoint) - fudge - angle(@state.mouseDownPoint)
      @setState
        angle: @state.startAngle - deltaAngle

  handleSpaceDrag: (e) ->
    deltaX = e.clientX - @state.mouseDownClientX
    deltaAngle = (deltaX/@props.dim) * 2 * Math.PI
    @setState
      angle: @state.startAngle - deltaAngle

  handleHover: (e) ->
    intersections = @raycast(@camera, e).intersectObject(@graph)
    if intersections.length > 0
      {x,y} = intersections[0].point
      @props.highlightW x, y

  raycast: (camera, e) ->
    {left, top} = @refs.container.getDOMNode().getBoundingClientRect()
    x = 2 * (e.clientX - left) / @props.dim - 1
    y = - 2 * (e.clientY - top) / @props.dim + 1
    raycaster = new THREE.Raycaster()
    raycaster.set( camera.position, camera )
    raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(camera.position).normalize()
    return raycaster

  render: ->
    <div ref='container' style={display:'inline-block'}
      onMouseDown={@mouseDown}
      onMouseUp={@mouseUp}
      onMouseMove={@mouseMove}></div>
