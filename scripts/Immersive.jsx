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

  shouldComponentUpdate: function(nextProps) {
    return (this.props.highlightedW !== nextProps.highlightedW ||
      this.props.pointGroups !== nextProps.pointGroups ||
      this.props.width !== nextProps.width);
  },

  render: function(): ?ReactElement {
    var dim = this.props.width;

    var graph;

    if (this.props.focussedModel === Perceptron) {
      var optimiserLine = Perceptron.optimise(this.props.highlightedW, this.props.pointGroups);
      graph = (
        <ParametricGraph thetaResolution={252} rResolution={50}
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
        <ParametricGraph thetaResolution={252} rResolution={50}
          colourFunction={ParametricGraph.COLOUR_FUNCTION}
          objective={MaximumMargin.objective} pointGroups={this.props.pointGroups} />
      );
    } else {
      graph = null;
    }

    var optimiserLine = false;

    return (
      <div style={{width: '100%'}}>

        <Draggable3DScene dim={dim} pointGroups={this.props.pointGroups} updateAngle={this.props.updateAngle}
            objective={LogisticRegression.objective} highlightW={this.props.highlightW}>

          { optimiserLine && <OptimiserLine vertices={optimiserLine}
            dim={dim} objective={LogisticRegression.objective} pointGroups={this.props.pointGroups} /> }

          <CursorSphere highlightedW={this.props.highlightedW} dim={dim}
            objective={this.props.focussedModel.objective} pointGroups={this.props.pointGroups} />

          { graph }

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
      innerWidth: window.innerWidth,
      angle: 0,
      focussedModel: Perceptron,
    };
  },

  updatePointGroups: function(pointGroups: Array<PointGrp>): void {
    this.setState({pointGroups});
  },

  highlightW: function(highlightedW: P2) {
    this.setState({highlightedW});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.updateWindowSize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateWindowSize);
  },

  updateWindowSize: function() {
    this.setState({innerWidth: window.innerWidth});
  },

  updateAngle: function(angle: number) {
    this.setState({angle});
  },

  focusModel: function(focussedModel: any) {
    console.log('focusModel', focussedModel);
    this.setState({focussedModel});
  },

  render: function(): ?ReactElement {
    return (
      <div style={{position: 'relative'}}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: "rgba(255, 255, 255, 0.6)"}}>
          <AwesomeDataComponent dim={450}
            updatePointGroups={this.updatePointGroups} pointGroups={this.state.pointGroups} />
        </div>

        <ModelSwitcherVis width={this.state.innerWidth} focussedModel={this.state.focussedModel}
          highlightW={this.highlightW} highlightedW={this.state.highlightedW}
          pointGroups={this.state.pointGroups} updateAngle={this.updateAngle} />

        <div style={{position: 'absolute', top: 0, right: 0}}>
          <MiniModelChooser highlightedW={this.state.highlightedW} focusModel={this.focusModel}
            pointGroups={this.state.pointGroups} angle={this.state.angle} />
        </div>
      </div>
    );
  }
});


module.exports = Immersive;
