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
    cutoffs: [1, 1]

  mouseMove: (e) ->
    {left, top} = @refs.svg.getDOMNode().getBoundingClientRect()
    x = e.pageX - left
    y = DIM - (e.pageY - top)
    @highlightW x - DIM/2, y - DIM/2

  highlightW: (x,y) ->
    @setState highlightedW: [x,y]

  clearHighlightedW: ->
    # @setState highlightedW: null

  updateCutoff: (i) -> (newCutoff) =>
    newCutoffs = @state.cutoffs.slice(0) # clone
    newCutoffs[i] = newCutoff
    @setState
      cutoffs: newCutoffs

  render: ->
    pointClasses = [ require('../data/class0points.json'), require('../data/class1points.json') ]
    for i,pointClass of pointClasses
      pointClasses[i] = pointClass.filter (p) => project(p) < @state.cutoffs[i] # for want of a zip function!

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

      <DataSlider color="red" fullData={require('../data/class0points.json')} cutoff={@state.cutoffs[0]} updateCutoff={@updateCutoff(0)} />
      <DataSlider color="blue" fullData={require('../data/class1points.json')} cutoff={@state.cutoffs[1]} updateCutoff={@updateCutoff(1)} />

      <Surface />

    </div>



makeSurface = require './Surface.js'

Surface = React.createClass

  shouldComponentUpdate: (nextProps, nextState) ->
    # TODO check whether the data has changed and hence whether the objective plot should be re-calculated!
    false
    #If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change. (In addition, componentWillUpdate and componentDidUpdate will not be called.)

  componentWillReceiveProps: (nextProps) ->
    # do mutations!

  componentDidMount: ->
    makeSurface(@refs.surface.getDOMNode())

  render: ->
    <div ref="surface"></div>



DataSlider = React.createClass
  displayName: 'DataSlider'

  propTypes:
    fullData: React.PropTypes.array.isRequired
    color: React.PropTypes.string.isRequired
    cutoff: React.PropTypes.number.isRequired
    updateCutoff: React.PropTypes.func.isRequired

  mouseMove: (e) ->
    newCutoff = (e.pageX - @refs.svg.getDOMNode().getBoundingClientRect().left) / DIM
    @props.updateCutoff newCutoff

  render: ->
    height = 34
    <svg style={width: DIM, height: height, background: '#e0e0e0', display: 'block', margin: '10 0'}
      ref='svg' onMouseMove={@mouseMove}>
      <rect x="0" y="0" height={height} width={@props.cutoff * DIM} style={fill:'#ccc'} />
      { @props.fullData
          .map project
          .map (i) => <path d="M #{i*DIM} 0 L #{i*DIM} #{height}" strokeWidth="1"
            stroke={@props.color} style={opacity: if i < @props.cutoff then 1 else 0.1} /> }
    </svg>

project = ({x,y}) ->
  angleRadians = Math.atan(y/x)
  return (angleRadians/Math.PI + 0.7) % 1
