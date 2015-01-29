React = require 'react'

module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  render: ->
    dim = 400

    yAxis = "M#{ 0 } #{ dim } L#{ 0 } #{ -dim }"
    xAxis = "M#{ -dim } #{ 0 } L#{ dim } #{ 0 }"

    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <p><a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a></p>

      <svg style={background:'#e0e0e0', width:dim, height:dim}>
        <g transform={"translate("+dim/2+" "+dim/2+") scale(1 -1)"}>
          <Points dim={dim} />
          <path d={xAxis} strokeWidth="3" stroke="#d0d0d0" />
          <path d={yAxis} strokeWidth="3" stroke="#d0d0d0" />
          <Lines dim={dim} />
        </g>
      </svg>

      <div className='three-d'>
        OBJECTIVE FUNCTION linked to lines
      </div>
    </div>


Points = React.createClass
  render: ->
    center = ({x,y}) => {
      x: (x - 0.5) * @props.dim
      y: (y - 0.5) * @props.dim
    }

    <g>
    { require('./points.json')
        .map center
        .map (p) -> <circle key={p.x} cx={p.x} cy={p.y} r="3" fill="red" /> }
    </g>


Lines = React.createClass
  render: ->
    dim = @props.dim

    center = ({x,y}) -> {
      x: (x - 0.5) * dim
      y: (y - 0.5) * dim
    }

    # counter clockwise rotation of a vector, by 90 degrees
    rot90 = ({x,y}) -> {x: -y, y: x}

    # the argument vector is in the direction of the line
    makeLine = ({x,y}) ->
      # this doesn't bother to constrain the lines exactly, preferring to just overshoot the DIM,DIM viewport
      <path d="M #{-x*dim} #{-y*dim} L #{x*dim} #{y*dim}" strokeWidth="1.5" stroke="rgba(30,30,30,0.3)" />

    <g>
    { require('./lines.json')
        .map center
        .map rot90
        .map makeLine }
    </g>
