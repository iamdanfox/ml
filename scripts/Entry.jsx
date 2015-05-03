/* @flow */
"use strict";

var React = require("react/addons");
var Article = require("./Article.jsx");

React.render(<Article />, document.body);



alert(1)

// in your main js file
var worker = new Worker('./build/worker.bundle.js');

worker.postMessage({
  some_data: 'foo',
  some_more_data: 'bar'
});

// in main js file
worker.onmessage = function(event) {
  console.log(event.data)
}
