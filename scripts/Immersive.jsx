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
var LogisticRegression = require("./LogisticRegression.jsx");
var MiniModelChooser = require("./MiniModelChooser.jsx");
var ModelSwitcherVis = require("./ModelSwitcherVis.jsx");
var React = require("react/addons");




var Immersive = React.createClass({
  getInitialState: function(): State {
    return {
      pointGroups: require("../data/awesomePointGroups.js"),
      highlightedW: {x: 0.2, y: 0.2},
      innerWidth: window.innerWidth,
      angle: 0,
      focussedModel: LogisticRegression,
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
