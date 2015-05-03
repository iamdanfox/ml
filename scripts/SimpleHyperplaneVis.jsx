/* @flow */
"use strict";

var AllPoints = require("./AllPoints.jsx");
var Axes = require("./Axes.jsx");
var Line = require("./Line.jsx");
var React = require("react");
var {PureRenderMixin} = require('react/addons').addons;


var SimpleHyperplaneVis = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    dim: React.PropTypes.number.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    highlightW: React.PropTypes.func.isRequired,
  },

  mouseMove: function(e: React.SyntheticEvent): void {
    this.props.highlightW(this.getMouseXY(e));
  },

  getMouseXY: function(e: React.SyntheticEvent): {x: number; y: number} {
    var {left, top} = this.refs.svg.getDOMNode().getBoundingClientRect();
    var x = e.clientX - left;
    var y = this.props.dim - (e.clientY - top);
    return {x: x - this.props.dim / 2, y: y - this.props.dim / 2};
  },

  render: function(): ?ReactElement {
    var style = {background: "#e0e0e0", width: this.props.dim, height: this.props.dim};
    return (
      <svg style={style} ref="svg" onMouseMove={this.mouseMove}>
        <g transform={"translate(" + this.props.dim / 2 + " " + this.props.dim / 2 + ") scale(1 -1)"}>

          <Axes dim={this.props.dim} />
          <AllPoints pointClasses={this.props.pointClasses} />

          { this.props.children }
        </g>
      </svg>
    );
  }
});


var Hyperplane = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    w: React.PropTypes.object.isRequired,
    dim: React.PropTypes.number.isRequired
  },

  render: function(): ?ReactElement {
    var {x, y} = this.props.w;
    return <g>
      <path d={`M 0 0 L ${x} ${y}`} strokeWidth="1.5" stroke={"rgba(255, 0, 0, 0.4)"} />
      <Line w={{x, y}} dim={this.props.dim} />
    </g>;
  }
});

module.exports = {SimpleHyperplaneVis, Hyperplane};
