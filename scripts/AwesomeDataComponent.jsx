/* @flow */
"use strict";

var React = require("react/addons");

var AwesomeDataComponent = React.createClass({
  componentDidMount: function() {
    var elem = React.findDOMNode(this.refs.canvas);
    var context = elem.getContext("2d");

    var x = 30;
    var y = 100;
    var r = 50;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
  },

  render: function(): ?ReactElement {
    return <canvas
      ref="canvas"
      width={this.props.width} height={this.props.height}
      style={{border: "1px solid red"}} />;
  }
});

module.exports = AwesomeDataComponent;
