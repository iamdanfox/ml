/* @flow */
"use strict";

var K = require("./Katex.jsx");
var React = require("react");

var DisplayWNumbers = React.createClass({
  render: function() {
    var {x, y} = this.props.w;
    var xVal = Math.floor(10 * x) / 10;
    var yVal = Math.floor(10 * y) / 10;

    return <K tex={" \\large w = [" + xVal + ", " + yVal + "]"} />;
  }
});

module.exports = DisplayWNumbers;
