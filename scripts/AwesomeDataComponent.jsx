/* @flow */
"use strict";

type F<U, V> = (x: U) => V;
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
var {add, subtract, rotate} = require("./VectorUtils.jsx");



var ELLIPSE_FIXED_RADIUS = 0.4;

var POINTS_PER_AREA = 15;
var labelToColour = (c) => ["red", "blue"][c];

var generatePoints = function(generatedBy): Array<P2> {
  var {l, theta} = generatedBy.params;
  var area = Math.PI * l * ELLIPSE_FIXED_RADIUS;
  var numberOfPoints = Math.floor(area * POINTS_PER_AREA);
  // TODO randomise this slightly.

  var newPoints = [];
  for (var i = 0; i < numberOfPoints; i = i + 1) {
    var r1 = 2 * Math.random() - 1;
    var r2 = 2 * Math.random() - 1;
    var offset = {x: r1 * ELLIPSE_FIXED_RADIUS, y: r2 * l};
    var rotatedOffset = rotate(theta, offset);
    newPoints.push(add(generatedBy.center)(rotatedOffset));
  }
  return newPoints;
};


var PointGroup = React.createClass({
  propTypes: {
    label: React.PropTypes.number.isRequired, // 0 or 1
    points: React.PropTypes.array.isRequired,
    generatedBy: React.PropTypes.object.isRequired,
    isMouseDown: React.PropTypes.bool.isRequired,
    updatePoints: React.PropTypes.func.isRequired,
    destroy: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {mouseOver: false};
  },

  onMouseEnter: function() {
    this.setState({mouseOver: true});
  },

  onMouseLeave: function() {
    this.setState({mouseOver: false});
  },

  refresh: function() {
    var newPoints = generatePoints(this.props.generatedBy);
    this.props.updatePoints(newPoints);
  },

  render: function(): ?ReactElement {
    var {x, y} = this.props.generatedBy.center;
    var {l, theta} = this.props.generatedBy.params;
    var fill = labelToColour(this.props.label);
    var opacity = (this.state.mouseOver || this.props.isMouseDown) ? 0.6 : 0.1;
    return (
      <g style={{cursor: "move"}}
        onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}
        onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
        transform={`translate(${x} ${y})`}>

        <ellipse cx={0} cy={0} rx={ELLIPSE_FIXED_RADIUS} ry={l} style={{fill, opacity}}
          transform={`rotate(${theta * 180 / Math.PI})`} />

        { this.props.points.map((p) =>
            <circle key={p.x + ":" + p.y} cx={p.x - x} cy={p.y - y} r={0.03} fill={fill} />) }

        {this.state.mouseOver &&
          <circle cx={0} cy={l / 2} r={0.06} fill="white"
            style={{cursor: "pointer"}} /> }

        {this.state.mouseOver &&
          <circle cx={0} cy={0} r={0.06} fill="grey"
            onClick={this.refresh} style={{cursor: "pointer"}} /> }

        {this.state.mouseOver &&
          <circle cx={0.12} cy={0} r={0.06} fill="black"
            onClick={this.props.destroy} style={{cursor: "pointer"}} /> }
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
            params: {l: 0.6, theta: 0},
          },
          mouseDownDiff: null,
        },
        {
          points: [{x: 0.50, y: 0.50}],
          label: 1,
          generatedBy: {
            center: {x: 0.50, y: 0.50},
            params: {l: 0.2, theta: Math.PI / 4},
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

  newPointGroup: function(label: number): () => void {
    return () => {
      var generatedBy = {
        center: {x: Math.random() - 1, y: Math.random() - 1},
        params: {l: 0.5, theta: 0},
      };
      var points = generatePoints(generatedBy);
      var newGroup = {label, points, generatedBy, mouseDownDiff: null};
      this.setState({
        pointGroups: this.state.pointGroups.concat([newGroup])
      });
    };
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
      };

      var destroy = () => {
        this.setState({pointGroups: this.state.pointGroups.filter((v) => v !== pg)});
      };

      return <PointGroup {...pg} updatePoints={updatePoints} destroy={destroy}
        onMouseDown={onMouseDown} isMouseDown={isMouseDown} onMouseUp={onMouseUp} />;
    });

    return <svg
      ref="canvas"
      width={this.props.dim} height={this.props.dim}
      style={{border: "1px solid red"}} onMouseMove={this.mouseMove}>

        <g transform={`translate(${this.props.dim / 2} ${this.props.dim / 2})
          scale(${this.props.dim / 2} ${-this.props.dim / 2})`}>

        { children }

        <rect x={-0.97} y={-0.97} height={0.12} width={0.12}
          fill="red" onClick={this.newPointGroup(0)} />
        <rect x={-0.82} y={-0.97} height={0.12} width={0.12}
          fill="blue" onClick={this.newPointGroup(1)} />

        </g>
      </svg>;
  }
});

module.exports = AwesomeDataComponent;
