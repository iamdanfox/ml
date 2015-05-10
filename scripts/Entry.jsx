/* @flow */
"use strict";

var React = require("react/addons");
var Immersive = require("./Immersive.jsx");

window.React = React;

React.initializeTouchEvents(true);
React.render(<Immersive />, document.body);
