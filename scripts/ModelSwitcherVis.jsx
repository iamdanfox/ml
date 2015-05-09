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
  angle: number;
  innerWidth: number;
}


var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");
var CursorSphere = require("./CursorSphere.jsx");
var Draggable3DScene = require("./Draggable3DScene.jsx");
var Perceptron = require("./Perceptron.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var WebWorkerGraph = require("./WebWorkerGraph.jsx");
var ParametricGraph = require("./ParametricGraph.jsx");
var MiniModelChooser = require("./MiniModelChooser.jsx");
var OptimiserLine = require("./OptimiserLine.jsx");
var React = require("react/addons");



var ModelSwitcherVis = React.createClass({

  propTypes: {
    highlightedW: React.PropTypes.object.isRequired,
    highlightW: React.PropTypes.func.isRequired,
    updateAngle: React.PropTypes.func.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    focussedModel: React.PropTypes.object.isRequired,
  },

  shouldComponentUpdate: function(nextProps: any): bool {
    return (this.props.highlightedW !== nextProps.highlightedW ||
      this.props.pointGroups !== nextProps.pointGroups ||
      this.props.width !== nextProps.width ||
      this.props.focussedModel !== nextProps.focussedModel);
  },

  render: function(): ?ReactElement {
    var dim = this.props.width;

    var graph;
    if (this.props.focussedModel === Perceptron) {
      graph = (
        <ParametricGraph thetaResolution={96} rResolution={50}
          colourFunction={ParametricGraph.COLOUR_FUNCTION}
          objective={Perceptron.objective} pointGroups={this.props.pointGroups} />
      );
    } else if (this.props.focussedModel === LogisticRegression) {
      var lrOptimiserLine = LogisticRegression.optimise(this.props.highlightedW, this.props.pointGroups);
      graph = (
        <WebWorkerGraph thetaResolution={252} rResolution={84}
          objective={LogisticRegression.objective} pointGroups={this.props.pointGroups} />
      );
    } else if (this.props.focussedModel === MaximumMargin) {
      graph = (
        <ParametricGraph thetaResolution={96} rResolution={50}
          colourFunction={ParametricGraph.COLOUR_FUNCTION}
          objective={MaximumMargin.objective} pointGroups={this.props.pointGroups} />
      );
    }

    var optimiserLine;
    if (typeof this.props.focussedModel.optimise !== "undefined" &&
        this.props.focussedModel.optimise !== null) {
      optimiserLine = this.props.focussedModel.optimise(this.props.highlightedW, this.props.pointGroups);
    }

    return (
      <div style={{width: '100%'}}>

        <Draggable3DScene dim={dim} pointGroups={this.props.pointGroups} updateAngle={this.props.updateAngle}
            objective={LogisticRegression.objective} highlightW={this.props.highlightW}>

          { optimiserLine && <OptimiserLine vertices={optimiserLine}
            dim={dim} objective={this.props.focussedModel.objective} pointGroups={this.props.pointGroups} /> }

          <CursorSphere highlightedW={this.props.highlightedW} dim={dim}
            objective={this.props.focussedModel.objective} pointGroups={this.props.pointGroups} />

          { graph }

        </Draggable3DScene>

      </div>
    );
  }
});

module.exports = ModelSwitcherVis;
