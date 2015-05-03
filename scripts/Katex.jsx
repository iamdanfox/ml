/* @flow */
"use strict";

var React = require("react/addons");
var katex = require("katex");


var Katex = React.createClass({
  render: function(): ?ReactElement {
    var tex = this.props.tex || this.props.children;
    var math = katex.renderToString(tex);
    return (
      <span dangerouslySetInnerHTML={{__html: math}}></span>
    );
  }
});

module.exports = Katex;
