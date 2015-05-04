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
var {add, subtract, scale, rotate, modulus, dotProduct} = require("./VectorUtils.jsx");
var {generatePoints, ELLIPSE_FIXED_RADIUS, labelToColour, POINTS_PER_AREA} = require("./AwesomePointUtilities.jsx");


var PointGroup = React.createClass({
  propTypes: {
    label: React.PropTypes.number.isRequired, // 0 or 1
    points: React.PropTypes.array.isRequired,
    generatedBy: React.PropTypes.object.isRequired,
    isMouseDown: React.PropTypes.bool.isRequired,
    updatePoints: React.PropTypes.func.isRequired,
    destroy: React.PropTypes.func.isRequired,
    getMouseXY: React.PropTypes.func.isRequired,
    updateParams: React.PropTypes.func.isRequired,
    dim: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      mouseOver: false,
      paramsAtHandleMouseDown: null,
    };
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

  onMouseMove: function(e: React.SyntheticEvent) {
    if (typeof this.state.paramsAtHandleMouseDown !== "undefined" &&
        this.state.paramsAtHandleMouseDown !== null) {
      e.stopPropagation();
      e.preventDefault();

      var mousePos = this.props.getMouseXY(e);
      this.paramHandleDraggedTo(mousePos);
    }
  },

  paramHandleDraggedTo: function(mousePos: P2) {
    var {center, params: {l: oldL, theta: oldTheta}} = this.props.generatedBy;
    var fromCenter = subtract(mousePos)(center);

    var theta = this.getAngleFromVertical(fromCenter);
    var l = 2 * modulus(fromCenter);

    // need to make match {l, theta} instead.
    var thetaDiff = theta - oldTheta;

    // update all points
    var stretchDirection = rotate(theta, {x: 0, y: 1});

    var newPoints = this.props.points.map((p) => {
      var fromCenter = subtract(p)(center);
      var rotatedFromCenter = rotate(thetaDiff, fromCenter);
      var stretchAmount = dotProduct(stretchDirection, rotatedFromCenter);
      var subtractProportion = 1 - (l / oldL);
      var subtractVector = scale(stretchAmount * subtractProportion)(stretchDirection);
      var doneFromCenter = subtract(rotatedFromCenter)(subtractVector);
      return add(center)(doneFromCenter);
    });

    this.props.updatePoints(newPoints);
    this.props.updateParams({l, theta});
  },

  getAngleFromVertical: function(vector: P2): number {
    var theta = Math.atan(vector.y / vector.x) - (Math.PI / 2);
    if (Math.sign(vector.x) !== Math.sign(vector.y)) {
      theta = theta + Math.PI;
    }
    if (vector.y < 0) {
      theta = theta + Math.PI;
    }
    return theta;
  },

  onHandleMouseDown: function(e: React.SyntheticEvent) {
    var {l, theta} = this.props.generatedBy.params;
    this.setState({paramsAtHandleMouseDown: {l, theta}});
    e.stopPropagation();
    e.preventDefault();
  },

  render: function(): ?ReactElement {
    var {center, params: {l, theta}} = this.props.generatedBy;
    var fill = labelToColour(this.props.label);
    var opacity = (this.state.mouseOver || this.props.isMouseDown) ? 0.6 : 0.05;

    var paramHandle = rotate(theta, {x: 0, y: 0.5 * l});
    var refreshHandle = subtract(paramHandle)(scale(0.13 / (0.5 * l))(paramHandle));
    var deleteHandle = add(paramHandle)(scale(0.11 / (0.5 * l))(paramHandle));

    return (
      <g style={{cursor: "move"}}
        onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}
        onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        transform={`translate(${center.x} ${center.y})`}>

        { this.props.points.map((p) =>
            <circle key={p.x + ":" + p.y}
              cx={p.x - center.x} cy={p.y - center.y} r={0.03}
              style={{fill, opacity: this.state.mouseOver ? 0.2 : 0.8}} />) }

        <ellipse cx={0} cy={0} rx={ELLIPSE_FIXED_RADIUS} ry={l} style={{fill, opacity}}
          transform={`rotate(${theta * 180 / Math.PI})`} />

        <g transform={`scale(${2 / this.props.dim})`}>
          <line x1="0.5" y1="5.5" x2="0.5" y2="-4.5" style={{stroke: "white", strokeWidth: 1}} />
          <line x1="-4.5" y1="0.5" x2="5.5" y2="0.5" style={{stroke: "white", strokeWidth: 1}} />
        </g>

        {this.state.mouseOver &&
          <circle cx={paramHandle.x} cy={paramHandle.y} r={0.07} fill="white"
            onMouseDown={this.onHandleMouseDown}
            onMouseUp={() => this.setState({paramsAtHandleMouseDown: null})}
            style={{cursor: "ew-resize"}} /> }

        {this.state.mouseOver &&
          <circle cx={refreshHandle.x} cy={refreshHandle.y} r={0.05} fill="white"
            onClick={this.refresh} style={{cursor: "pointer", opacity: 0.9}} /> }

        {this.state.mouseOver &&
          <circle cx={deleteHandle.x} cy={deleteHandle.y} r={0.03} fill="black"
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

      var updateParams = (params) => {
        var center = pg.generatedBy.center;
        pg.generatedBy = {center, params};
        this.setState({pointGroups: this.state.pointGroups.map((v) => v)});
      };

      var destroy = () => {
        this.setState({pointGroups: this.state.pointGroups.filter((v) => v !== pg)});
      };

      return <PointGroup {...pg} dim={this.props.dim}
        updatePoints={updatePoints} updateParams={updateParams} destroy={destroy}
        onMouseDown={onMouseDown} isMouseDown={isMouseDown} onMouseUp={onMouseUp}
        getMouseXY={this.getMouseXY} />;
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
