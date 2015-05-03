/* @flow */
"use strict";

var AllPoints = require("./AllPoints.jsx");
var Axes = require("./Axes.jsx");
var Line = require("./Line.jsx");
var React = require("react");
var {ReplacePointsBar} = require("./ReplacePointsButton.jsx");
var {PureRenderMixin} = require('react/addons').addons;


var SimpleHyperplaneVis = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    dim: React.PropTypes.number.isRequired,
    pointClasses: React.PropTypes.array.isRequired,
    highlightW: React.PropTypes.func.isRequired,
  },

  mouseMove: function(e: React.SyntheticEvent): void {
    this.props.highlightW(this.getMouseXY(e));
  },

  getMouseXY: function(e: React.SyntheticEvent): {x: number; y: number} {
    var {left, top} = this.refs.svg.getDOMNode().getBoundingClientRect();
    var x = e.clientX - left;
    var y = this.props.dim - (e.clientY - top);
    return {x: x - this.props.dim / 2, y: y - this.props.dim / 2};
  },

  render: function(): ?ReactElement {
    var style = {background: "#e0e0e0", width: this.props.dim, height: this.props.dim};

    var mergeInProps = {dim: this.props.dim};
    var children = React.Children.map(this.props.children, function(childElement) {
      if (React.isValidElement(childElement)) {
        return React.cloneElement(childElement, mergeInProps);
      } else {
        return null;
      }
    });

    return (
      <svg style={style} ref="svg" onMouseMove={this.mouseMove}>
        <g transform={"translate(" + this.props.dim / 2 + " " + this.props.dim / 2 + ") scale(1 -1)"}>

          <Axes dim={this.props.dim} />
          <AllPoints pointClasses={this.props.pointClasses} />

          { children }
        </g>
      </svg>
    );
  }
});


var Hyperplane = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    w: React.PropTypes.object.isRequired,
    dim: React.PropTypes.number.isRequired
  },

  render: function() {
    var {x, y} = this.props.w;
    return <g>
      <path d={`M 0 0 L ${x} ${y}`} strokeWidth="1.5" stroke={"rgba(255, 0, 0, 0.4)"} />
      <Line w={{x, y}} dim={this.props.dim} />
    </g>;
  }
});

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

  render: function() {
    return <div style={{position: "relative"}}>
      <SimpleHyperplaneVis dim={this.props.dim} pointClasses={this.props.pointClasses}
        highlightW={this.props.highlightW}>

        { this.props.optimiserLine && this.props.optimiserLine.length > 0 &&
          <Line w={this.props.optimiserLine[this.props.optimiserLine.length - 1]}
            style={{stroke: "green", opacity: 0.3}}/> }
        { this.props.highlightedW &&
          <Hyperplane w={this.props.highlightedW} /> }

      </SimpleHyperplaneVis>

      <ReplacePointsBar callback={this.props.updatePointClasses}
        style={{position: "absolute", bottom: 0, left: 0}} />
    </div>;
  }
});

module.exports = {SimpleHyperplaneVis, Hyperplane, Default2DVis};
