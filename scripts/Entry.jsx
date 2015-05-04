/* @flow */
"use strict";

var React = require("react/addons");
var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");

window.React = React;

React.render(<AwesomeDataComponent width={400} height={400} />, document.body);
