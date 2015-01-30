React = require 'react'


module.exports = Axes = React.createClass
  render: ->
    yAxis = "M#{ 0 } #{ @props.dim } L#{ 0 } #{ -@props.dim }"
    xAxis = "M#{ -@props.dim } #{ 0 } L#{ @props.dim } #{ 0 }"
    <g>
      <path d={xAxis} strokeWidth="3" stroke="#d0d0d0" />
      <path d={yAxis} strokeWidth="3" stroke="#d0d0d0" />
    </g>
