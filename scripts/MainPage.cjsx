React = require 'react'

module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  render: ->

    points = require './points.json'

    dim = 400

    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a>

      <div className='graph-with-lines'>
        axes
        lines
        <svg style={background:'#e0e0e0', width:dim, height:dim}>
          { points
              .map (p) -> <circle key={p.x} cx={p.x*dim} cy={p.y*dim} r="3" fill="red" /> }
        </svg>
      </div>
      <div className='three-d'>
        OBJECTIVE FUNCTION linked to lines
      </div>
    </div>
