/* @flow */
"use strict";

var React = require("react");
var Surface = require("./Surface.jsx");
var DataSlider = require("./DataSlider.jsx");
var {projectedError, projectedError2} = require("./LeastSquares.jsx");
var Modes = require("./Modes.js");
var HyperplaneVis = require("./HyperplaneVis.jsx");

type F<U, V> = (x: U) => V;
type P2 = {x: number;y: number}


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
      mode: Modes.TRY_HYPERPLANE,
      pointClasses: require("../data/points.js"),
    };
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

  updatePointClasses: function(newPointClasses: [Array<P2>, Array<P2>]): void {
    this.setState({
      pointClasses: newPointClasses,
    });
  },

  updateMode: function(nextMode: number): () => void {
    return () =>
      this.setState({
        mode: nextMode,
      });
  },

  handleClearData: function(): void {
    this.setState({
      pointClasses: this.state.pointClasses.map(function() { return []; }),
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

    return (
      <div className="main-page">
        <h2>Minimisation Objective: Squares of Misclassified points</h2>

        <div>
          <button disabled={this.state.mode === Modes.TRY_HYPERPLANE}
            onClick={this.updateMode(Modes.TRY_HYPERPLANE)}>Try hyperplane</button>
          <button disabled={this.state.mode === Modes.ADD_DATA}
            onClick={this.updateMode(Modes.ADD_DATA)}>Add Data</button>
          <button disabled={this.state.mode === Modes.REMOVE_DATA}
            onClick={this.updateMode(Modes.REMOVE_DATA)}>Remove Data</button>
          <button onClick={this.handleClearData}>Clear Data</button>
          <button onClick={this.handleResetData}>Reset Data</button>
        </div>

        <HyperplaneVis
          dim={this.props.dim}
          mode={this.state.mode}
          pointClasses={pointClasses}
          updatePointClasses={this.updatePointClasses}
          highlightedW={this.state.highlightedW}
          highlightW={this.highlightW} />

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
