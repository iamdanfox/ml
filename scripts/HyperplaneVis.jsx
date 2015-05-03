/* @flow */
"use strict";

var React = require("react");
var Line = require("./Line.jsx");
var Axes = require("./Axes.jsx");
var AllPoints = require("./AllPoints.jsx");
var {modulus, subtract} = require("./VectorUtils.jsx");
var Modes = require("./Modes.js");

type F<U, V> = (x: U) => V;
type P2 = {x: number;y: number}


var DELETE_RADIUS = 20;


var HyperplaneVis = React.createClass({

  propTypes: {
    dim: React.PropTypes.number.isRequired,
    mode: React.PropTypes.number.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    updatePointClasses: React.PropTypes.func.isRequired,
    highlightedW: React.PropTypes.object,
    highlightW: React.PropTypes.func.isRequired,
    optimiserLine: React.PropTypes.array
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

  makeHyperplane: function(): ReactElement | boolean {
    if (typeof this.props.highlightedW !== "undefined" && this.props.highlightedW !== null) {
      var {x, y} = this.props.highlightedW;
      return (<g>
        <path d={`M 0 0 L ${x} ${y}`} strokeWidth="1.5" stroke={"rgba(255, 0, 0, 0.4)"} />
        <Line w={{x: x, y: y}} dim={this.props.dim} />
      </g>);
    } else {
      return false;
    }
  },

  handleClick: function(e: React.SyntheticEvent): void {
    switch (this.props.mode) {
      case Modes.ADD_DATA:
        var w = this.getMouseXY(e);
        this.props.updatePointClasses([
          this.props.pointClasses[0].concat([w]),
          this.props.pointClasses[1]
        ]);
        break;
      case Modes.REMOVE_DATA:
        var mousePosition = this.getMouseXY(e);
        this.props.updatePointClasses(
          this.props.pointClasses.map( (pointClass) => {
            return pointClass.filter( (point) => modulus(subtract(point)(mousePosition)) > DELETE_RADIUS);
          })
        );
        break;
    }
  },

  renderEraserCircle: function(): ReactElement | boolean {
    if (typeof this.props.highlightedW !== "undefined" && this.props.highlightedW !== null) {
      var {x, y} = this.props.highlightedW;
      return <circle cx={x} cy={y} r={DELETE_RADIUS} style={{fill: "rgba(0,0,0,0.2)"}} />;
    } else {
      return false;
    }
  },

  makeOptimisedHyperplane: function(): ReactElement | boolean {
    var line = this.props.optimiserLine;
    if (typeof line !== "undefined" && line !== null && line.length > 0) {
      var lastW = line[line.length - 1];
      return <Line w={lastW} dim={this.props.dim} style={{stroke: "green", opacity: 0.3}}/>;
    } else {
      return false;
    }
  },

  render: function(): ?ReactElement {
    var style = {background: "#e0e0e0", width: this.props.dim, height: this.props.dim};
    return (
      <svg style={style} ref="svg" onMouseMove={this.mouseMove} onClick={this.handleClick}>
        <g transform={"translate(" + this.props.dim / 2 + " " + this.props.dim / 2 + ") scale(1 -1)"}>
          <Axes dim={this.props.dim} />
          <AllPoints pointClasses={this.props.pointClasses} />
          { this.makeHyperplane() }
          { this.makeOptimisedHyperplane() }
          { (this.props.mode === Modes.REMOVE_DATA) && this.renderEraserCircle() }

        </g>
      </svg>
    );
  }
});

module.exports = HyperplaneVis;
