/* @flow */
/* global window, document */
"use strict";

var MainPage = require("./MainPage.jsx");
var React = require("react");

window.React = React; // ensures the debugger works
React.render(<MainPage />, document.body);
