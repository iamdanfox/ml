React = require 'react'


module.exports = AllPoints = React.createClass
  displayName: 'AllPoints'

  propTypes:
    pointClasses: React.PropTypes.array.isRequired

  render: ->
    [class0, class1] = @props.pointClasses
    <g>
      <PointClass points={class0} color="red" />
      <PointClass points={class1} color="blue" />
    </g>


PointClass = React.createClass
  displayName: 'PointClass'
  render: ->
    <g>{@props.points.map (p) => <circle key={p.x} cx={p.x} cy={p.y} r="3" fill={@props.color} /> }</g>
