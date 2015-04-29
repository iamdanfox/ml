/* @flow */
"use strict";

var React = require("react");


var HR = React.createClass({
  render: function(): ?ReactElement {
    return <hr style={{width: "100px",
      borderWidth: "1px 0 0 0",
      opacity: 0.5,
      margin: "2em auto 2em auto"}} />;
  }
});


module.exports = HR;
