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
	
	  rotate: function(theta        , arg    )     {
	    return {
	      x: arg.x * Math.cos(theta) - arg.y * Math.sin(theta),
	      y: arg.x * Math.sin(theta) + arg.y * Math.cos(theta),
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
	var AwesomePointGroup = __webpack_require__(/*! ./AwesomePointGroup.jsx */ 227);
	var $__0=   __webpack_require__(/*! ./VectorUtils.jsx */ 170),add=$__0.add,subtract=$__0.subtract;
	var $__1=  __webpack_require__(/*! ./AwesomePointUtilities.jsx */ 226),generatePoints=$__1.generatePoints;
	
	
	
	var AwesomeDataComponent = React.createClass({displayName: "AwesomeDataComponent",
	  getInitialState: function()        {
	    return {
	      pointGroups: [
	        {
	          label: 0,
	          points: [{x: 0, y: 0}, {x: 0.14, y: 0.6}, {x: 0.4, y: 0.20}],
	          generatedBy: {
	            center: {x: 0.10, y: 0.10},
	            params: {l: 0.6, theta: 0},
	          },
	          mouseDownDiff: null,
	        },
	        {
	          points: [{x: 0.50, y: 0.50}],
	          label: 1,
	          generatedBy: {
	            center: {x: 0.50, y: 0.50},
	            params: {l: 0.2, theta: Math.PI / 4},
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
	
	  newPointGroup: function(label        )             {
	    return function()  {
	      var generatedBy = {
	        center: {x: Math.random() - 1, y: Math.random() - 1},
	        params: {l: 0.5, theta: 0},
	      };
	      var points = generatePoints(generatedBy);
	      var newGroup = {label:label, points:points, generatedBy:generatedBy, mouseDownDiff: null};
	      this.setState({
	        pointGroups: this.state.pointGroups.concat([newGroup])
	      });
	    }.bind(this);
	  },
	
	  buildAwesomePointGroup: function(pg          )                    {
	    var onMouseDown = function(e)  {
	      pg.mouseDownDiff = subtract(this.getMouseXY(e))(pg.generatedBy.center);
	      this.setState({pointGroups: this.state.pointGroups.map(function(v)  {return v;})});
	    }.bind(this);
	
	    var onMouseUp = function()  {
	      pg.mouseDownDiff = null;
	      this.setState({pointGroups: this.state.pointGroups.map(function(v)  {return v;})});
	    }.bind(this);
	
	    var isMouseDown = typeof pg.mouseDownDiff !== "undefined" && pg.mouseDownDiff !== null;
	
	    var updatePoints = function(newPoints)  {
	      pg.points = newPoints;
	      this.setState({pointGroups: this.state.pointGroups.map(function(v)  {return v;})});
	    }.bind(this);
	
	    var updateParams = function(params)  {
	      var center = pg.generatedBy.center;
	      pg.generatedBy = {center:center, params:params};
	      this.setState({pointGroups: this.state.pointGroups.map(function(v)  {return v;})});
	    }.bind(this);
	
	    var destroy = function()  {
	      this.setState({pointGroups: this.state.pointGroups.filter(function(v)  {return v !== pg;})});
	    }.bind(this);
	
	    return React.createElement(AwesomePointGroup, React.__spread({},  pg, {dim: this.props.dim, 
	      updatePoints: updatePoints, updateParams: updateParams, destroy: destroy, 
	      onMouseDown: onMouseDown, isMouseDown: isMouseDown, onMouseUp: onMouseUp, 
	      getMouseXY: this.getMouseXY}));
	  },
	
	  render: function()                {
	    return React.createElement("svg", {
	      ref: "canvas", 
	      width: this.props.dim, height: this.props.dim, 
	      style: {border: "1px solid red"}, onMouseMove: this.mouseMove}, 
	
	        React.createElement("g", {transform: ("translate(" + (this.props.dim / 2) + " " + (this.props.dim / 2) + ")\n          scale(" + 
	(this.props.dim / 2) + " " + (-this.props.dim / 2) + ")")}, 
	
	         this.state.pointGroups.map(this.buildAwesomePointGroup), 
	
	        React.createElement("rect", {x: -0.97, y: -0.97, height: 0.12, width: 0.12, 
	          fill: "red", onClick: this.newPointGroup(0)}), 
	        React.createElement("rect", {x: -0.82, y: -0.97, height: 0.12, width: 0.12, 
	          fill: "blue", onClick: this.newPointGroup(1)})
	
	        )
	      );
	  }
	});
	
	module.exports = AwesomeDataComponent;


/***/ },

/***/ 226:
/*!*******************************************!*\
  !*** ./scripts/AwesomePointUtilities.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                           
	                                 
	                    
	             
	                                     
	  
	
	var $__0=   __webpack_require__(/*! ./VectorUtils.jsx */ 170),add=$__0.add,rotate=$__0.rotate;
	
	
	
	var ELLIPSE_FIXED_RADIUS = 0.35;
	
	var labelToColour                    = function(c)  {return ["red", "blue"][c];};
	
	var POINTS_PER_AREA = 20;
	
	var generatePoints = function(generatedBy             )            {
	  var $__0=   generatedBy.params,l=$__0.l,theta=$__0.theta;
	  var area = Math.PI * l * ELLIPSE_FIXED_RADIUS;
	  var numberOfPoints = Math.floor(area * POINTS_PER_AREA);
	
	  var project = function(rand)  {return 0.4 * (Math.pow(2 * rand - 1, 3) + 2 * rand - 1);};
	
	  var newPoints = [];
	  for (var i = 0; i < numberOfPoints; i = i + 1) {
	    var offset = {
	      x: project(Math.random()) * ELLIPSE_FIXED_RADIUS,
	      y: project(Math.random()) * l,
	    };
	    var rotatedOffset = rotate(theta, offset);
	    newPoints.push(add(generatedBy.center)(rotatedOffset));
	  }
	  return newPoints;
	};
	
	module.exports = {generatePoints:generatePoints, ELLIPSE_FIXED_RADIUS:ELLIPSE_FIXED_RADIUS, labelToColour:labelToColour};


/***/ },

/***/ 227:
/*!***************************************!*\
  !*** ./scripts/AwesomePointGroup.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                           
	                                 
	                 
	                
	                    
	                
	               
	                                       
	    
	                    
	  
	              
	                              
	 
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var $__0=       __webpack_require__(/*! ./VectorUtils.jsx */ 170),add=$__0.add,subtract=$__0.subtract,scale=$__0.scale,rotate=$__0.rotate,modulus=$__0.modulus,dotProduct=$__0.dotProduct;
	var $__1=    __webpack_require__(/*! ./AwesomePointUtilities.jsx */ 226),generatePoints=$__1.generatePoints,ELLIPSE_FIXED_RADIUS=$__1.ELLIPSE_FIXED_RADIUS,labelToColour=$__1.labelToColour;
	
	
	var AwesomePointGroup = React.createClass({displayName: "AwesomePointGroup",
	  propTypes: {
	    label: React.PropTypes.number.isRequired, // 0 or 1
	    points: React.PropTypes.array.isRequired,
	    generatedBy: React.PropTypes.object.isRequired,
	    isMouseDown: React.PropTypes.bool.isRequired,
	    updatePoints: React.PropTypes.func.isRequired,
	    destroy: React.PropTypes.func.isRequired,
	    getMouseXY: React.PropTypes.func.isRequired,
	    updateParams: React.PropTypes.func.isRequired,
	    dim: React.PropTypes.number.isRequired,
	  },
	
	  getInitialState: function() {
	    return {
	      mouseOver: false,
	      paramsAtHandleMouseDown: null,
	    };
	  },
	
	  onMouseEnter: function() {
	    this.setState({mouseOver: true});
	  },
	
	  onMouseLeave: function() {
	    this.setState({mouseOver: false});
	  },
	
	  refresh: function() {
	    var newPoints = generatePoints(this.props.generatedBy);
	    this.props.updatePoints(newPoints);
	  },
	
	  onMouseMove: function(e                      ) {
	    if (typeof this.state.paramsAtHandleMouseDown !== "undefined" &&
	        this.state.paramsAtHandleMouseDown !== null) {
	      e.stopPropagation();
	      e.preventDefault();
	
	      var mousePos = this.props.getMouseXY(e);
	      this.paramHandleDraggedTo(mousePos);
	    }
	  },
	
	  paramHandleDraggedTo: function(mousePos    ) {
	    var $__0=       this.props.generatedBy,center=$__0.center,$__1=$__0.params,oldL=$__1.l,oldTheta=$__1.theta;
	    var fromCenter = subtract(mousePos)(center);
	
	    var theta = this.getAngleFromVertical(fromCenter);
	    var l = 2 * modulus(fromCenter);
	
	    // need to make match {l, theta} instead.
	    var thetaDiff = theta - oldTheta;
	
	    // update all points
	    var stretchDirection = rotate(theta, {x: 0, y: 1});
	
	    var newPoints = this.props.points.map(function(p)  {
	      var fromCenter = subtract(p)(center);
	      var rotatedFromCenter = rotate(thetaDiff, fromCenter);
	      var stretchAmount = dotProduct(stretchDirection, rotatedFromCenter);
	      var subtractProportion = 1 - (l / oldL);
	      var subtractVector = scale(stretchAmount * subtractProportion)(stretchDirection);
	      var doneFromCenter = subtract(rotatedFromCenter)(subtractVector);
	      return add(center)(doneFromCenter);
	    });
	
	    this.props.updatePoints(newPoints);
	    this.props.updateParams({l:l, theta:theta});
	  },
	
	  getAngleFromVertical: function(vector    )         {
	    var theta = Math.atan(vector.y / vector.x) - (Math.PI / 2);
	    if (Math.sign(vector.x) !== Math.sign(vector.y)) {
	      theta = theta + Math.PI;
	    }
	    if (vector.y < 0) {
	      theta = theta + Math.PI;
	    }
	    return theta;
	  },
	
	  onHandleMouseDown: function(e                      ) {
	    var $__0=   this.props.generatedBy.params,l=$__0.l,theta=$__0.theta;
	    this.setState({paramsAtHandleMouseDown: {l:l, theta:theta}});
	    e.stopPropagation();
	    e.preventDefault();
	  },
	
	  render: function()                {
	    var $__0=     this.props.generatedBy,center=$__0.center,$__1=$__0.params,l=$__1.l,theta=$__1.theta;
	    var fill = labelToColour(this.props.label);
	    var opacity = (this.state.mouseOver || this.props.isMouseDown) ? 0.6 : 0.05;
	
	    var paramHandle = rotate(theta, {x: 0, y: 0.5 * l});
	    var refreshHandle = subtract(paramHandle)(scale(0.13 / (0.5 * l))(paramHandle));
	    var deleteHandle = add(paramHandle)(scale(0.11 / (0.5 * l))(paramHandle));
	
	    return (
	      React.createElement("g", {style: {cursor: "move"}, 
	        onMouseDown: this.props.onMouseDown, onMouseUp: this.props.onMouseUp, 
	        onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, 
	        onMouseMove: this.onMouseMove, 
	        transform: ("translate(" + center.x + " " + center.y + ")")}, 
	
	         this.props.points.map(function(p) 
	            {return React.createElement("circle", {key: p.x + ":" + p.y, 
	              cx: p.x - center.x, cy: p.y - center.y, r: 0.03, 
	              style: {fill:fill, opacity: this.state.mouseOver ? 0.2 : 0.8}});}.bind(this)), 
	
	        React.createElement("ellipse", {cx: 0, cy: 0, rx: ELLIPSE_FIXED_RADIUS, ry: l, style: {fill:fill, opacity:opacity}, 
	          transform: ("rotate(" + (theta * 180 / Math.PI) + ")")}), 
	
	        React.createElement("g", {transform: ("scale(" + (2 / this.props.dim) + ")")}, 
	          React.createElement("line", {x1: "0.5", y1: "5.5", x2: "0.5", y2: "-4.5", style: {stroke: "white", strokeWidth: 1}}), 
	          React.createElement("line", {x1: "-4.5", y1: "0.5", x2: "5.5", y2: "0.5", style: {stroke: "white", strokeWidth: 1}})
	        ), 
	
	        this.state.mouseOver &&
	          React.createElement("circle", {cx: paramHandle.x, cy: paramHandle.y, r: 0.07, fill: "white", 
	            onMouseDown: this.onHandleMouseDown, 
	            onMouseUp: function()  {return this.setState({paramsAtHandleMouseDown: null});}.bind(this), 
	            style: {cursor: "ew-resize"}}), 
	
	        this.state.mouseOver &&
	          React.createElement("circle", {cx: refreshHandle.x, cy: refreshHandle.y, r: 0.05, fill: "white", 
	            onClick: this.refresh, style: {cursor: "pointer", opacity: 0.9}}), 
	
	        this.state.mouseOver &&
	          React.createElement("circle", {cx: deleteHandle.x, cy: deleteHandle.y, r: 0.03, fill: "black", 
	            onClick: this.props.destroy, style: {cursor: "pointer"}})
	      )
	    );
	  },
	});
	
	module.exports = AwesomePointGroup;


/***/ }

});
//# sourceMappingURL=bundle.js.map