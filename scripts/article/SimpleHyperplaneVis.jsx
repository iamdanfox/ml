/* @flow */
"use strict";

var AllPoints = require("./AllPoints.jsx");
var Axes = require("./Axes.jsx");
var React = require("react/addons");
var {PureRenderMixin} = require("react/addons").addons;


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

module.exports = SimpleHyperplaneVis;
