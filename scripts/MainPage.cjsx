React = require 'react'
Lines = require './Lines.cjsx'
Axes = require './Axes.cjsx'
AllPoints = require './AllPoints.cjsx'
ObjectiveFunctionVis = require './ObjectiveFunctionVis.cjsx'

dim = 400

module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  getInitialState: ->
    hoveredLine: null

  selectLine: (line) ->
    @setState hoveredLine: line

  render: ->
    # console.log JSON.stringify allPoints


    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <p><a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a></p>

      <h2>Main vis</h2>
      <svg style={background:'#e0e0e0', width:dim, height:dim}>
        <g transform={"translate("+dim/2+" "+dim/2+") scale(1 -1)"}>
          <Axes dim={dim} />
          <Lines dim={dim} selectLine={@selectLine} hoveredLine={@state.hoveredLine} />
          <AllPoints />
        </g>
      </svg>

      <ObjectiveFunctionVis dim={dim} hoveredLine={@state.hoveredLine} />
    </div>

