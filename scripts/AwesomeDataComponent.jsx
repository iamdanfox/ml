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


var POINTS_PER_AREA = 15;


var PointGroup = React.createClass({
  propTypes: {
    label: React.PropTypes.number.isRequired, // 0 or 1
    points: React.PropTypes.array.isRequired,
    generatedBy: React.PropTypes.object.isRequired,
    isMouseDown: React.PropTypes.bool.isRequired,
    updatePoints: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {mouseOver: false};
  },

  onMouseEnter: function() {
    this.setState({mouseOver: true});
  },

  onMouseLeave: function(e: React.SyntheticEvent) {
    this.setState({mouseOver: false});
  },

  refresh: function() {
    var {x, y} = this.props.generatedBy.axes;
    var area = Math.PI * x * y;
    var numberOfPoints = Math.floor(area * POINTS_PER_AREA);
    // TODO randomise this slightly.

    var newPoints = [];
    var {x: cx, y: cy} = this.props.generatedBy.center;
    for (var i = 0; i < numberOfPoints; i = i + 1) {
      var r1 = 2 * Math.random() - 1;
      var r2 = 2 * Math.random() - 1;
      newPoints.push({x: cx + r1 * x, y: cy + r2 * y});
    }

    this.props.updatePoints(newPoints);
  },

  render: function(): ?ReactElement {
    var {x, y} = this.props.generatedBy.center;
    var {x: rx, y: ry} = this.props.generatedBy.axes;
    var fill = ["red", "blue"][this.props.label];
    var opacity = (this.state.mouseOver || this.props.isMouseDown) ? 0.6 : 0.1;
    return (
      <g style={{cursor: "move"}}
        onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}
        onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>

        <ellipse cx={x} cy={y} rx={rx} ry={ry} style={{fill, opacity}} />

        { this.props.points.map((p) =>
            <circle key={p.x + ":" + p.y} cx={p.x} cy={p.y} r={0.03} fill={fill} />) }

        {this.state.mouseOver &&
          <circle cx={x} cy={y} r={0.06} fill="white" ref="control"
            onClick={this.refresh} style={{cursor: "pointer"}} /> }
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
            axes: {x: 0.5, y: 0.7},
          },
          mouseDownDiff: null,
        },
        {
          points: [{x: 0.50, y: 0.50}],
          label: 1,
          generatedBy: {
            center: {x: 0.50, y: 0.50},
            axes: {x: 0.2, y: 0.2},
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
          var newCenter = subtract(this.getMouseXY(e))(diff);
          var move = subtract(newCenter)(pg.generatedBy.center);
          pg.generatedBy.center = newCenter;
          pg.points = pg.points.map(add(move));
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
        pg.mouseDownDiff = subtract(this.getMouseXY(e))(pg.generatedBy.center);
        this.setState({pointGroups: this.state.pointGroups.map((v) => v)});
      };

      var onMouseUp = () => {
        pg.mouseDownDiff = null;
        this.setState({pointGroups: this.state.pointGroups.map((v) => v)});
      };

      var isMouseDown = typeof pg.mouseDownDiff !== "undefined" && pg.mouseDownDiff !== null;

      var updatePoints = (newPoints) => {
        pg.points = newPoints;
        this.setState({pointGroups: this.state.pointGroups.map((v) => v)});
      }

      return <PointGroup {...pg} updatePoints={updatePoints}
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
