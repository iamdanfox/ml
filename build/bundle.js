webpackJsonp([0],{

/***/ 0:
/*!***************************!*\
  !*** ./scripts/Entry.jsx ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var AwesomeDataComponent = __webpack_require__(/*! ./AwesomeDataComponent.jsx */ 225);
	
	window.React = React;
	
	React.render(React.createElement(AwesomeDataComponent, {width: 400, height: 400}), document.body);


/***/ },

/***/ 225:
/*!******************************************!*\
  !*** ./scripts/AwesomeDataComponent.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	
	var AwesomeDataComponent = React.createClass({displayName: "AwesomeDataComponent",
	  componentDidMount: function() {
	    var elem = React.findDOMNode(this.refs.canvas);
	    var context = elem.getContext("2d");
	
	    var x = 30;
	    var y = 100;
	    var r = 50;
	    context.beginPath();
	    context.arc(x, y, r, 0, 2 * Math.PI, false);
	    context.fillStyle = 'green';
	    context.fill();
	    context.lineWidth = 5;
	    context.strokeStyle = '#003300';
	    context.stroke();
	  },
	
	  render: function()                {
	    return React.createElement("canvas", {
	      ref: "canvas", 
	      width: this.props.width, height: this.props.height, 
	      style: {border: "1px solid red"}});
	  }
	});
	
	module.exports = AwesomeDataComponent;


/***/ }

});
//# sourceMappingURL=bundle.js.map