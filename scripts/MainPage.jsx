/* @flow */
"use strict";

var React = require("react");
var Surface = require("./Surface.jsx");
var {projectedError2, perceptronError} = require("./LeastSquares.jsx");
var Modes = require("./Modes.js");
var HyperplaneVis = require("./HyperplaneVis.jsx");
var {computePerceptronWeight} = require("./Perceptron.jsx");
var ParallelCoords = require("./ParallelCoords.jsx");

type P2 = {x: number; y: number}


var MainPage = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
  },

  getInitialState: function(): {highlightedW: ?[number, number]; mode: number} {
    return {
      highlightedW: null,
      mode: Modes.TRY_HYPERPLANE,
      pointClasses: require("../data/points.js"),
    };
  },

  highlightW: function(x: number, y: number): void {
    this.setState({
      highlightedW: [x, y]
    });
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
          pointClasses={this.state.pointClasses}
          updatePointClasses={this.updatePointClasses}
          highlightedW={this.state.highlightedW}
          highlightW={this.highlightW} />

        <Surface dim={this.props.dim}
          pointClasses={this.state.pointClasses} projectedError={projectedError2}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW}
          optimiserFunction={computePerceptronWeight} />

        { false &&
          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={perceptronError}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW} />
        }

        <ParallelCoords dim={this.props.dim} />
      </div>
    );
  }
});

module.exports = MainPage;
