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
	
	React.render(React.createElement(AwesomeDataComponent, {dim: 600}), document.body);


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
	    label: React.PropTypes.number.isRequired, // 0 or 1
	    points: React.PropTypes.array.isRequired,
	    generatedBy: React.PropTypes.object.isRequired,
	  },
	
	  render: function()                {
	    var $__0=   this.props.generatedBy.center,x=$__0.x,y=$__0.y;
	    var $__1=     this.props.generatedBy.skew,rx=$__1.x,ry=$__1.y;
	    var fill = ["red", "blue"][this.props.label];
	    var opacity = (this.props.mouseDown) ? 0.6 : 0.3;
	    return (
	      React.createElement("g", null, 
	
	         this.props.points.map(function(p) 
	            {return React.createElement("circle", {key: p.x + ":" + p.y, cx: p.x, cy: p.y, r: 0.03, fill: fill});}), 
	
	        React.createElement("ellipse", {cx: x, cy: y, rx: rx, ry: ry, style: {fill:fill, opacity:opacity}, 
	          onMouseDown: this.props.onMouseDown, 
	          onMouseUp: this.props.onMouseUp})
	      )
	    );
	  },
	});
	
	
	
	var AwesomeDataComponent = React.createClass({displayName: "AwesomeDataComponent",
	
	  getInitialState: function() {
	    return {
	      pointGroups: [
	        {
	          label: 0,
	          points: [{x: 0, y: 0}, {x: 0.14, y: 0.6}, {x: 0.4, y: 0.20}],
	          generatedBy: {
	            center: {x: 0.10, y: 0.10},
	            skew: {x: 0.05, y: 0.4},
	          },
	          mouseDown: false,
	        },
	        {
	          points: [{x: 0.50, y: 0.50}],
	          label: 1,
	          generatedBy: {
	            center: {x: 0.50, y: 0.50},
	            skew: {x: 0.2, y: 0.2},
	          },
	          mouseDown: false,
	        }
	      ],
	      context: null
	    };
	  },
	
	  makeMouseDownHandler: function(mouseDownPointGroup) {
	    return (function (e                      ) {
	      mouseDownPointGroup.mouseDown = true;
	      var pointGroups = this.state.pointGroups.map(function(pg)  {return pg;}); // changed identity of list.
	      this.setState({pointGroups:pointGroups});
	    }).bind(this);
	  },
	
	  makeMouseUpHandler: function(mouseDownPointGroup) {
	    return (function (e                      ) {
	      mouseDownPointGroup.mouseDown = false;
	      console.log(mouseDownPointGroup.generatedBy.center, this.getMouseXY(e))
	      mouseDownPointGroup.generatedBy.center = this.getMouseXY(e);
	
	      var pointGroups = this.state.pointGroups.map(function(pg)  {return pg;}); // changed identity of list.
	      this.setState({pointGroups:pointGroups});
	    }).bind(this);
	  },
	
	  getMouseXY: function(e                      )                         {
	    var $__0=   this.refs.canvas.getDOMNode().getBoundingClientRect(),left=$__0.left,top=$__0.top;
	    var x = e.pageX - left;
	    var y = this.props.dim - (e.pageY - top);
	    return {x: (2 * x) / this.props.dim - 1, y: (2 * y) / this.props.dim - 1};
	  },
	
	  render: function()                {
	    return React.createElement("svg", {
	      ref: "canvas", 
	      width: this.props.dim, height: this.props.dim, 
	      style: {border: "1px solid red"}}, 
	        React.createElement("g", {transform: ("translate(" + (this.props.dim / 2) + " " + (this.props.dim / 2) + ")\n          scale(" + 
	(this.props.dim / 2) + " " + (-this.props.dim / 2) + ")")}, 
	
	         this.state.pointGroups.map(function(pg) 
	          {return React.createElement(PointGroup, {onMouseDown: this.makeMouseDownHandler(pg), mouseDown: pg.mouseDown, 
	            onMouseUp: this.makeMouseUpHandler(pg), 
	            label: pg.label, points: pg.points, generatedBy: pg.generatedBy});}.bind(this))
	
	        )
	      );
	  }
	});
	
	module.exports = AwesomeDataComponent;


/***/ }

});
//# sourceMappingURL=bundle.js.map