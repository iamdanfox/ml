/* @flow */
"use strict";
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>; generatedBy: any; mouseDownDiff: ?P2};
type State = {
  pointGroups: Array<PointGrp>
}
var React = require("react/addons");
var {add, subtract} = require("./VectorUtils.jsx");



var PointGroup = React.createClass({
  propTypes: {
    label: React.PropTypes.number.isRequired, // 0 or 1
    points: React.PropTypes.array.isRequired,
    generatedBy: React.PropTypes.object.isRequired,
    isMouseDown: React.PropTypes.bool.isRequired,
  },

  render: function(): ?ReactElement {
    var {x, y} = this.props.generatedBy.center;
    var {x: rx, y: ry} = this.props.generatedBy.skew;
    var fill = ["red", "blue"][this.props.label];
    var opacity = (this.props.isMouseDown) ? 0.6 : 0.3;
    return (
      <g>

        { this.props.points.map((p) =>
            <circle key={p.x + ":" + p.y} cx={p.x} cy={p.y} r={0.03} fill={fill} />) }

        <ellipse cx={x} cy={y} rx={rx} ry={ry} style={{fill, opacity}}
          onMouseDown={this.props.onMouseDown}
          onMouseUp={this.props.onMouseUp} />
      </g>
    );
  },
});



var AwesomeDataComponent = React.createClass({

  getInitialState: function(): State {
    return {
      pointGroups: [
        {
          label: 0,
          points: [{x: 0, y: 0}, {x: 0.14, y: 0.6}, {x: 0.4, y: 0.20}],
          generatedBy: {
            center: {x: 0.10, y: 0.10},
            skew: {x: 0.05, y: 0.4},
          },
          mouseDownDiff: null,
        },
        {
          points: [{x: 0.50, y: 0.50}],
          label: 1,
          generatedBy: {
            center: {x: 0.50, y: 0.50},
            skew: {x: 0.2, y: 0.2},
          },
          mouseDownDiff: null,
        }
      ]
    };
  },


  mouseMove: function(e: React.SyntheticEvent) {
    if (this.state.pointGroups.some((pg) => pg.mouseDownDiff)) {
      var pointGroups = this.state.pointGroups.map((pg) => {
        var diff = pg.mouseDownDiff;
        if (typeof diff !== "undefined" && diff !== null) {
          pg.generatedBy.center = add(this.getMouseXY(e))(diff);
        }
        return pg;
      });
      this.setState({pointGroups});
    }
  },

  getMouseXY: function(e: React.SyntheticEvent): {x: number; y: number} {
    var {left, top} = this.refs.canvas.getDOMNode().getBoundingClientRect();
    var x = e.pageX - left;
    var y = this.props.dim - (e.pageY - top);
    return {x: (2 * x) / this.props.dim - 1, y: (2 * y) / this.props.dim - 1};
  },

  render: function(): ?ReactElement {

    var children = this.state.pointGroups.map((pg) => {
      var onMouseDown = (e) => {
        pg.mouseDownDiff = subtract(pg.generatedBy.center)(this.getMouseXY(e));
        var pointGroups = this.state.pointGroups.map((v) => v); // changed identity of list.
        this.setState({pointGroups});
      };

      var onMouseUp = () => {
        pg.mouseDownDiff = null;
        this.setState({pointGroups: this.state.pointGroups.map((v) => v)});
      };

      var isMouseDown = typeof pg.mouseDownDiff !== "undefined" && pg.mouseDownDiff !== null;

      return <PointGroup {...pg}
        onMouseDown={onMouseDown} isMouseDown={isMouseDown} onMouseUp={onMouseUp} />;
    });

    return <svg
      ref="canvas"
      width={this.props.dim} height={this.props.dim}
      style={{border: "1px solid red"}} onMouseMove={this.mouseMove}>

        <g transform={`translate(${this.props.dim / 2} ${this.props.dim / 2})
          scale(${this.props.dim / 2} ${-this.props.dim / 2})`}>

        { children }

        </g>
      </svg>;
  }
});

module.exports = AwesomeDataComponent;
