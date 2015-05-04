/* @flow */
"use strict";

var React = require("react/addons");




var PointGroup = React.createClass({
  propTypes: {
    label: React.PropTypes.number.isRequired, // 0 or 1
    points: React.PropTypes.array.isRequired,
    generatedBy: React.PropTypes.object.isRequired,
  },

  render: function(): ?ReactElement {
    var {x, y} = this.props.generatedBy.center;
    var {x: rx, y: ry} = this.props.generatedBy.skew;
    var color = ["red", "blue"][this.props.label];

    return (
      <g>

        { this.props.points.map((p) =>
            <circle key={p.x + ":" + p.y} cx={p.x} cy={p.y} r={0.03} fill={color} />) }

        <ellipse cx={x} cy={y} rx={rx} ry={ry} style={{fill: color, opacity: 0.3}}
          onMouseDown={this.props.onMouseDown} />
      </g>
    );
  },
});



var AwesomeDataComponent = React.createClass({

  getInitialState: function() {
    return {
      pointGroups: [
        {
          label: 0,
          points: [{x: 0, y: 0}, {x: 0.14, y: 0.6}, {x: 0.4, y: 0.20}],
          generatedBy: {
            center: {x: 0.10, y: 0.10},
            skew: {x: 0.05, y: 0.4},
          },
        },
        {
          points: [{x: 0.50, y: 0.50}],
          label: 1,
          generatedBy: {
            center: {x: 0.50, y: 0.50},
            skew: {x: 0.2, y: 0.2},
          },
        }
      ],
      context: null
    };
  },

  onMouseDown: function(e: React.SyntheticEvent) {
    console.log('md', this.getMouseXY(e));
  },

  getMouseXY: function(e: React.SyntheticEvent): {x: number; y: number} {
    var {left, top} = this.refs.canvas.getDOMNode().getBoundingClientRect();
    var x = e.pageX - left;
    var y = this.props.dim - (e.pageY - top);
    return {x: (2 * x) / this.props.dim - 1, y: (2 * y) / this.props.dim - 1};
  },

  render: function(): ?ReactElement {
    return <svg
      ref="canvas"
      width={this.props.dim} height={this.props.dim}
      style={{border: "1px solid red"}}>
        <g transform={`translate(${this.props.dim / 2} ${this.props.dim / 2})
          scale(${this.props.dim / 2} ${-this.props.dim / 2})`}>

        { this.state.pointGroups.map((pg) =>
          <PointGroup onMouseDown={this.onMouseDown}
            label={pg.label} points={pg.points} generatedBy={pg.generatedBy} />) }

        </g>
      </svg>;
  }
});

module.exports = AwesomeDataComponent;
