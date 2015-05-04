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

/***/ 170:
/*!*********************************!*\
  !*** ./scripts/VectorUtils.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                           
	                                 
	                                             
	                                          
	
	"use strict";
	
	function sizeSquared(arg    )         {
	  var x = arg.x;
	  var y = arg.y;
	  return x * x + y * y;
	}
	
	function dotProduct(a    , b    )         {
	  var $__0=     a,x1=$__0.x,y1=$__0.y;
	  var $__1=     b,x2=$__1.x,y2=$__1.y;
	  return x1 * x2 + y1 * y2;
	}
	
	function modulus(arg    )         {
	  return Math.sqrt(sizeSquared(arg));
	}
	
	function scale(sf        )            {
	  return function(arg    )     {
	    var $__0=     arg,x=$__0.x,y=$__0.y;
	    return {
	      x: x * sf,
	      y: y * sf
	    };
	  };
	}
	
	module.exports = {
	  lineEq: function(p1    , p2    )          {
	    return (typeof p1 !== "undefined" && p1 !== null &&
	      typeof p2 !== "undefined" && p2 !== null) &&
	      (p1.x === p2.x) && (p1.y === p2.y);
	  },
	
	  // counter clockwise rotation of a vector, by 90 degrees
	  rot90: function(arg    )     {
	    var $__0=     arg,x=$__0.x,y=$__0.y;
	    return {
	      x: -y,
	      y: x
	    };
	  },
	
	  dotProduct: dotProduct,
	
	  scale: scale,
	
	  sizeSquared: sizeSquared,
	
	  modulus: modulus,
	
	  add: function(a    )            {
	    return function(b    )     {
	      return {
	        x: a.x + b.x,
	        y: a.y + b.y
	      };
	    };
	  },
	
	  subtract: function(a    )            {
	    return function(b    )     {
	      return {
	        x: a.x - b.x,
	        y: a.y - b.y
	      };
	    };
	  },
	
	  pointClassesTransform: function(pointClasses              )             {
	    var $__0=   pointClasses,class0=$__0[0],class1=$__0[1];
	    var transformedClass0 = class0.map(function(p) {
	      return {x: p.x, y: p.y, t: -1};
	    });
	    var transformedClass1 = class1.map(function(p) {
	      return {x: p.x, y: p.y, t: 1};
	    });
	    return transformedClass0.concat(transformedClass1);
	  },
	
	  pointClassesTransformZeroOne: function(pointClasses              )             {
	    var $__0=   pointClasses,class0=$__0[0],class1=$__0[1];
	    var transformedClass0 = class0.map(function(p) {
	      return {x: p.x, y: p.y, t: 1};
	    });
	    var transformedClass1 = class1.map(function(p) {
	      return {x: p.x, y: p.y, t: 0};
	    });
	    return transformedClass0.concat(transformedClass1);
	  },
	
	  classify: function(w    , vectorToClassify    )         {
	    if (dotProduct(vectorToClassify, w) > 0) {
	      return 0;
	    } else {
	      return 1;
	    }
	  },
	
	  classTransform: function(classificationResult        )         {
	    if (classificationResult === 0) {
	      return -1;
	    } else {
	      console.assert(classificationResult === 1);
	      return 1;
	    }
	  },
	};


/***/ },

