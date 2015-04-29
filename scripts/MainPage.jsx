/* @flow */
"use strict";

var React = require("react");
var Surface = require("./Surface.jsx");
var {projectedError, projectedError2, perceptronError} = require("./LeastSquares.jsx");
var Modes = require("./Modes.js");
var HyperplaneVis = require("./HyperplaneVis.jsx");
var {computePerceptronWeight} = require("./Perceptron.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");

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
      <div style={{display: "flex", justifyContent: "space-between" }}>
        <HyperplaneVis
          dim={this.props.dim}
          mode={this.state.mode}
          pointClasses={this.state.pointClasses}
          updatePointClasses={this.updatePointClasses}
          highlightedW={this.state.highlightedW}
          highlightW={this.highlightW} />

        <Surface dim={this.props.dim}
          pointClasses={this.state.pointClasses} projectedError={perceptronError}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW} />


        { false && <div>

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


          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={projectedError2}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW}
            optimiserFunction={computePerceptronWeight} />

          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={projectedError}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={MaximumMargin.objective}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

        </div> }
      </div>
    );
  }
});


module.exports = MainPage;
