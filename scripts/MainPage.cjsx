React = require 'react'
Lines = require './Lines.cjsx'
Axes = require './Axes.cjsx'
AllPoints = require './AllPoints.cjsx'
ObjectiveFunctionVis = require './ObjectiveFunctionVis.cjsx'


DIM = 400

module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  getInitialState: ->
    hoveredLine: null

  selectLine: (line) ->
    @setState hoveredLine: line

  render: ->
    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <p><a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a></p>

      <h2>Main vis</h2>
      <svg style={background:'#e0e0e0', width:DIM, height:DIM}>
        <g transform={"translate("+DIM/2+" "+DIM/2+") scale(1 -1)"}>
          <Axes dim={DIM} />
          <Lines dim={DIM} selectLine={@selectLine} hoveredLine={@state.hoveredLine} />
          <AllPoints />
        </g>
      </svg>

      <ObjectiveFunctionVis dim={DIM} hoveredLine={@state.hoveredLine} />
    </div>

