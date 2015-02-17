/* @flow */
"use strict";

var React = require("react");

type P2 = {x: number;y: number}

var height = 34;


var DataSlider = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
    fullData: React.PropTypes.array.isRequired,
    color: React.PropTypes.string.isRequired,
    cutoff: React.PropTypes.number.isRequired,
    updateCutoff: React.PropTypes.func.isRequired,
    project: React.PropTypes.func.isRequired,
  },

  mouseMove: function(e: React.SyntheticEvent): void {
    var newCutoff = (e.clientX - this.refs.svg.getDOMNode().getBoundingClientRect().left) / this.props.dim;
    this.props.updateCutoff(newCutoff);
  },

  renderSinglePoint: function(i: number): ReactElement {
    return (
      <path
        d={`M ${i * this.props.dim} 0 L ${i * this.props.dim} ${height}`}
        style={{opacity: (i < this.props.cutoff) ? 1 : 0.1, strokeWidth: 1, stroke: this.props.color}} />
    );
  },

  render: function(): ?ReactElement {
    var dim = this.props.dim;
    var svgStyle = {width: dim, height: height, background: "#e0e0e0", display: "block", margin: "10 0"};
    var rectStyle = {width: this.props.cutoff * dim, height: height, fill: "#ccc"};

    return (
      <svg style={svgStyle} ref="svg" onMouseMove={this.mouseMove}>
        <rect x="0" y="0" style={rectStyle} />
        { this.props.fullData
            .map(this.props.project)
            .map(this.renderSinglePoint) }
      </svg>
    );
  }
});

module.exports = DataSlider;
