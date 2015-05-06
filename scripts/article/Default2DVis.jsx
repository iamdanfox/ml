/* @flow */
"use strict";

var Hyperplane = require("./Hyperplane.jsx");
var Line = require("./Line.jsx");
var React = require("react/addons");
var ReplacePointsBar = require("./ReplacePointsBar.jsx");
var SimpleHyperplaneVis = require("./SimpleHyperplaneVis.jsx");
var {PureRenderMixin} = require("react/addons").addons;


var Default2DVis = React.createClass({
  mixins: [PureRenderMixin],

  propTypes:{
    dim: React.PropTypes.number.isRequired,
    highlightedW: React.PropTypes.object,
    highlightW: React.PropTypes.func.isRequired,
    optimiserLine: React.PropTypes.array,
    pointGroups: React.PropTypes.array.isRequired,
  },

  render: function(): ?ReactElement {
    return <div style={{position: "relative"}}>
      <SimpleHyperplaneVis dim={this.props.dim} pointGroups={this.props.pointGroups}
        highlightW={this.props.highlightW}>

        { this.props.optimiserLine && this.props.optimiserLine.length > 0 &&
          <Line w={this.props.optimiserLine[this.props.optimiserLine.length - 1]}
            style={{stroke: "green", opacity: 0.3}} dim={this.props.dim} /> }
        { this.props.highlightedW &&
          <Hyperplane w={this.props.highlightedW} dim={this.props.dim} /> }

      </SimpleHyperplaneVis>
    </div>;
  }
});

module.exports = Default2DVis;
