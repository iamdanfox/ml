/* @flow */
"use strict";

var CursorSphere = require('./CursorSphere.jsx');
var Draggable3DScene = require("./Draggable3DScene.jsx");
var HyperplaneVis = require("./HyperplaneVis.jsx");
var K = require("./Katex.jsx");
var Modes = require("./Modes.js");
var OptimiserLine = require('./OptimiserLine.jsx');
var ParametricGraph = require('./ParametricGraph.jsx');
var React = require("react");
var {ReplacePointsBar} = require("./ReplacePointsButton.jsx");

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
      pointClasses: require("../data/closePoints.js"),
    };
  },

  highlightW: function(point: P2): void {
    this.setState({highlightedW: point});
  },

  updatePointClasses: function(newPointClasses: [Array<P2>, Array<P2>]): void {
    this.setState({pointClasses: newPointClasses});
  },

  render: function(): ?ReactElement {
    var optimiserLine;
    var colourFunction;
    var optimiserFunction = this.props.optimiserFunction;
    if (typeof optimiserFunction !== "undefined" &&
        optimiserFunction !== null) {

      var numStops = function(startW, pointClasses) {
        var stops = optimiserFunction(startW, pointClasses);
        return stops.length;
      };
      if (this.props.fastOptimise) {
        numStops = this.props.fastOptimise;
      }


      colourFunction = (function(boundingBox, vertex1, vertex2, vertex3, mutableFaceColor): void {
        var zMin = boundingBox.min.z;
        var zRange = boundingBox.max.z - zMin;
        var totalZ = vertex1.z + vertex2.z + vertex3.z;
        var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);

        var stops = numStops(vertex1, this.state.pointClasses) / 250; // should match MAX_STOPS

        mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
      }).bind(this);


      if (typeof this.state.highlightedW !== "undefined" &&
         this.state.highlightedW !== null) {
        optimiserLine = optimiserFunction(this.state.highlightedW, this.state.pointClasses);
      }
    }

    var formatW = (w) => {
      var {x, y} = w;
      var xVal = Math.floor(10 * x) / 10;
      var yVal = Math.floor(10 * y) / 10;
      return xVal + ", " + yVal;
    };

    return (
      <div>
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

            <ReplacePointsBar callback={this.updatePointClasses}
              style={{position: "absolute", bottom: 0, left: 0}} />
          </div>

          <Draggable3DScene dim={this.props.dim} pointClasses={this.state.pointClasses}
              projectedError={this.props.projectedError} highlightW={this.highlightW}>

            <ParametricGraph thetaResolution={24} rResolution={8}
              colourFunction={colourFunction} fastOptimise={this.props.fastOptimise} />

            <OptimiserLine vertices={optimiserLine} />

            {this.state.highlightedW && <CursorSphere highlightedW={this.state.highlightedW} />}

          </Draggable3DScene>

        </div>

        <div>
        { this.state.highlightedW  && <div><K tex={"initial~~" +
          " \\large w_0 = [" + formatW(this.state.highlightedW) + "]"} /></div>}

          {optimiserLine && <div><K tex={"output~~ " +
            "\\large w = [" + formatW(optimiserLine[optimiserLine.length - 1]) + "]"} /></div> }
        </div>
      </div>
    );
  }
});


module.exports = MainVis;
