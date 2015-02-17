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

var MODES = {
  TRY_HYPERPLANE: 1,
  ADD_DATA: 2,
};

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
      cutoffs: [1, 1],
      mode: MODES.TRY_HYPERPLANE,
      pointClasses: require("../data/points.js"),
    };
  },

  mouseMove: function(e: React.SyntheticElement): void {
    var {left: left, top: top} = this.refs.svg.getDOMNode().getBoundingClientRect();
    var x = e.clientX - left;
    var y = this.props.dim - (e.clientY - top);
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

  updateMode: function(nextMode: number): () => void {
    return () =>
      this.setState({
        mode: nextMode,
      });
  },

  handleClearData: function(): void {
    this.setState({
      pointClasses: this.state.pointClasses.map(function(){ return []; }),
    });
  },

  handleResetData: function(): void {
    this.setState({
      pointClasses: require("../data/points.js"),
    });
  },

  render: function(): ?ReactElement {
    var pointClasses = [];
    for (var i = 0; i < this.state.pointClasses.length; i = i + 1) {
      pointClasses[i] = this.state.pointClasses[i].filter((p) => project(p) < this.state.cutoffs[i]);
    }

    var style = {background: "#e0e0e0", width: this.props.dim, height: this.props.dim};
    return (
      <div className="main-page">
        <h2>Minimisation Objective: Squares of Misclassified points</h2>

        <div>
          <button disabled={this.state.mode === MODES.TRY_HYPERPLANE}
            onClick={this.updateMode(MODES.TRY_HYPERPLANE)}>Try hyperplane</button>
          <button disabled={this.state.mode === MODES.ADD_DATA}
            onClick={this.updateMode(MODES.ADD_DATA)}>Add Data</button>
          <button onClick={this.handleClearData}>Clear Data</button>
          <button onClick={this.handleResetData}>Reset Data</button>
        </div>

        <svg style={style} ref="svg" onMouseMove={this.mouseMove}>
          <g transform={"translate(" + this.props.dim / 2 + " " + this.props.dim / 2 + ") scale(1 -1)"}>
            <Axes dim={this.props.dim} />
            <AllPoints pointClasses={pointClasses} />
            { (this.state.mode === MODES.TRY_HYPERPLANE) && this.makeHyperplane() }
          </g>
        </svg>

        <Surface dim={this.props.dim} pointClasses={pointClasses} projectedError={projectedError}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

        <DataSlider color="red" fullData={this.state.pointClasses[0]}
          project={project} dim={this.props.dim}
          cutoff={this.state.cutoffs[0]} updateCutoff={this.updateCutoff(0)} />
        <DataSlider color="blue" fullData={this.state.pointClasses[1]}
          project={project} dim={this.props.dim}
          cutoff={this.state.cutoffs[1]} updateCutoff={this.updateCutoff(1)} />

        <h2>Zero-One objective</h2>
        <p>The negation of the number of misclassified vectors</p>
        <Surface dim={this.props.dim} pointClasses={pointClasses} projectedError={projectedError2}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

        <h2>perceptron criterion</h2>
        <p>Ie a linear sum of errors</p>
        <p>Looks pretty much exactly the same as the least squares one.</p>
        {/*<Surface dim={this.props.dim} pointClasses={pointClasses} projectedError={linearError}
                  highlightedW={this.state.highlightedW} highlightW={this.highlightW} />*/}

      </div>
    );
  }
});

module.exports = MainPage;
