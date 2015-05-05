/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];
type PointGrp = {
  label: number;
  points: Array<P2>;
  generatedBy: {
    center: P2;
    params: {l: number; theta: number};
  };
  mouseDownDiff: ?P2;
};
type State = {
  pointGroups: Array<PointGrp>;
  highlightedW: P2;
}


var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");
var CursorSphere = require("./CursorSphere.jsx");
var Draggable3DScene = require("./Draggable3DScene.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var OptimiserLine = require("./OptimiserLine.jsx");
var Perceptron = require("./Perceptron.jsx");
var ParametricGraph = require("./ParametricGraph.jsx");
var React = require("react/addons");
var React = require("react/addons");



var LogisticRegressionVis = React.createClass({
  getInitialState: function() {
    return {
      pointClasses: this.computePointClasses(this.props.pointGroups)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.pointGroups !== this.props.pointGroups) {
      this.setState({
        pointClasses: this.computePointClasses(nextProps.pointGroups)
      });
    }
  },

  computePointClasses: function(pointGroups): PointClasses {
    return [0, 1].map((l) => pointGroups
          .reduce((acc, pg) => pg.label === l ? acc.concat(pg.points) : acc, []));
  },

  render: function(): ?ReactElement {
    var colourFunction = (boundingBox, vertex1, vertex2, vertex3, mutableFaceColor) => {
      var zMin = boundingBox.min.z;
      var zRange = boundingBox.max.z - zMin;
      var totalZ = vertex1.z + vertex2.z + vertex3.z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      var stops = LogisticRegression.fastOptimise(vertex1, this.state.pointClasses) / 250;
      mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
    };

    var lrOptimiserLine = LogisticRegression.optimise(this.props.highlightedW, this.state.pointClasses);
    var perceptronOptimiserLine = Perceptron.optimise(this.props.highlightedW, this.state.pointClasses);

    return (
      <div style={{display: "inline"}}>
        <Draggable3DScene dim={500} pointClasses={this.state.pointClasses}
            objective={LogisticRegression.objective} highlightW={this.props.highlightW}>

          <OptimiserLine vertices={lrOptimiserLine} />
          <CursorSphere highlightedW={this.props.highlightedW} />
          <ParametricGraph thetaResolution={24} rResolution={8} colourFunction={colourFunction} />

        </Draggable3DScene>


        <Draggable3DScene dim={500} pointClasses={this.state.pointClasses}
            objective={MaximumMargin.objective} highlightW={this.props.highlightW}>

          <ParametricGraph thetaResolution={120} rResolution={40} />
          <CursorSphere highlightedW={this.props.highlightedW} />

        </Draggable3DScene>


        <Draggable3DScene dim={500} pointClasses={this.state.pointClasses}
            objective={Perceptron.objective} highlightW={this.props.highlightW}>
          <ParametricGraph thetaResolution={120} rResolution={12} />
          <OptimiserLine vertices={perceptronOptimiserLine} />
          <CursorSphere highlightedW={this.props.highlightedW} />
        </Draggable3DScene>

      </div>
    );
    // <WebWorkerGraph thetaResolution={24} rResolution={8} />
  }
});




var Immersive = React.createClass({
  getInitialState: function(): State {
    return {
      pointGroups: require("../data/awesomePointGroups.js"),
      highlightedW: {x: 0.2, y: 0.2},
    };
  },

  updatePointGroups: function(pointGroups: Array<PointGrp>): void {
    this.setState({pointGroups});
  },

  highlightW: function(highlightedW: P2) {
    this.setState({highlightedW});
  },

  render: function(): ?ReactElement {


    return (
      <div>
        <AwesomeDataComponent dim={500}
          updatePointGroups={this.updatePointGroups} pointGroups={this.state.pointGroups} />

        <LogisticRegressionVis highlightW={this.highlightW}
          highlightedW={this.state.highlightedW} pointGroups={this.state.pointGroups} />


      </div>
    );
  }
});


module.exports = Immersive;
