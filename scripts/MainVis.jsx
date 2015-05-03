/* @flow */
"use strict";

// var MaximumMargin = require("./MaximumMargin.jsx");
// var {computePerceptronWeight} = require("./Perceptron.jsx");
// var {projectedError, projectedError2} = require("./LeastSquares.jsx");
var CursorSphere = require('./CursorSphere.jsx');
var Draggable3DScene = require("./Draggable3DScene.jsx");
var HyperplaneVis = require("./HyperplaneVis.jsx");
var Modes = require("./Modes.js");
var OptimiserLine = require('./OptimiserLine.jsx');
var ParametricGraph = require('./ParametricGraph.jsx');
var React = require("react");

type P2 = {x: number; y: number};



var MainVis = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    projectedError: React.PropTypes.func.isRequired,
    optimiserFunction: React.PropTypes.func //?(w: P2, pointClasses: PointClasses) => Array<P2>
  },

  getInitialState: function(): {highlightedW: ?P2} {
    return {
      highlightedW: null,
      // mode: Modes.TRY_HYPERPLANE,
      pointClasses: require("../data/points.js"),
    };
  },

  highlightW: function(point: P2): void {
    this.setState({
      highlightedW: point
    });
  },

  updatePointClasses: function(newPointClasses: [Array<P2>, Array<P2>]): void {
    this.setState({
      pointClasses: newPointClasses,
    });
  },

  // updateMode: function(nextMode: number): () => void {
  //   return () =>
  //     this.setState({
  //       mode: nextMode,
  //     });
  // },

  replacePointClasses: function(newPointClasses: [Array<P2>, Array<P2>]): () => void {
    var callback = function() {
      this.setState({
        pointClasses: newPointClasses,
      });
    };
    return callback.bind(this);
  },

  render: function(): ?ReactElement {
    var optimiserLine;
    if (typeof this.props.optimiserFunction !== "undefined" &&
        this.props.optimiserFunction !== null &&
        typeof this.state.highlightedW !== "undefined" &&
        this.state.highlightedW !== null) {
      optimiserLine = this.props.optimiserFunction(this.state.highlightedW, this.state.pointClasses);
    }

    // <div>
    //   <button disabled={this.state.mode === Modes.TRY_HYPERPLANE}
    //     onClick={this.updateMode(Modes.TRY_HYPERPLANE)}>Try hyperplane</button>
    //   <button disabled={this.state.mode === Modes.ADD_DATA}
    //     onClick={this.updateMode(Modes.ADD_DATA)}>Add Data</button>
    //   <button disabled={this.state.mode === Modes.REMOVE_DATA}
    //     onClick={this.updateMode(Modes.REMOVE_DATA)}>Remove Data</button>
    // </div>

    return (
      <div style={{display: "flex", justifyContent: "space-between" }}>
        <div style={{position: "relative"}}>
          <HyperplaneVis
            dim={this.props.dim}
            mode={Modes.TRY_HYPERPLANE}
            pointClasses={this.state.pointClasses}
            updatePointClasses={this.updatePointClasses}
            highlightedW={this.state.highlightedW}
            highlightW={this.highlightW}
            optimiserLine={optimiserLine} />

          <div style={{position: "absolute", bottom: 0, left: 0}}>
            <button
                onMouseOver={this.replacePointClasses(require('../data/points.js'))}>
              Default
            </button>
            <button
                onMouseOver={this.replacePointClasses(require('../data/closePoints.js'))}>
              Close
            </button>
            <button
                onMouseOver={this.replacePointClasses(require('../data/overlapPoints.js'))}>
              Overlap
            </button>
          </div>
        </div>

        <Draggable3DScene dim={this.props.dim} pointClasses={this.state.pointClasses}
            projectedError={this.props.projectedError} highlightW={this.highlightW}>

          <ParametricGraph />
          <OptimiserLine vertices={optimiserLine} />
          {this.state.highlightedW && <CursorSphere highlightedW={this.state.highlightedW} />}

        </Draggable3DScene>

      </div>
    );
  }
});


module.exports = MainVis;
