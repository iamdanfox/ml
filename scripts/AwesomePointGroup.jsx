/* @flow */
"use strict";

type P2 = {x: number; y: number};
type Params = {l: number; theta: number};
type State = {
  mouseOver: boolean;
  paramsAtHandleMouseDown: ?Params;
};

var React = require("react/addons");
var {add, subtract, scale, rotate, modulus, dotProduct} = require("./VectorUtils.jsx");
var {generatePoints, ELLIPSE_FIXED_RADIUS, labelToColour} = require("./AwesomePointUtilities.jsx");
var {PureRenderMixin} = require("react/addons").addons;


var AwesomePointGroup = React.createClass({
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
    setEditingInProgress: React.PropTypes.func.isRequired,
  },

  mixins: [PureRenderMixin],

  getInitialState: function(): State {
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

    // update all points
    var stretchDirection = rotate(theta, {x: 0, y: 1});
    var newPoints = this.props.points.map((p) => {
      var fromCenter = subtract(p)(center);
      var rotatedFromCenter = rotate(theta - oldTheta, fromCenter);
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
    e.stopPropagation();
    e.preventDefault();
    var {l, theta} = this.props.generatedBy.params;
    this.setState({paramsAtHandleMouseDown: {l, theta}});
    this.props.setEditingInProgress(true);
  },

  onHandleMouseUp: function() {
    this.props.setEditingInProgress(false);
    this.setState({paramsAtHandleMouseDown: null});
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
            onMouseUp={this.onHandleMouseUp}
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

module.exports = AwesomePointGroup;
