/* @flow */
"use strict";

type P2 = {x: number; y: number};
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
var WebWorkerGraph = require("./WebWorkerGraph.jsx");
// var ProgressiveParametricGraph = require("./ProgressiveParametricGraph.jsx");
var OptimiserLine = require("./OptimiserLine.jsx");
var React = require("react/addons");



var LogisticRegressionVis = React.createClass({

  render: function(): ?ReactElement {
    var lrOptimiserLine = LogisticRegression.optimise(this.props.highlightedW, this.props.pointGroups);

    return (
      <div>
        <Draggable3DScene dim={800} pointGroups={this.props.pointGroups}
            objective={LogisticRegression.objective} highlightW={this.props.highlightW}>

          <OptimiserLine vertices={lrOptimiserLine} />
          <CursorSphere highlightedW={this.props.highlightedW} />

          <WebWorkerGraph thetaResolution={252} rResolution={84} />

        </Draggable3DScene>
      </div>
    );
  }

          // <ProgressiveParametricGraph thetaResolution={252} rResolution={84}
          //  colourFunction={ProgressiveParametricGraph.COLOUR_FUNCTION} />
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
      <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: "#111"}}>
        <div style={{
            top: 0,
            left: 0,
            background: "rgba(255, 255, 255, 0.6)"}}>
          <AwesomeDataComponent dim={450}
            updatePointGroups={this.updatePointGroups} pointGroups={this.state.pointGroups} />
        </div>

        <LogisticRegressionVis highlightW={this.highlightW}
          highlightedW={this.state.highlightedW} pointGroups={this.state.pointGroups} />


      </div>
    );
  }
});


module.exports = Immersive;
