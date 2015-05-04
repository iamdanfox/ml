/* @flow */
"use strict";

var React = require("react/addons");
var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");

window.React = React;

React.render(<AwesomeDataComponent dim={600} />, document.body);
