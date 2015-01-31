React = require 'react'
{rot90, lineEq, scale, dotProduct, sizeSquared, add} = require './VectorUtils.cjsx'
{leastSquaresObjective, projectErrorToRadius} = require './LeastSquares.cjsx'


module.exports = ObjectiveFunctionVis = React.createClass
  displayName: 'ObjectiveFunctionVis'

  propTypes:
    dim: React.PropTypes.number.isRequired
    pointClasses: React.PropTypes.array.isRequired

  mouseMove: (e) ->
    {left, top} = @refs.svg.getDOMNode().getBoundingClientRect()
    x = e.pageX - left
    y = @props.dim - (e.pageY - top)
    @props.highlightW x - @props.dim/2, y - @props.dim/2

  clearHighlightedW: ->
    @props.clearHighlightedW()

  render: ->
    dim = @props.dim

    num = 24
    stepSize = dim/num * Math.sqrt(2)
    grid = [0..num].map (x) -> for y in [0..num]
      x: x - num/2
      y: y - num/2
    flatGridSmall = Array.prototype.concat.apply [], grid
    flatGrid = flatGridSmall.map scale(stepSize)

    if @props.highlightedW? # lineEq highlighted and origin ... different vector representations!
      [x,y] = @props.highlightedW
      w = {x,y}
      lengthW = Math.sqrt(sizeSquared(w))
      unitW = scale(1/lengthW)(w)
      perp = rot90 unitW
      offset = scale(lengthW % stepSize)(unitW)
      flatGrid = flatGrid
        .map ({x,y}) -> add( scale(x)(unitW) )( scale(y)(perp) )
        .map add(offset)

    inbounds = ({x,y}) -> (-dim/2 -10 < x < dim/2 + 10) and (-dim/2 -10 < y < dim/2 + 10)

    <svg style={background: '#222', width: dim, height: dim} onMouseMove={@mouseMove} onMouseLeave={@clearHighlightedW} ref='svg'>
      <g transform={"translate("+dim/2+" "+dim/2+")  scale(1 -1) "}>
        { flatGrid  # require('../data/lines.json')
            .filter (w) -> not lineEq(w, {x:0,y:0})
            .filter inbounds
            .map (w) =>
              lso = leastSquaresObjective(w, @props.pointClasses)
              console.assert not isNaN(lso)
              <circle key={w.x+" "+w.y} cx={w.x} cy={w.y} r={projectErrorToRadius lso} fill="white" /> }

        { if @props.highlightedW?
            [x,y] = @props.highlightedW
            semiRed = "rgba(255,0,0,0.4)"
            lso = leastSquaresObjective({x,y}, @props.pointClasses)
            # console.assert not isNaN lso #THIS IS FAILING
            <g>
              <path d="M 0 0 L #{x} #{y}"
              strokeWidth="1.5"
              stroke={semiRed} />
              <circle cx={x} cy={y} r={projectErrorToRadius lso} fill={semiRed} />
            </g> }
      </g>
    </svg>

