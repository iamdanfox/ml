/* @flow */
"use strict";

var React = require("react/addons");
var Article = require("./Article.jsx");

window.React = React;

React.render(<Article />, document.body);

var wb = require("./WorkerBridge.jsx");
console.log('WorkerBridge', wb);
