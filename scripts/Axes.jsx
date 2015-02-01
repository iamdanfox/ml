/* @flow */
"use strict";
var React = require('react');

var Axes = React.createClass({
  render: function(): ?ReactElement {
    var yAxis = `M${ 0 } ${ this.props.dim } L${ 0 } ${ -this.props.dim }`;
    var xAxis = `M${ -this.props.dim } ${ 0 } L${ this.props.dim } ${ 0 }`;
    return (
      <g>
        <path d={xAxis} strokeWidth="3" stroke="#d0d0d0" />
        <path d={yAxis} strokeWidth="3" stroke="#d0d0d0" />
      </g>
    );
  }
});

module.exports = Axes;
