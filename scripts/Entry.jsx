/* @flow */

var MainPage = require('./MainPage.cjsx');
var React = require('react');

window.React = React; // ensures the debugger works
React.render(<MainPage />, document.body);
