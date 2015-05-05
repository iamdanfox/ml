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

var React = require("react/addons");
var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");

var CursorSphere = require("./CursorSphere.jsx");
var Draggable3DScene = require("./Draggable3DScene.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var ParametricGraph = require("./ParametricGraph.jsx");
var React = require("react/addons");
var Perceptron = require("./Perceptron.jsx");
var OptimiserLine = require("./OptimiserLine.jsx");



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

  computePointClasses: function(): PointClasses {
    return [0, 1].map((l) => this.state.pointGroups
          .reduce((acc, pg) => pg.label === l ? acc.concat(pg.points) : acc, []));
  },

  highlightW: function(highlightedW: P2) {
    this.setState({highlightedW});
  },

  render: function(): ?ReactElement {

    // <Draggable3DScene dim={500} pointClasses={this.computePointClasses()}
    //     projectedError={MaximumMargin.objective} highlightW={this.highlightW}>

    //   <ParametricGraph thetaResolution={120} rResolution={40} />
    //   <CursorSphere highlightedW={this.state.highlightedW} />

    // </Draggable3DScene>
    var pointClasses = this.computePointClasses();
    var optimiserLine = Perceptron.optimise(this.state.highlightedW, pointClasses);

    return (
      <div>
        <AwesomeDataComponent dim={500}
          updatePointGroups={this.updatePointGroups} pointGroups={this.state.pointGroups} />


        <Draggable3DScene dim={500} pointClasses={pointClasses}
            projectedError={Perceptron.objective} highlightW={this.highlightW}>

          <ParametricGraph thetaResolution={120} rResolution={20} />
          <OptimiserLine vertices={optimiserLine} />
          <CursorSphere highlightedW={this.state.highlightedW} />
        </Draggable3DScene>


      </div>
    );
  }
});

module.exports = Immersive;
