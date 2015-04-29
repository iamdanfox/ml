/* @flow */
/* global window, document */
"use strict";

var Article = require("./Article.jsx");
var React = require("react");

window.React = React; // ensures the debugger works
React.render(<Article />, document.body);
