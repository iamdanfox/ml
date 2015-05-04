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
	
	
	
	var PointGroup = React.createClass({displayName: "PointGroup",
	  propTypes: {
	    context: React.PropTypes.object.isRequired,
	    points: React.PropTypes.array.isRequired,
	  },
	
	  render: function()                {var $__1, $__2, $__3;
	    var $__0=  this.props,context=$__0.context;
	
	    var point;for($__1=this.props.points,$__2=Array.isArray($__1),$__3=0,$__1=$__2?$__1:$__1[/*global Symbol*/typeof Symbol=="function"?Symbol.iterator:"@@iterator"]();;) {if($__2){if($__3>=$__1.length) break;point=$__1[$__3++];}else{$__3=$__1.next();if($__3.done) break;point=$__3.value;}
	      context.beginPath();
	      context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
	      context.fillStyle = 'green';
	      context.fill();
	      context.lineWidth = 1;
	      context.strokeStyle = '#003300';
	      context.stroke();
	    }
	    return null
	  },
	});
	
	
	
	var AwesomeDataComponent = React.createClass({displayName: "AwesomeDataComponent",
	
	  getInitialState: function() {
	    return {
	      pointGroups: [
	        {
	          label: 0,
	          points: [{x: 10, y: 10}, {x: 14, y: 6}, {x: 4, y: 20}],
	          generatedBy: {
	            center: {x: 10, y: 10},
	          },
	        },
	        {
	          points: [{x: 50, y: 50}],
	          label: 1,
	          generatedBy: {
	            center: {x: 50, y: 50},
	          },
	        }
	      ],
	      context: null
	    };
	  },
	
	  componentDidMount: function() {
	    var elem = React.findDOMNode(this.refs.canvas);
	    this.setState({context: elem.getContext("2d")});
	  },
	
	  render: function()                {
	    return React.createElement("canvas", {
	      ref: "canvas", 
	      width: this.props.width, height: this.props.height, 
	      style: {border: "1px solid red"}}, 
	
	         this.isMounted() && this.state.pointGroups.map(function(pg) 
	          {return React.createElement(PointGroup, {context: this.state.context, 
	            label: pg.label, points: pg.points, generatedBy: pg.generatedBy});}.bind(this))
	
	      );
	  }
	});
	
	module.exports = AwesomeDataComponent;


/***/ }

});
//# sourceMappingURL=bundle.js.map