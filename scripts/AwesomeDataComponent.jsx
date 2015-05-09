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
type Props = {
  dim: number;
  pointGroups: Array<PointGrp>;
  updatePointGroups: (pgs: Array<PointGrp>) => void;
}
var React = require("react/addons");
var AwesomePointGroup = require("./AwesomePointGroup.jsx");
var {add, subtract} = require("./VectorUtils.jsx");
var {generatePoints} = require("./AwesomePointUtilities.jsx");
var {PureRenderMixin} = require("react/addons").addons;



var AwesomeDataComponent = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    dim: React.PropTypes.number.isRequired,
    updatePointGroups: React.PropTypes.func.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
  },

  mouseMove: function(e: React.SyntheticEvent) {
    if (this.props.pointGroups.some((pg) => pg.mouseDownDiff)) {
      var pointGroups = this.props.pointGroups.map((pg) => {
        var diff = pg.mouseDownDiff;
        if (typeof diff !== "undefined" && diff !== null) {
          var newCenter = subtract(this.getMouseXY(e))(diff);
          var move = subtract(newCenter)(pg.generatedBy.center);
          pg.generatedBy.center = newCenter;
          pg.points = pg.points.map(add(move));
        }
        return pg;
      });
      this.props.updatePointGroups(pointGroups);
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
      this.props.updatePointGroups(this.props.pointGroups.concat([newGroup]));
    };
  },

  buildAwesomePointGroup: function(pg: PointGrp): AwesomePointGroup {
    var onMouseDown = (e) => {
      pg.mouseDownDiff = subtract(this.getMouseXY(e))(pg.generatedBy.center);
      this.props.updatePointGroups(this.props.pointGroups.map((v) => v));
    };

    var onMouseUp = () => {
      pg.mouseDownDiff = null;
      this.props.updatePointGroups(this.props.pointGroups.map((v) => v));
    };

    var isMouseDown = typeof pg.mouseDownDiff !== "undefined" && pg.mouseDownDiff !== null;

    var updatePoints = (newPoints) => {
      pg.points = newPoints;
      this.props.updatePointGroups(this.props.pointGroups.map((v) => v));
    };

    var updateParams = (params) => {
      var center = pg.generatedBy.center;
      pg.generatedBy = {center, params};
      this.props.updatePointGroups(this.props.pointGroups.map((v) => v));
    };

    var destroy = () => {
      this.props.updatePointGroups(this.props.pointGroups.filter((v) => v !== pg));
    };

    return <AwesomePointGroup {...pg} dim={this.props.dim}
      updatePoints={updatePoints} updateParams={updateParams} destroy={destroy}
      onMouseDown={onMouseDown} isMouseDown={isMouseDown} onMouseUp={onMouseUp}
      getMouseXY={this.getMouseXY} />;
  },

  render: function(): ?ReactElement {
    return <svg
      ref="canvas"
      width={this.props.dim} height={this.props.dim}
      style={this.props.style} onMouseMove={this.mouseMove}>

        <g transform={`translate(${this.props.dim / 2} ${this.props.dim / 2})
          scale(${this.props.dim / 2} ${-this.props.dim / 2})`}>

          <g transform={`scale(${2 / this.props.dim})`}>
            <line x1="0.5" y1="7.5" x2="0.5" y2="-6.5" style={{stroke: "#555", strokeWidth: 1}} />
            <line x1="-6.5" y1="0.5" x2="7.5" y2="0.5" style={{stroke: "#555", strokeWidth: 1}} />
          </g>

          { this.props.pointGroups.map(this.buildAwesomePointGroup) }

          <rect x={-0.97} y={-0.97} height={0.12} width={0.12}
            fill="red" onClick={this.newPointGroup(0)} style={{cursor: "pointer"}} />
          <rect x={-0.82} y={-0.97} height={0.12} width={0.12}
            fill="blue" onClick={this.newPointGroup(1)} style={{cursor: "pointer"}} />

        </g>
      </svg>;
  }
});

module.exports = AwesomeDataComponent;
