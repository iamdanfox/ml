/* @flow */
"use strict";

var React = require("react");
var Line = require("./Line.jsx");
var Axes = require("./Axes.jsx");
var AllPoints = require("./AllPoints.jsx");
var Surface = require("./Surface.jsx");
var DataSlider = require("./DataSlider.jsx");
var {projectedError, projectedError2} = require("./LeastSquares.jsx");

type F<U, V> = (x: U) => V;
type P2 = {x: number;y: number}

var points = require("../data/points.js");


function project(arg: P2): number {
  var {x: x, y: y} = arg;
  var angleRadians = Math.atan(y / x);
  return (angleRadians / Math.PI + 0.7) % 1;
}


var MainPage = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
  },

  getInitialState: function(): {highlightedW: ?[number, number];cutoffs: [number, number]} {
    return {
      highlightedW: null,
      cutoffs: [1, 1]
    };
  },

  mouseMove: function(e: React.SyntheticElement): void {
    var {left: left, top: top} = this.refs.svg.getDOMNode().getBoundingClientRect();
    var x = e.pageX - left;
    var y = this.props.dim - (e.pageY - top);
    this.highlightW(x - this.props.dim / 2, y - this.props.dim / 2);
  },

  highlightW: function(x: number, y: number): void {
    this.setState({
      highlightedW: [x, y]
    });
  },

  updateCutoff: function(i: number): F<number, void> {
    return (newCutoff) => {
      var newCutoffs = this.state.cutoffs.slice(0); // clone
      newCutoffs[i] = newCutoff;
      this.setState({
        cutoffs: newCutoffs
      });
    };
  },

  makeHyperplane: function(): ReactElement | boolean {
    if (typeof this.state.highlightedW !== "undefined" && this.state.highlightedW !== null) {
      var x = this.state.highlightedW[0];
      var y = this.state.highlightedW[1];
      return (<g>
        <path d={`M 0 0 L ${x} ${y}`} strokeWidth="1.5" stroke={"rgba(255, 0, 0, 0.4)"} />
        <Line w={{x: x, y: y}} dim={this.props.dim} />
      </g>);
    } else {
      return false;
    }
  },

  render: function(): ?ReactElement {
    var pointClasses = [points.class0, points.class1];
    for (var i = 0; i < pointClasses.length; i = i + 1) {
      pointClasses[i] = pointClasses[i].filter((p) => project(p) < this.state.cutoffs[i]);
    }

    var style = {background: "#e0e0e0", width: this.props.dim, height: this.props.dim};
    return (
      <div className="main-page">
        <h2>Minimisation Objective: Squares of Misclassified points</h2>
        <svg style={style} ref="svg" onMouseMove={this.mouseMove}>
          <g transform={"translate(" + this.props.dim / 2 + " " + this.props.dim / 2 + ") scale(1 -1)"}>
            <Axes dim={this.props.dim} />
            <AllPoints pointClasses={pointClasses} />
            { this.makeHyperplane() }
          </g>
        </svg>

        <Surface dim={this.props.dim} pointClasses={pointClasses} projectedError={projectedError}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

        <DataSlider color="red" fullData={points.class0} project={project} dim={this.props.dim}
          cutoff={this.state.cutoffs[0]} updateCutoff={this.updateCutoff(0)} />
        <DataSlider color="blue" fullData={points.class1} project={project} dim={this.props.dim}
          cutoff={this.state.cutoffs[1]} updateCutoff={this.updateCutoff(1)} />

        <Surface dim={this.props.dim} pointClasses={pointClasses} projectedError={projectedError2}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW} />
      </div>
    );
  }
});

module.exports = MainPage;
