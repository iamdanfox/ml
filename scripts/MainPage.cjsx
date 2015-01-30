React = require 'react'
Line = require './Line.cjsx'
Axes = require './Axes.cjsx'
AllPoints = require './AllPoints.cjsx'
ObjectiveFunctionVis = require './ObjectiveFunctionVis.cjsx'


DIM = 400

module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  getInitialState: ->
    highlightedW: null

  mouseMove: (e) ->
    {left, top} = @refs.svg.getDOMNode().getBoundingClientRect()
    x = e.pageX - left
    y = DIM - (e.pageY - top)
    @highlightW x - DIM/2, y - DIM/2

  highlightW: (x,y) ->
    @setState highlightedW: [x,y]

  clearHighlightedW: ->
    @setState highlightedW: null

  render: ->
    pointClasses = [require('../data/class0points.json'), require('../data/class1points.json')]

    <div className='main-page'>
      <svg style={background:'#e0e0e0', width:DIM, height:DIM} ref='svg' onMouseMove={@mouseMove} onMouseLeave={@clearHighlightedW} >
        <g transform={"translate("+DIM/2+" "+DIM/2+") scale(1 -1)"}>
          <Axes dim={DIM} />
          <AllPoints pointClasses={pointClasses} />

          { if @state.highlightedW?
              [x,y] = @state.highlightedW
              w = {x,y}
              semiRed = "rgba(255,0,0,0.4)"
              <g>
                <path d="M 0 0 L #{x} #{y}"
                strokeWidth="1.5"
                stroke={semiRed} />
                <Line w={w} dim={DIM} />
              </g> }
        </g>
      </svg>

      <ObjectiveFunctionVis
        dim={DIM}
        pointClasses={pointClasses}
        highlightW={@highlightW}
        highlightedW={@state.highlightedW}
        clearHighlightedW={@clearHighlightedW} />
    </div>

