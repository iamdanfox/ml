React = require 'react'


module.exports = AllPoints = React.createClass
  displayName: 'AllPoints'
  render: ->
    <g>
      <PointClass points={require '../data/class0points.json'} color="red" />
      <PointClass points={require '../data/class1points.json'} color="blue" />
    </g>


PointClass = React.createClass
  displayName: 'PointClass'

  render: ->
    <g>{@props.points.map (p) => <circle key={p.x} cx={p.x} cy={p.y} r="3" fill={@props.color} /> }</g>
