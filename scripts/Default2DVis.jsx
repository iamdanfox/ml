/* @flow */
"use strict";

var Line = require("./Line.jsx");
var React = require("react");
var ReplacePointsBar = require("./ReplacePointsBar.jsx");
var {PureRenderMixin} = require('react/addons').addons;
var {SimpleHyperplaneVis, Hyperplane} = require("./SimpleHyperplaneVis.jsx");


var Default2DVis = React.createClass({
  mixins: [PureRenderMixin],

  propTypes:{
    dim: React.PropTypes.number.isRequired,
    highlightedW: React.PropTypes.object,
    highlightW: React.PropTypes.func.isRequired,
    optimiserLine: React.PropTypes.array,
    pointClasses: React.PropTypes.array.isRequired,
    updatePointClasses: React.PropTypes.func.isRequired,
  },

  render: function(): ?ReactElement {
    return <div style={{position: "relative"}}>
      <SimpleHyperplaneVis dim={this.props.dim} pointClasses={this.props.pointClasses}
        highlightW={this.props.highlightW}>

        { this.props.optimiserLine && this.props.optimiserLine.length > 0 &&
          <Line w={this.props.optimiserLine[this.props.optimiserLine.length - 1]}
            style={{stroke: "green", opacity: 0.3}} dim={this.props.dim} /> }
        { this.props.highlightedW &&
          <Hyperplane w={this.props.highlightedW} dim={this.props.dim} /> }

      </SimpleHyperplaneVis>

      <ReplacePointsBar callback={this.props.updatePointClasses}
        style={{position: "absolute", bottom: 0, left: 0}} />
    </div>;
  }
});

module.exports = Default2DVis;
