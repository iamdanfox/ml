React = require 'react'

module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  render: ->
    dim = 400

    yAxis = "M#{ 0 } #{ dim } L#{ 0 } #{ -dim }"
    xAxis = "M#{ -dim } #{ 0 } L#{ dim } #{ 0 }"

    # the argument vector, w, is the normal to the line
    # w describes points, r, by:  r . w = 0
    makeLine = ({x,y}) ->
      <path d="M 0 0 L 100 100" strokeWidth="1" stroke="red" />


    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a>

      <svg style={background:'#e0e0e0', width:dim, height:dim}>
        <g transform={"translate("+dim/2+" "+dim/2+") scale(1 -1)"}>
          <Points dim={dim} />
          <path d={xAxis} strokeWidth="3" stroke="#d0d0d0" />
          <path d={yAxis} strokeWidth="3" stroke="#d0d0d0" />

          <g>
          { require('./lines.json').map makeLine }
          </g>
        </g>
      </svg>

      <div className='three-d'>
        OBJECTIVE FUNCTION linked to lines
      </div>
    </div>

Points = React.createClass
  render: ->
    <g>
      { require('./points.json')
          .map ({x,y}) => {
            x: (x - 0.5) * @props.dim
            y: (y - 0.5) * @props.dim
          }
          .map (p) -> <circle key={p.x} cx={p.x} cy={p.y} r="3" fill="red" /> }
    </g>

