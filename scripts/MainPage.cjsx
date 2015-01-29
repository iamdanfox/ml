React = require 'react'

# genPoints = for i in [0..80]
#   { x: Math.random(), y: Math.random() }


module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  getInitialState: ->
    hoveredLine: null

  selectLine: (line) ->
    @setState hoveredLine: line

  render: ->
    dim = 400


    # console.log JSON.stringify allPoints

    yAxis = "M#{ 0 } #{ dim } L#{ 0 } #{ -dim }"
    xAxis = "M#{ -dim } #{ 0 } L#{ dim } #{ 0 }"

    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <p><a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a></p>

      <svg style={background:'#e0e0e0', width:dim, height:dim}>
        <g transform={"translate("+dim/2+" "+dim/2+") scale(1 -1)"}>
          <path d={xAxis} strokeWidth="3" stroke="#d0d0d0" />
          <path d={yAxis} strokeWidth="3" stroke="#d0d0d0" />

          <Lines dim={dim} selectLine={@selectLine} hoveredLine={@state.hoveredLine} />
          <Points points={require './class0points.json'} color="red" />
          <Points points={require './class1points.json'} color="blue" />
        </g>
      </svg>

      <div className='three-d'>
        OBJECTIVE FUNCTION linked to lines
      </div>
    </div>


Points = React.createClass
  render: ->
    <g>
      {@props.points.map (p) => <circle key={p.x} cx={p.x} cy={p.y} r="3" fill={@props.color} /> }
    </g>


Lines = React.createClass

  render: ->
    dim = @props.dim

    # the argument vector is in the normal to the line
    makeLine = (w) =>
      {x,y} = rot90 w
      # this doesn't bother to constrain the lines exactly, preferring to just overshoot the DIM,DIM viewport
      <path d="M #{-x*dim} #{-y*dim} L #{x*dim} #{y*dim}"
        strokeWidth="1.5"
        stroke={if lineEq(w, @props.hoveredLine) then "rgba(30,30,30,0.7)" else "rgba(30,30,30,0.3)"}
        onMouseOver={=> @props.selectLine(w)} />

    <g>
    { require('./lines.json')
        .map center(dim)
        .map makeLine }
    </g>



lineEq = (p1, p2) ->
  (p1? and p2?) and (p1.x is p2.x) and (p1.y is p2.y)

center = (dim) -> ({x,y}) ->
  x: (x - 0.5) * dim
  y: (y - 0.5) * dim

# counter clockwise rotation of a vector, by 90 degrees
rot90 = ({x,y}) ->
  x: -y
  y: x

dotProduct = ({x:x1,y:y1}, {x:x2,y:y2}) -> x1*x2 + y1*y2

