/* @flow */
"use strict";

var Line = require("./Line.jsx");
var React = require("react/addons");
var {scale} = require("../VectorUtils.jsx");
var {PureRenderMixin} = React.addons;


var Hyperplane = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    w: React.PropTypes.object.isRequired,
    dim: React.PropTypes.number.isRequired
  },

  render: function(): ?ReactElement {
    var {x, y} = scale(this.props.dim)(this.props.w);
    return <g>
      <path d={`M 0 0 L ${x} ${y}`} strokeWidth="1.5" stroke={"rgba(100, 100, 100, 0.4)"} />
      <Line w={{x, y}} dim={this.props.dim} />
    </g>;
  }
});

module.exports = Hyperplane;
