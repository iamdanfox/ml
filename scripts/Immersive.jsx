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
  mouseDownDiff: ?P2
};
type State = {
  pointGroups: Array<PointGrp>
}

var React = require("react/addons");
var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");


var Immersive = React.createClass({
  getInitialState: function(): State {
    return {pointGroups: require("../data/awesomePointGroups.js")};
  },

  updatePointGroups: function(pointGroups: Array<PointGrp>): void {
    this.setState({pointGroups});
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <AwesomeDataComponent dim={600}
          updatePointGroups={this.updatePointGroups} pointGroups={this.state.pointGroups} />
      </div>
    );
  }
});

module.exports = Immersive;