/***/ 225:
/*!******************************************!*\
  !*** ./scripts/AwesomeDataComponent.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	                           
	                                 
	                                                                                         
	              
	                              
	 
	var React = __webpack_require__(/*! react/addons */ 1);
	var $__0=   __webpack_require__(/*! ./VectorUtils.jsx */ 170),add=$__0.add,subtract=$__0.subtract;
	
	
	
	var PointGroup = React.createClass({displayName: "PointGroup",
	  propTypes: {
	    label: React.PropTypes.number.isRequired, // 0 or 1
	    points: React.PropTypes.array.isRequired,
	    generatedBy: React.PropTypes.object.isRequired,
	    isMouseDown: React.PropTypes.bool.isRequired,
	  },
	
	  render: function()                {
	    var $__0=   this.props.generatedBy.center,x=$__0.x,y=$__0.y;
	    var $__1=     this.props.generatedBy.skew,rx=$__1.x,ry=$__1.y;
	    var fill = ["red", "blue"][this.props.label];
	    var opacity = (this.props.isMouseDown) ? 0.6 : 0.3;
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
	
	  getInitialState: function()        {
	    return {
	      pointGroups: [
	        {
	          label: 0,
	          points: [{x: 0, y: 0}, {x: 0.14, y: 0.6}, {x: 0.4, y: 0.20}],
	          generatedBy: {
	            center: {x: 0.10, y: 0.10},
	            skew: {x: 0.05, y: 0.4},
	          },
	          mouseDownDiff: null,
	        },
	        {
	          points: [{x: 0.50, y: 0.50}],
	          label: 1,
	          generatedBy: {
	            center: {x: 0.50, y: 0.50},
	            skew: {x: 0.2, y: 0.2},
	          },
	          mouseDownDiff: null,
	        }
	      ]
	    };
	  },
	
	
	  mouseMove: function(e                      ) {
	    if (this.state.pointGroups.some(function(pg)  {return pg.mouseDownDiff;})) {
	      var pointGroups = this.state.pointGroups.map(function(pg)  {
	        var diff = pg.mouseDownDiff;
	        if (typeof diff !== "undefined" && diff !== null) {
	          var newCenter = subtract(this.getMouseXY(e))(diff);
	          var move = subtract(newCenter)(pg.generatedBy.center);
	          pg.generatedBy.center = newCenter;
	          pg.points = pg.points.map(add(move));
	        }
	        return pg;
	      }.bind(this));
	      this.setState({pointGroups:pointGroups});
	    }
	  },
	
	  getMouseXY: function(e                      )                         {
	    var $__0=   this.refs.canvas.getDOMNode().getBoundingClientRect(),left=$__0.left,top=$__0.top;
	    var x = e.pageX - left;
	    var y = this.props.dim - (e.pageY - top);
	    return {x: (2 * x) / this.props.dim - 1, y: (2 * y) / this.props.dim - 1};
	  },
	
	  render: function()                {
	
	    var children = this.state.pointGroups.map(function(pg)  {
	      var onMouseDown = function(e)  {
	        pg.mouseDownDiff = subtract(this.getMouseXY(e))(pg.generatedBy.center);
	        var pointGroups = this.state.pointGroups.map(function(v)  {return v;}); // changed identity of list.
	        this.setState({pointGroups:pointGroups});
	      }.bind(this);
	
	      var onMouseUp = function()  {
	        pg.mouseDownDiff = null;
	        this.setState({pointGroups: this.state.pointGroups.map(function(v)  {return v;})});
	      }.bind(this);
	
	      var isMouseDown = typeof pg.mouseDownDiff !== "undefined" && pg.mouseDownDiff !== null;
	
	      return React.createElement(PointGroup, React.__spread({},  pg, 
	        {onMouseDown: onMouseDown, isMouseDown: isMouseDown, onMouseUp: onMouseUp}));
	    }.bind(this));
	
	    return React.createElement("svg", {
	      ref: "canvas", 
	      width: this.props.dim, height: this.props.dim, 
	      style: {border: "1px solid red"}, onMouseMove: this.mouseMove}, 
	
	        React.createElement("g", {transform: ("translate(" + (this.props.dim / 2) + " " + (this.props.dim / 2) + ")\n          scale(" + 
	(this.props.dim / 2) + " " + (-this.props.dim / 2) + ")")}, 
	
	         children 
	
	        )
	      );
	  }
	});
	
	module.exports = AwesomeDataComponent;


/***/ }

});
//# sourceMappingURL=bundle.js.map