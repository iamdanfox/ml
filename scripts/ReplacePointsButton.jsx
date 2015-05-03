/* @flow */
"use strict";

var React = require("react");


var ReplacePointsButton = React.createClass({
  handleClick: function() {
    this.props.callback(this.props.points);
  },

  render: function(): ?ReactElement {
    return <button onClick={this.handleClick}>{this.props.children}</button>;
  }
});

var ReplacePointsBar = React.createClass({
  render: function() {
    return <div style={this.props.style}>
      <ReplacePointsButton callback={this.props.callback} points={require("../data/points.js")}>
        Default
      </ReplacePointsButton>
      <ReplacePointsButton callback={this.props.callback} points={require("../data/closePoints.js")}>
        Close
      </ReplacePointsButton>
      <ReplacePointsButton callback={this.props.callback} points={require("../data/overlapPoints.js")}>
        Overlap
      </ReplacePointsButton>
    </div>;
  }
});

module.exports = {ReplacePointsButton, ReplacePointsBar};
