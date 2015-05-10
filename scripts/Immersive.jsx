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
  editingInProgress: bool;
};
type State = {
  pointGroups: Array<PointGrp>;
  highlightedW: P2;
  angle: number;
  innerWidth: number;
  focussedModel: any;
  focussedModelParams: any;
}


var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var Perceptron = require("./Perceptron.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var MiniModelChooser = require("./MiniModelChooser.jsx");
var ModelSwitcherVis = require("./ModelSwitcherVis.jsx");
var React = require("react/addons");
require("./Immersive.css");


var Immersive = React.createClass({
  getInitialState: function(): State {
    return {
      pointGroups: require("../data/awesomePointGroups.js"),
      highlightedW: {x: 0.2, y: 0.2},
      innerWidth: window.innerWidth,
      angle: 0,
      focussedModel: LogisticRegression,
      focussedModelParams: LogisticRegression.DEFAULT_PARAMS,
      serializationTimer: null,
    };
  },

  serializeState: function() {
    var {pointGroups, angle, focussedModel, focussedModelParams} = this.state;
    var serializable = {pointGroups, angle, focussedModelParams, focussedModel: focussedModel.name};
    window.location.hash = "#" + btoa(JSON.stringify(serializable));
  },

  deserializeState: function(stateString: string) {
    var state = JSON.parse(stateString);
    state.focussedModel = [LogisticRegression, MaximumMargin, Perceptron]
      .filter((m) => m.name === state.focussedModel)[0];
    this.setState(state);
  },

  setStateCallback: function(name: string): (v: any) => void {
    return (value) => {
      var assignment = {};
      clearTimeout(this.state.serializationTimer);
      assignment[name] = value;
      assignment.serializationTimer = setTimeout(this.serializeState, 200);
      this.setState(assignment);
    };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.updateWindowSize);
    window.shareLink = this.serializeState.bind(this);
    try {
      var stateString = atob(window.location.hash.slice(1));
      this.deserializeState(stateString);
    } catch (e) {}
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateWindowSize);
  },

  updateWindowSize: function() {
    this.setState({innerWidth: window.innerWidth});
  },

  focusModel: function(focussedModel: any) {
    this.setState({
      focussedModel: focussedModel,
      focussedModelParams: focussedModel.DEFAULT_PARAMS,
    });
  },

  render: function(): ?ReactElement {
    var {innerWidth, focussedModel, focussedModelParams, highlightedW, pointGroups, angle} = this.state;
    return (
      <div style={{position: "relative"}}>
        <div className="awesome-data-container">
          <AwesomeDataComponent dim={450} highlightedW={highlightedW}
            highlightW={this.setStateCallback("highlightedW")}
            updatePointGroups={this.setStateCallback("pointGroups")} pointGroups={pointGroups} />
        </div>

        <ModelSwitcherVis width={innerWidth}
          focussedModel={focussedModel} focussedModelParams={focussedModelParams}
          highlightW={this.setStateCallback("highlightedW")} highlightedW={highlightedW}
          pointGroups={pointGroups} updateAngle={this.setStateCallback("angle")} />

        <div style={{position: "absolute", top: 0, right: 0}}>
          <MiniModelChooser highlightedW={highlightedW}
            focussedModel={focussedModel} focusModel={this.focusModel}
            focussedModelParams={focussedModelParams} updateModelParams={this.setStateCallback("focussedModelParams")}
            pointGroups={pointGroups} angle={angle} />
        </div>
      </div>
    );
  }
});


module.exports = Immersive;
