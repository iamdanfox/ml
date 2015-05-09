webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	var React = __webpack_require__(1);
	var Immersive = __webpack_require__(4);

	window.React = React;

	React.render(React.createElement(Immersive, null), document.body);


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                 
	                
	                    
	                
	               
	                                       
	    
	                     
	  
	              
	                               
	                   
	                
	                     
	 


	var AwesomeDataComponent = __webpack_require__(5);
	var LogisticRegression = __webpack_require__(6);
	var MiniModelChooser = __webpack_require__(7);
	var ModelSwitcherVis = __webpack_require__(8);
	var React = __webpack_require__(1);




	var Immersive = React.createClass({displayName: "Immersive",
	  getInitialState: function()        {
	    return {
	      pointGroups: __webpack_require__(9),
	      highlightedW: {x: 0.2, y: 0.2},
	      innerWidth: window.innerWidth,
	      angle: 0,
	      focussedModel: LogisticRegression,
	    };
	  },

	  updatePointGroups: function(pointGroups                 )       {
	    this.setState({pointGroups:pointGroups});
	  },

	  highlightW: function(highlightedW    ) {
	    this.setState({highlightedW:highlightedW});
	  },

	  componentDidMount: function() {
	    window.addEventListener('resize', this.updateWindowSize);
	  },

	  componentWillUnmount: function() {
	    window.removeEventListener('resize', this.updateWindowSize);
	  },

	  updateWindowSize: function() {
	    this.setState({innerWidth: window.innerWidth});
	  },

	  updateAngle: function(angle        ) {
	    this.setState({angle:angle});
	  },

	  focusModel: function(focussedModel     ) {
	    this.setState({focussedModel:focussedModel});
	  },

	  render: function()                {
	    return (
	      React.createElement("div", {style: {position: 'relative'}}, 
	        React.createElement("div", {style: {
	            position: 'absolute',
	            top: 0,
	            left: 0,
	            background: "rgba(255, 255, 255, 0.6)"}}, 
	          React.createElement(AwesomeDataComponent, {dim: 450, 
	            updatePointGroups: this.updatePointGroups, pointGroups: this.state.pointGroups})
	        ), 

	        React.createElement(ModelSwitcherVis, {width: this.state.innerWidth, focussedModel: this.state.focussedModel, 
	          highlightW: this.highlightW, highlightedW: this.state.highlightedW, 
	          pointGroups: this.state.pointGroups, updateAngle: this.updateAngle}), 

	        React.createElement("div", {style: {position: 'absolute', top: 0, right: 0}}, 
	          React.createElement(MiniModelChooser, {highlightedW: this.state.highlightedW, focusModel: this.focusModel, 
	            pointGroups: this.state.pointGroups, angle: this.state.angle})
	        )
	      )
	    );
	  }
	});


	module.exports = Immersive;


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                 
	                
	                    
	                
	               
	                                       
	    
	                    
	  
	              
	              
	                               
	                                                    
	 
	var React = __webpack_require__(1);
	var AwesomePointGroup = __webpack_require__(23);
	var $__0=   __webpack_require__(24),add=$__0.add,subtract=$__0.subtract;
	var $__1=  __webpack_require__(25),generatePoints=$__1.generatePoints;
	var $__2=  __webpack_require__(1).addons,PureRenderMixin=$__2.PureRenderMixin;



	var AwesomeDataComponent = React.createClass({displayName: "AwesomeDataComponent",
	  mixins: [PureRenderMixin],

	  propTypes: {
	    dim: React.PropTypes.number.isRequired,
	    updatePointGroups: React.PropTypes.func.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	  },

	  mouseMove: function(e                      ) {
	    if (this.props.pointGroups.some(function(pg)  {return pg.mouseDownDiff;})) {
	      var pointGroups = this.props.pointGroups.map(function(pg)  {
	        var diff = pg.mouseDownDiff;
	        if (typeof diff !== "undefined" && diff !== null) {
	          var newCenter = subtract(this.getMouseXY(e))(diff);
	          var move = subtract(newCenter)(pg.generatedBy.center);
	          pg.generatedBy.center = newCenter;
	          pg.points = pg.points.map(add(move));
	        }
	        return pg;
	      }.bind(this));
	      this.props.updatePointGroups(pointGroups);
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
	      this.props.updatePointGroups(this.props.pointGroups.concat([newGroup]));
	    }.bind(this);
	  },

	  buildAwesomePointGroup: function(pg          )                    {
	    var onMouseDown = function(e)  {
	      pg.mouseDownDiff = subtract(this.getMouseXY(e))(pg.generatedBy.center);
	      this.props.updatePointGroups(this.props.pointGroups.map(function(v)  {return v;}));
	    }.bind(this);

	    var onMouseUp = function()  {
	      pg.mouseDownDiff = null;
	      this.props.updatePointGroups(this.props.pointGroups.map(function(v)  {return v;}));
	    }.bind(this);

	    var isMouseDown = typeof pg.mouseDownDiff !== "undefined" && pg.mouseDownDiff !== null;

	    var updatePoints = function(newPoints)  {
	      pg.points = newPoints;
	      this.props.updatePointGroups(this.props.pointGroups.map(function(v)  {return v;}));
	    }.bind(this);

	    var updateParams = function(params)  {
	      var center = pg.generatedBy.center;
	      pg.generatedBy = {center:center, params:params};
	      this.props.updatePointGroups(this.props.pointGroups.map(function(v)  {return v;}));
	    }.bind(this);

	    var destroy = function()  {
	      this.props.updatePointGroups(this.props.pointGroups.filter(function(v)  {return v !== pg;}));
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
	      style: this.props.style, onMouseMove: this.mouseMove}, 

	        React.createElement("g", {transform: ("translate(" + (this.props.dim / 2) + " " + (this.props.dim / 2) + ")\n          scale(" + 
	(this.props.dim / 2) + " " + (-this.props.dim / 2) + ")")}, 

	          React.createElement("g", {transform: ("scale(" + (2 / this.props.dim) + ")")}, 
	            React.createElement("line", {x1: "0.5", y1: "7.5", x2: "0.5", y2: "-6.5", style: {stroke: "#555", strokeWidth: 1}}), 
	            React.createElement("line", {x1: "-6.5", y1: "0.5", x2: "7.5", y2: "0.5", style: {stroke: "#555", strokeWidth: 1}})
	          ), 

	           this.props.pointGroups.map(this.buildAwesomePointGroup), 

	          React.createElement("rect", {x: -0.97, y: -0.97, height: 0.12, width: 0.12, 
	            fill: "red", onClick: this.newPointGroup(0), style: {cursor: "pointer"}}), 
	          React.createElement("rect", {x: -0.82, y: -0.97, height: 0.12, width: 0.12, 
	            fill: "blue", onClick: this.newPointGroup(1), style: {cursor: "pointer"}})

	        )
	      );
	  }
	});

	module.exports = AwesomeDataComponent;


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                                 
	                                             
	                                                   

	"use strict";

	var $__0=    __webpack_require__(24),scale=$__0.scale,add=$__0.add,modulus=$__0.modulus;

	function sigmoid(wx)         {
	  return 1 / (1 + Math.exp(-wx));
	}

	// function logSigmoid(wx): number {
	//   return -Math.log(1 + Math.exp(-wx));
	// }

	// function logOneMinusSigmoid(wx): number {
	//   return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
	// }


	// the objective function is used to generate the surface
	function objective(smallW    , pointGroups                 )         {
	  var sum = 0;

	  pointGroups.filter(function(pg)  {return pg.label === 0;}).forEach(function($__0) {var points=$__0.points;
	    for (var i = 0, len = points.length; i < len; i = i + 1) {
	      var p = points[i];
	      sum = sum - Math.log(1 + Math.exp(-200 * (smallW.x * p.x + smallW.y * p.y))); // inlined logSigmoid
	    }
	  });

	  pointGroups.filter(function(pg)  {return pg.label === 1;}).forEach(function($__0) {var points=$__0.points;
	    for (var j = 0, len2 = points.length; j < len2; j = j + 1) {
	      var q = points[j];
	      sum = sum - Math.log(Math.exp(200 * (smallW.x * q.x + smallW.y * q.y)) + 1); // inlined logOneMinusSigmoid
	    }
	  });
	  // flip representation because Surface.jsx shows maximisation
	  return (7 - Math.log(1 - sum)) / 30;
	}



	var NU = 0.02;
	var ACCEPTING_GRAD = 1 / 200; // we reach this in ~ 300 loops
	var MAX_STOPS = 250;

	function optimise(smallStartW    , pointGroups                 )            {
	  function gradient(w    )     {
	    var grad = {x: 0, y: 0};

	    for (var k = 0; k < pointGroups.length; k = k + 1){
	      var $__0=   pointGroups[k],label=$__0.label,points=$__0.points;
	      for (var i = 0, l = points.length; i < l; i = i + 1) {
	        var p = points[i];
	        var scaleFactor = sigmoid(200 * (w.x * p.x + w.y * p.y)) - (1 - label);
	        grad.x = grad.x + scaleFactor * p.x;
	        grad.y = grad.y + scaleFactor * p.y;
	      }
	    }

	    return grad;
	  }

	  var w = smallStartW;
	  var grad;
	  var stops = [w];
	  while (grad = gradient(w), modulus(grad) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
	    w = add(w)(scale(-1 * NU)(grad));
	    stops.push(w);
	  }
	  return stops;
	}


	function fastOptimise(smallStartW    , pointGroups                 )         {
	  function gradient(w    )     {
	    var grad = {x: 0, y: 0};

	    for (var k = 0, kmax = pointGroups.length; k < kmax; k = k + 1){
	      var $__0=   pointGroups[k],label=$__0.label,points=$__0.points;
	      for (var i = 0, l = points.length; i < l; i = i + 1) {
	        var p = points[i];
	        var scaleFactor = sigmoid(200 * (w.x * p.x + w.y * p.y)) - (1 - label);
	        grad.x = grad.x + scaleFactor * p.x;
	        grad.y = grad.y + scaleFactor * p.y;
	      }
	    }

	    return grad;
	  }

	  var w = Object.create(smallStartW);
	  var grad;
	  var stops = 1;
	  while (grad = gradient(w), modulus(grad) > ACCEPTING_GRAD && stops < MAX_STOPS) {
	    w.x = w.x - NU * grad.x;
	    w.y = w.y - NU * grad.y;
	    stops = stops + 1;
	  }
	  return stops;
	}



	module.exports = {
	  objective: objective,
	  optimise: optimise,
	  fastOptimise: fastOptimise
	};


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                 
	                
	                    
	                
	               
	                                       
	    
	                     
	  

	var LogisticRegression = __webpack_require__(6);
	var MaximumMargin = __webpack_require__(26);
	var ParametricGraph = __webpack_require__(27);
	var Perceptron = __webpack_require__(28);
	var React = __webpack_require__(1);
	var ThreeScene = __webpack_require__(29);



	var MiniModelChooser = React.createClass({displayName: "MiniModelChooser",

	  propTypes: {
	    highlightedW: React.PropTypes.object.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    angle: React.PropTypes.number.isRequired,
	    focusModel: React.PropTypes.func.isRequired,
	  },

	  shouldComponentUpdate: function(nextProps     )          {
	    return (this.props.angle !== nextProps.angle ||
	      this.props.pointGroups !== nextProps.pointGroups ||
	      this.props.highlightedW !== nextProps.highlightedW);
	  },

	  render: function()                {
	    var dim = 120;

	    var models = [Perceptron, LogisticRegression, MaximumMargin];

	    return (
	      React.createElement("div", null, 
	         models.map(function(model) 
	            {return React.createElement("div", {style: {cursor: "pointer"}, onClick: function()  {return this.props.focusModel(model);}.bind(this)}, 
	              React.createElement(ThreeScene, {dim: dim, pointGroups: this.props.pointGroups, angle: this.props.angle, 
	                  objective: model.objective, highlightW: function() {}}, 
	                React.createElement(ParametricGraph, {thetaResolution: 30, rResolution: 6, 
	                  colourFunction: ParametricGraph.COLOUR_FUNCTION})
	              )
	            );}.bind(this)
	          )
	      )
	    );
	  }
	});


	module.exports = MiniModelChooser;


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                 
	                
	                    
	                
	               
	                                       
	    
	                     
	  
	              
	                               
	                   
	                
	                     
	 


	var CursorSphere = __webpack_require__(30);
	var Draggable3DScene = __webpack_require__(31);
	var LogisticRegression = __webpack_require__(6);
	var MaximumMargin = __webpack_require__(26);
	var OptimiserLine = __webpack_require__(32);
	var ParametricGraph = __webpack_require__(27);
	var Perceptron = __webpack_require__(28);
	var React = __webpack_require__(1);
	var WebWorkerGraph = __webpack_require__(33);



	var ModelSwitcherVis = React.createClass({displayName: "ModelSwitcherVis",

	  propTypes: {
	    highlightedW: React.PropTypes.object.isRequired,
	    highlightW: React.PropTypes.func.isRequired,
	    updateAngle: React.PropTypes.func.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    width: React.PropTypes.number.isRequired,
	    focussedModel: React.PropTypes.object.isRequired,
	  },

	  shouldComponentUpdate: function(nextProps     )       {
	    return (this.props.highlightedW !== nextProps.highlightedW ||
	      this.props.pointGroups !== nextProps.pointGroups ||
	      this.props.width !== nextProps.width ||
	      this.props.focussedModel !== nextProps.focussedModel);
	  },

	  makeGraph: function()               {
	    if (this.props.focussedModel === Perceptron) {
	      return (
	        React.createElement(ParametricGraph, {thetaResolution: 96, rResolution: 50, 
	          colourFunction: ParametricGraph.COLOUR_FUNCTION, 
	          objective: Perceptron.objective, pointGroups: this.props.pointGroups})
	      );
	    } else if (this.props.focussedModel === LogisticRegression) {
	      return (
	        React.createElement(WebWorkerGraph, {thetaResolution: 252, rResolution: 84, 
	          objective: LogisticRegression.objective, pointGroups: this.props.pointGroups})
	      );
	    } else {
	      console.assert(this.props.focussedModel === MaximumMargin);
	      return (
	        React.createElement(ParametricGraph, {thetaResolution: 96, rResolution: 50, 
	          colourFunction: ParametricGraph.COLOUR_FUNCTION, 
	          objective: MaximumMargin.objective, pointGroups: this.props.pointGroups})
	      );
	    }
	  },

	  render: function()                {
	    var dim = this.props.width;

	    var optimiserLine;
	    if (typeof this.props.focussedModel.optimise !== "undefined" &&
	        this.props.focussedModel.optimise !== null) {
	      optimiserLine = this.props.focussedModel.optimise(this.props.highlightedW, this.props.pointGroups);
	    }

	    return (
	      React.createElement("div", {style: {width: '100%'}}, 

	        React.createElement(Draggable3DScene, {dim: dim, pointGroups: this.props.pointGroups, 
	            updateAngle: this.props.updateAngle, 
	            objective: LogisticRegression.objective, highlightW: this.props.highlightW}, 

	           optimiserLine && React.createElement(OptimiserLine, {vertices: optimiserLine, 
	            dim: dim, objective: this.props.focussedModel.objective, pointGroups: this.props.pointGroups}), 

	          React.createElement(CursorSphere, {highlightedW: this.props.highlightedW, dim: dim, 
	            objective: this.props.focussedModel.objective, pointGroups: this.props.pointGroups}), 

	           this.makeGraph() 

	        )

	      )
	    );
	  }
	});

	module.exports = ModelSwitcherVis;


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	module.exports = [{"label":0,"points":[{"x":-0.5997479449727805,"y":0.3266696424458529},{"x":-0.40911978879586314,"y":0.8414896852756555},{"x":-0.6003797969565033,"y":0.38752330824897496},{"x":-0.5974989282403006,"y":0.16793046373201084},{"x":-0.3731116894435043,"y":0.25446221414788783},{"x":-0.4611574437563745,"y":0.7513580834354632},{"x":-0.5666119173059607,"y":0.1786999017955041},{"x":-0.2660309178401766,"y":0.7466422175867058},{"x":-0.45781364583698203,"y":-0.02543721371721755},{"x":-0.7637313902662306,"y":0.8401606006403106},{"x":-0.6719389189432546,"y":-0.3705455189155673},{"x":-0.7724832708046918,"y":-0.20005680566395434},{"x":-0.6921484832633631,"y":0.027283867565444403},{"x":-0.530968122206404,"y":0.795008094328021},{"x":-0.8273452458511434,"y":-0.002424446162095889},{"x":-0.5185588104892703,"y":0.4620006701485645},{"x":-0.7023706476095739,"y":-0.15958155170093186},{"x":-0.8186378396018115,"y":0.23211487091509184},{"x":-0.5665597344525202,"y":0.524761380696566}],"generatedBy":{"center":{"x":-0.5966666666666667,"y":0.19666666666666655},"params":{"l":0.8658457650695586,"theta":-0.17021192528547435}},"mouseDownDiff":null},{"points":[{"x":0.4163818674864531,"y":-0.23528659967706647},{"x":0.44437265613239896,"y":-0.32627143782971557},{"x":0.23942084809958375,"y":-0.6063253418870334},{"x":0.20789742517139406,"y":-0.4091351995003449},{"x":0.2859242354507277,"y":-0.628035096817553},{"x":0.4479649125412124,"y":-0.32415304169593623},{"x":0.45280865076218857,"y":-0.28336832097127984},{"x":0.4075665078010422,"y":-0.39443831290755565},{"x":0.41222269797067723,"y":-0.5769874083755533},{"x":0.3604938339252303,"y":-0.6174488199442758},{"x":0.32403805174279,"y":-0.4848541835691167},{"x":0.34868895341495887,"y":-0.5032884333079499},{"x":0.5243233489148638,"y":-0.20416220785332426},{"x":0.2691046775763215,"y":-0.5310206893985944}],"label":1,"generatedBy":{"center":{"x":0.36999999999999966,"y":-0.3666666666666666},"params":{"l":0.16719914938645886,"theta":1.1606689862534059}},"mouseDownDiff":null},{"label":1,"points":[{"x":0.6660524477396749,"y":0.08876441212498268},{"x":0.6803536514830696,"y":0.16701383499073325},{"x":0.5737262476146427,"y":0.09345571376890369},{"x":0.740243418325372,"y":0.21788967786543098},{"x":0.5723510298190286,"y":-0.048872997526596906},{"x":0.7230819188867843,"y":0.021448199402366697},{"x":0.801222820812387,"y":0.16978847488949483},{"x":0.703671157000718,"y":-0.09675544323096463},{"x":0.5828143995173792,"y":-0.021816106911635158},{"x":0.610639172868958,"y":-0.020054843756927843},{"x":0.43240212272182954,"y":-0.10731745449670954},{"x":0.4766009580339221,"y":-0.04283729687880106},{"x":0.8295860086096446,"y":0.17175194897798224},{"x":0.6763934813675491,"y":0.20435599390510958},{"x":0.6764534988724937,"y":0.1631264448161256}],"generatedBy":{"center":{"x":0.6364731932586679,"y":0.05456092271332935},"params":{"l":0.2054371382466992,"theta":1.000694039631934}},"mouseDownDiff":null}];


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                                         
	              
	                     
	                                   
	  

	var React = __webpack_require__(1);
	var $__0=       __webpack_require__(24),add=$__0.add,subtract=$__0.subtract,scale=$__0.scale,rotate=$__0.rotate,modulus=$__0.modulus,dotProduct=$__0.dotProduct;
	var $__1=    __webpack_require__(25),generatePoints=$__1.generatePoints,ELLIPSE_FIXED_RADIUS=$__1.ELLIPSE_FIXED_RADIUS,labelToColour=$__1.labelToColour;
	var $__2=  __webpack_require__(1).addons,PureRenderMixin=$__2.PureRenderMixin;


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

	  mixins: [PureRenderMixin],

	  getInitialState: function()        {
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

	    // update all points
	    var stretchDirection = rotate(theta, {x: 0, y: 1});
	    var newPoints = this.props.points.map(function(p)  {
	      var fromCenter = subtract(p)(center);
	      var rotatedFromCenter = rotate(theta - oldTheta, fromCenter);
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
	    e.stopPropagation();
	    e.preventDefault();
	    var $__0=   this.props.generatedBy.params,l=$__0.l,theta=$__0.theta;
	    this.setState({paramsAtHandleMouseDown: {l:l, theta:theta}});
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


/***/ },

/***/ 24:
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

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                           
	                                 
	                    
	             
	                                     
	  

	var $__0=   __webpack_require__(24),add=$__0.add,rotate=$__0.rotate;



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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                                 
	                                                   

	"use strict";

	var $__0=   __webpack_require__(24),modulus=$__0.modulus,classTransform=$__0.classTransform;


	// the objective function is used to generate the surface
	function objective(w    , pointGroups                 )         {
	  var minimumMargin = Infinity;

	  for (var k = 0, maxk = pointGroups.length; k < maxk; k = k + 1) {
	    var $__0=   pointGroups[k],points=$__0.points,label=$__0.label;

	    for (var i = 0, l = points.length; i < l; i = i + 1) {
	      var p = points[i];
	      var addOrSubtract = -1 * classTransform(label);
	      minimumMargin = Math.min(minimumMargin, addOrSubtract * (w.x * p.x + w.y * p.y));
	    }
	  }

	  // normalise by w.
	  return 0.2 + 0.5 * minimumMargin / modulus(w);
	}

	module.exports = {objective:objective};


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	var React = __webpack_require__(1);
	var THREE = __webpack_require__(2);
	var FasterGeometry = __webpack_require__(79);

	                                 
	                                                   
	              
	                                    
	                                                            
	                                           
	                               
	                                                             
	                      
	                     
	                          
	 
	              
	                    
	 



	var MATERIAL = new THREE.MeshBasicMaterial({
	  side: THREE.DoubleSide,
	  vertexColors: THREE.FaceColors,
	  opacity: 0.8,
	  transparent: true,
	});


	var ParametricGraph = React.createClass({displayName: "ParametricGraph",
	  propTypes: {
	    colourFunction: React.PropTypes.func.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    objective: React.PropTypes.func.isRequired,
	    rResolution: React.PropTypes.number.isRequired,
	    scene: React.PropTypes.any.isRequired,
	    thetaResolution: React.PropTypes.number.isRequired,
	  },

	  statics: {
	    COLOUR_FUNCTION: function(boundingBox, vertex1, vertex2, vertex3, mutableFaceColor)       {
	      var zMin = boundingBox.min.z;
	      var zRange = boundingBox.max.z - zMin;
	      var totalZ = vertex1.z + vertex2.z + vertex3.z;
	      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
	      mutableFaceColor.setHSL(0.54, 0.8, 0.20 + 0.82 * Math.pow(normalizedZ, 2));
	    }
	  },

	  // 120 * 40 looks great... 4800 computations
	  // 96 * 32 - default
	  // 72 * 24
	  // 36 * 12
	  // 24 * 8 is pretty much a minimum.

	  getInitialState: function()        {
	    return {
	      graph: new THREE.Mesh(this.colourGeometry(this.buildInitialGeometry(this.props)), MATERIAL.clone())
	    };
	  },

	  componentWillMount: function() {
	    this.props.scene.add(this.state.graph);
	    this.props.forceParentUpdate();
	  },

	  componentWillUnmount: function() {
	    this.props.scene.remove(this.state.graph);
	    this.props.forceParentUpdate();
	  },

	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.pointGroups !== this.props.pointGroups ||
	      nextProps.objective !== this.props.objective);
	  },

	  componentWillReceiveProps: function(nextProps       ) {
	    if (this.shouldComponentUpdate(nextProps)) {
	      var geometry = this.state.graph.geometry;

	      for (var i = 0; i < geometry.vertices.length; i = i + 1) {
	        var vertex = geometry.vertices[i];
	        vertex.setZ(nextProps.objective(vertex, nextProps.pointGroups));
	      }

	      this.colourGeometry(geometry);
	      this.state.graph.geometry.verticesNeedUpdate = true;

	      if (nextProps.objective !== this.props.objective &&
	        nextProps.pointGroups === this.props.pointGroups) {
	        this.props.forceParentUpdate();
	      }
	    }
	  },

	  buildInitialGeometry: function(props       )                 {
	    var polarMeshFunction = function(i        , j        )                {
	      var theta = i * 2 * Math.PI;
	      var r = (Math.pow(1.8, j * j) - 1); // this ensures there are lots of samples near the origin and gets close to 0!
	      var x = r * Math.cos(theta);
	      var y = r * Math.sin(theta);
	      var z = props.objective({x:x, y:y}, props.pointGroups);
	      return new THREE.Vector3(x, y, z);
	    };

	    return new FasterGeometry(polarMeshFunction,
	      this.props.thetaResolution, this.props.rResolution, true);
	  },

	  colourGeometry: function(graphGeometry                )                 {
	    graphGeometry.computeBoundingBox();

	    for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
	      var face = graphGeometry.faces[i];
	      this.props.colourFunction(graphGeometry.boundingBox,
	        graphGeometry.vertices[face.a],
	        graphGeometry.vertices[face.b],
	        graphGeometry.vertices[face.c],
	        face.color);
	    }

	    graphGeometry.colorsNeedUpdate = true;
	    return graphGeometry;
	  },

	  render: function()                {
	    return null;
	  }
	});

	module.exports = ParametricGraph;


/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                                                   

	var $__0=     __webpack_require__(24),add=$__0.add,scale=$__0.scale,classify=$__0.classify,classTransform=$__0.classTransform;

	/*
	The Perceptron training algorithm cycles through each training
	example (xn) in turn and,

	if the example is correctly classified no change is made,

	otherwise the example’s vector is added or subtracted
	(depending on its class label) from the current weight
	vector.
	*/

	/**
	Given some data and a start weight, return a list of vectors w such that describes
	the algorithm's progression.  First w is the start weight, last w is the result of the algorithm

	Maximum list length = 300 (for non-terminating stuff)
	*/
	var PERCEPTRON_NU = 0.1;
	var EPOCHS = 2;
	/*
	The value of nu is interesting to observe.

	<0.05 - often doesn't reach optimal (runs out of data points)
	0.1 - almost always reaches the optimum. Occasionally stops just shy of optimal.
	0.5 - seems to work pretty fast.  Occasionally overshoots a bit.
	>0.75 - seems to work, but ends up with a large w.
	*/

	module.exports = {

	  objective: function(w    , pointGroups                 )         {
	    for (var k = 0; k < pointGroups.length; k = k + 1) {
	      var $__0=   pointGroups[k],points=$__0.points,label=$__0.label;
	      if (points.some(function(p)  {return classify(p, w) !== label;})) {
	        return 0; // there was a misclassification
	      }
	    }

	    return 0.3;
	  },

	  optimise: function(startWeight    , pointGroups                 )            {
	    var w = startWeight;
	    var stops = [w];

	    for (var k = 0; k < pointGroups.length * EPOCHS; k = k + 1) {
	      var $__0=   pointGroups[k % pointGroups.length],points=$__0.points,label=$__0.label;
	      for (var i = 0, maxi = points.length; i < maxi; i = i + 1) {
	        if (classify(w, points[i]) !== label) {
	          // there was a classification error, so we should add or subtract the points[i].
	          w = add(w)(scale(-1 * PERCEPTRON_NU * classTransform(label))( points[i] ));
	          stops.push(w);
	        }
	      }
	    }
	    return stops;
	  },

	};


/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                           
	                                 
	"use strict";

	var React = __webpack_require__(1);
	var THREE = __webpack_require__(2);

	              
	                                  
	                                
	                     
	 
	                                                   
	              
	              
	                               
	                                                             
	                
	 


	var ThreeScene = React.createClass({displayName: "ThreeScene",
	  propTypes: {
	    dim: React.PropTypes.number.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    objective: React.PropTypes.func.isRequired,
	    angle: React.PropTypes.number.isRequired,
	  },

	  getDistance: function()         {
	    return 1.4;
	  },

	  getInitialState: function()        {
	    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.01, 100 ); // Field of view, aspect ratio, near clip, far clip
	    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
	    this.updateCamera(initialCamera, this.props.angle);

	    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
	    initialRenderer.setClearColor( 0x111111, 1 );
	    initialRenderer.setSize(this.props.dim, this.props.dim);

	    return {
	      camera: initialCamera,
	      renderer: initialRenderer,
	      scene: new THREE.Scene(),
	    };
	  },

	  componentDidMount: function() {
	    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);
	    this.state.renderer.render(this.state.scene, this.state.camera);
	  },

	  componentWillUpdate: function(nextProps       )       {
	    if (nextProps.angle !== this.props.angle) {
	      this.updateCamera(this.state.camera, nextProps.angle);
	    }
	    if (nextProps.dim !== this.props.dim) {
	      this.state.renderer.setSize(nextProps.dim, nextProps.dim);
	    }
	  },

	  updateCamera: function(camera              , angle        )       {
	    camera.position.x = Math.cos(angle) * this.getDistance();
	    camera.position.y = Math.sin(angle) * this.getDistance();
	    camera.position.z = 0.4 * this.getDistance();
	    camera.lookAt(new THREE.Vector3(0, 0, -0.3));
	  },

	  render: function()                {
	    var mergeInProps = {
	      pointGroups: this.props.pointGroups,
	      objective: this.props.objective,
	      scene: this.state.scene,
	      forceParentUpdate: function()  {return this.forceUpdate();}.bind(this)
	    };
	    var children = React.Children.map(this.props.children, function(childElement) {
	      if (React.isValidElement(childElement)) {
	        return React.cloneElement(childElement, mergeInProps);
	      } else {
	        return null;
	      }
	    });

	    this.state.renderer.render(this.state.scene, this.state.camera);

	    return (
	      React.createElement("div", {ref: "container"}, 
	         children 
	      )
	    );
	  }
	});

	module.exports = ThreeScene;


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	var React = __webpack_require__(1);
	var THREE = __webpack_require__(2);

	                                 
	                                                   
	              
	                   
	                               
	                                                             
	                     
	 


	var CursorSphere = React.createClass({displayName: "CursorSphere",
	  propTypes: {
	    highlightedW: React.PropTypes.object.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    objective: React.PropTypes.func.isRequired,
	    scene: React.PropTypes.any.isRequired
	  },

	  getInitialState: function() {
	    return {
	      sphere: new THREE.Mesh( new THREE.SphereGeometry(6 / this.props.dim, 6, 6) , new THREE.MeshLambertMaterial() )
	    };
	  },

	  componentWillMount: function() {
	    this.props.scene.add(this.state.sphere);
	  },

	  componentWillUnmount: function() {
	    this.props.scene.remove(this.state.sphere);
	  },

	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.highlightedW !== this.props.highlightedW ||
	      this.props.pointGroups !== nextProps.pointGroups ||
	      this.props.objective !== nextProps.objective);
	  },

	  componentWillReceiveProps: function(nextProps       ) {
	    if (this.shouldComponentUpdate(nextProps)) {
	      var highlightedW = nextProps.highlightedW;

	      if (typeof highlightedW !== "undefined" && highlightedW !== null) {
	        var $__0=   highlightedW,x=$__0.x,y=$__0.y;
	        var z = nextProps.objective(highlightedW, nextProps.pointGroups);
	        this.state.sphere.position.set(x, y, z);
	      }
	    }
	  },

	  render: function()                {
	    return null;
	  }
	});

	module.exports = CursorSphere;


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                           
	                                 
	"use strict";

	var React = __webpack_require__(1);
	var THREE = __webpack_require__(2);

	              
	                
	                                  
	                                 
	                            
	                                 
	                                
	                     
	                      
	 
	                                                   
	              
	              
	                          
	                               
	                                                             
	 


	var Draggable3DScene = React.createClass({displayName: "Draggable3DScene",
	  propTypes: {
	    dim: React.PropTypes.number.isRequired,
	    highlightW: React.PropTypes.func.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    objective: React.PropTypes.func.isRequired
	  },

	  getDistance: function()         {
	    return 1.4;
	  },

	  getInitialState: function()        {
	    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.01, 1000 ); // Field of view, aspect ratio, near clip, far clip
	    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
	    this.updateCamera(initialCamera, 0);

	    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
	    initialRenderer.setClearColor( 0x111111, 1 );
	    initialRenderer.setSize(this.props.dim, this.props.dim);

	    return {
	      angle: 0,
	      camera: initialCamera,
	      mouseDownCamera: null,
	      mouseDownClientX: null,
	      mouseDownPoint: null,
	      renderer: initialRenderer,
	      scene: new THREE.Scene(),
	      startAngle: null,
	    };
	  },

	  componentDidMount: function() {
	    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);
	    this.state.renderer.render(this.state.scene, this.state.camera);
	  },

	  componentWillUpdate: function(nextProps       , nextState        )       {
	    if (typeof nextState !== "undefined" && nextState !== null && nextState.angle !== this.state.angle) {
	      this.updateCamera(this.state.camera, nextState.angle);
	      this.props.updateAngle(nextState.angle);
	    }
	    if (nextProps.dim !== this.props.dim) {
	      this.state.renderer.setSize(nextProps.dim, nextProps.dim);
	    }
	  },

	  updateCamera: function(camera              , angle        )       {
	    camera.position.x = Math.cos(angle) * this.getDistance();
	    camera.position.y = Math.sin(angle) * this.getDistance();
	    camera.position.z = 0.4 * this.getDistance();
	    camera.lookAt(new THREE.Vector3(0, 0, -0.3));
	  },

	  mouseDown: function(e                      )       {
	    var intersections = this.getGraphIntersections(e);
	    if (intersections.length > 0){ // try to drag
	      this.setState({
	        mouseDownCamera: this.state.camera.clone(),
	        mouseDownPoint: intersections[0].point,
	      });
	    }
	    this.setState({
	      mouseDownClientX: e.clientX,
	      startAngle: this.state.angle
	    });
	  },

	  mouseUp: function()       {
	    this.setState({
	      mouseDownClientX: null,
	      startAngle: null,
	      mouseDownCamera: null,
	      mouseDownPoint: null
	    });
	  },

	  mouseMove: function(e                      )       {
	    if (typeof this.state.mouseDownClientX !== "undefined" && this.state.mouseDownClientX !== null &&
	        typeof this.state.startAngle !== "undefined" && this.state.startAngle !== null) {
	      if (typeof this.state.mouseDownPoint !== "undefined" && this.state.mouseDownPoint !== null &&
	          typeof this.state.mouseDownCamera !== "undefined" && this.state.mouseDownCamera !== null) {
	        this.handleSceneDrag(e, this.state.startAngle, this.state.mouseDownPoint, this.state.mouseDownCamera);
	      } else {
	        this.handleSpaceDrag(e, this.state.startAngle, this.state.mouseDownClientX);
	      }
	    } else {
	      this.handleHover(e);
	    }
	  },

	  handleSceneDrag: function(e                      ,
	      startAngle        ,
	      mouseDownPoint               ,
	      mouseDownCamera              )       {
	    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -mouseDownPoint.z);
	    var raycaster = this.raycast(mouseDownCamera, e);
	    var cursorPoint = raycaster.ray.intersectPlane(plane);
	    if (typeof cursorPoint !== "undefined" && cursorPoint !== null) {
	      var angle = function(point    )         {
	        return Math.atan(point.y / point.x);
	      };
	      var fudge = (cursorPoint.x > 0 && mouseDownPoint.x < 0) ||
	        (cursorPoint.x < 0 && mouseDownPoint.x > 0) ? Math.PI : 0;
	      var deltaAngle = angle(cursorPoint) - fudge - angle(mouseDownPoint);
	      this.setState({
	        angle: startAngle - deltaAngle
	      });
	    }
	  },

	  handleSpaceDrag: function(e                      , startAngle        , mouseDownClientX        )       {
	    var deltaX = e.clientX - mouseDownClientX;
	    var deltaAngle = (deltaX / this.props.dim) * 2 * Math.PI;
	    this.setState({
	      angle: startAngle - deltaAngle
	    });
	  },

	  getGraphIntersections: function(e                      )                       {
	    // exclude line & CursorSphere
	    var graph = this.state.scene.children.filter(function(child) 
	      {return child instanceof THREE.Mesh && !(child.geometry instanceof THREE.SphereGeometry);});
	    return this.raycast(this.state.camera, e).intersectObjects(graph);
	  },

	  handleHover: function(e                      )       {
	    var intersections = this.getGraphIntersections(e);
	    if (intersections.length > 0) {
	      this.props.highlightW(intersections[0].point);
	    }
	  },

	  raycast: function(camera              , e                      )                  {
	    var $__0=     this.refs.container.getDOMNode().getBoundingClientRect(),left=$__0.left,top=$__0.top;
	    var x = 2 * (e.clientX - left) / this.props.dim - 1;
	    var y = -2 * (e.clientY - top) / this.props.dim + 1;
	    var raycaster = new THREE.Raycaster();
	    raycaster.set( camera.position, camera );
	    raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(camera.position).normalize();
	    return raycaster;
	  },

	  render: function()                {
	    var mergeInProps = {
	      scene: this.state.scene,
	      forceParentUpdate: function()  {return this.forceUpdate();}.bind(this)
	    };
	    var children = React.Children.map(this.props.children, function(childElement) {
	      if (React.isValidElement(childElement)) {
	        return React.cloneElement(childElement, mergeInProps);
	      } else {
	        return null;
	      }
	    });

	    this.state.renderer.render(this.state.scene, this.state.camera);

	    return (
	      React.createElement("div", {ref: "container", 
	          onMouseDown: this.mouseDown, 
	          onMouseUp: this.mouseUp, 
	          onMouseMove: this.mouseMove}, 
	        children
	      )
	    );
	  }
	});

	module.exports = Draggable3DScene;


/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	var React = __webpack_require__(1);
	var THREE = __webpack_require__(2);


	                                 
	                                                   
	              
	                      
	                               
	                                                             
	                     
	 
	              
	                    
	 


	var OptimiserLine = React.createClass({displayName: "OptimiserLine",
	  propTypes: {
	    vertices: React.PropTypes.array.isRequired,
	    objective: React.PropTypes.func.isRequired,
	    pointGroups: React.PropTypes.array.isRequired,
	    scene: React.PropTypes.any.isRequired
	  },

	  getInitialState: function()        {
	    return {line: null};
	  },

	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.vertices !== this.props.vertices ||
	      nextProps.pointGroups !== this.props.pointGroups ||
	      nextProps.objective !== this.props.objective);
	  },

	  componentWillUnmount: function() {
	    this.props.scene.remove(this.state.line);
	  },

	  componentWillReceiveProps: function(nextProps       ) {
	    if (this.shouldComponentUpdate(nextProps)) {
	      var vertices = nextProps.vertices;
	      this.props.scene.remove(this.state.line);

	      if (typeof vertices !== "undefined" && vertices !== null) {

	        var LINE_MATERIAL = new THREE.LineBasicMaterial({color: 0xffffff});
	        var geometry = new THREE.Geometry();
	        var line = new THREE.Line(geometry, LINE_MATERIAL);

	        geometry.vertices = vertices.map(
	          function(w)  {
	            var z = nextProps.objective(w, nextProps.pointGroups);
	            return new THREE.Vector3(w.x, w.y, z + 1 / this.props.dim); // hack to keep the line above the surface. (better would be smart interpolation)
	          }.bind(this)
	        );

	        nextProps.scene.add(line);
	        this.setState({line: line});
	      }
	    }
	  },

	  render: function()                {
	    return null;
	  }
	});

	module.exports = OptimiserLine;


/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";

	                                 
	                                                   
	                                                        
	              
	                               
	                      
	                     
	                          
	                                                             
	                                
	 
	              
	                    
	                 
	 

	var FasterGeometry = __webpack_require__(79);
	var LogisticRegression = __webpack_require__(6);
	var React = __webpack_require__(1);
	var THREE = __webpack_require__(2);
	var WorkerBridge = __webpack_require__(80);



	var MATERIAL = new THREE.MeshBasicMaterial({
	  side: THREE.DoubleSide,
	  vertexColors: THREE.FaceColors,
	  opacity: 0.8,
	  transparent: true,
	});

	var colourFunction = function(pointGroups, boundingBox, vertex2, vertex3, mutableFaceColor)  {
	  var zMin = boundingBox.min.z;
	  var zRange = boundingBox.max.z - zMin;
	  // only using two because the avg of these is the middle of two faces (ie one square).
	  var totalZ = vertex2.z + vertex3.z;
	  var normalizedZ = (totalZ - 2 * zMin) / (2 * zRange);
	  var stops = LogisticRegression.fastOptimise(vertex2, pointGroups) / 250;
	  mutableFaceColor.setHSL(0.31 -  stops * 0.3, 0.8, 0.20 + 0.82 * Math.pow(normalizedZ, 2));
	};


	var WebWorkerGraph = React.createClass({displayName: "WebWorkerGraph",
	  propTypes: {
	    pointGroups: React.PropTypes.array.isRequired,
	    rResolution: React.PropTypes.number.isRequired, // 8
	    scene: React.PropTypes.any.isRequired,
	    objective: React.PropTypes.func.isRequired,
	    thetaResolution: React.PropTypes.number.isRequired, // 24
	    forceParentUpdate: React.PropTypes.func.isRequired,
	  },

	  getInitialState: function()        {
	    return {
	      graph: new THREE.Mesh(this.buildInitialGeometry(this.props), MATERIAL.clone()),
	      coarseGraph: new THREE.Mesh(this.buildCoarseGeometry(this.props), MATERIAL.clone()),
	      timer: null,
	    };
	  },

	  polarMeshFunction: function(props       )      {
	    return function(r        , j        )                {
	      // var r = (Math.pow(1.8, i * i) - 1); // this ensures there are lots of samples near the origin and gets close to 0!
	      // var r = (i + i * i) / 2; // this ensures there are lots of samples near the origin and gets close to 0!
	      var theta = j * 2 * Math.PI;
	      var x = r * Math.cos(theta);
	      var y = r * Math.sin(theta);
	      var z = props.objective({x:x, y:y}, props.pointGroups);
	      return new THREE.Vector3(x, y, z);
	    };
	  },

	  buildInitialGeometry: function(props       )                 {
	    var geometry = new FasterGeometry(this.polarMeshFunction(props),
	      this.props.rResolution, this.props.thetaResolution, true);

	    geometry.computeBoundingBox();
	    return geometry;
	  },

	  buildCoarseGeometry: function(props       )                 {
	    var geometry = new FasterGeometry(this.polarMeshFunction(props),
	      Math.floor(props.rResolution / 12), Math.floor(props.thetaResolution / 12), true);
	    return this.colourGeometry(props, geometry);
	  },

	  colourGeometry: function(props       , graphGeometry                )                 {
	    graphGeometry.computeBoundingBox();

	    for (var i = 0, len = graphGeometry.faces.length; i < len; i = i + 2) {
	      var face = graphGeometry.faces[i];
	      colourFunction(props.pointGroups, graphGeometry.boundingBox,
	        graphGeometry.vertices[face.b],
	        graphGeometry.vertices[face.c],
	        face.color);
	      graphGeometry.faces[i + 1].color.copy(face.color);
	    }

	    graphGeometry.colorsNeedUpdate = true;
	    return graphGeometry;
	  },

	  componentWillMount: function() {
	    this.props.scene.add(this.state.coarseGraph);
	    this.asyncRequestColouring(this.props);
	    this.props.forceParentUpdate();
	  },

	  componentWillUnmount: function() {
	    WorkerBridge.abort();
	    this.props.scene.remove(this.state.coarseGraph);
	    this.props.scene.remove(this.state.graph);
	    this.props.forceParentUpdate();
	  },

	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.pointGroups !== this.props.pointGroups ||
	      nextProps.objective !== this.props.objective);
	  },

	  refreshGeometryZValues: function(props       , geometry                )       {
	    var $__0=  geometry,vertices=$__0.vertices;
	    var len = vertices.length;
	    for (var i = 0; i < len; i = i + 1) {
	      var vertex = vertices[i];
	      vertex.setZ(props.objective(vertex, props.pointGroups));
	    }
	    geometry.verticesNeedUpdate = true;
	  },

	  swapCoarseGraphBackIn: function(props       ) {
	    this.props.scene.remove(this.state.graph);
	    this.refreshGeometryZValues(props, this.state.coarseGraph.geometry);
	    this.colourGeometry(props, this.state.coarseGraph.geometry);
	    this.props.scene.add(this.state.coarseGraph);
	    this.props.forceParentUpdate();
	  },

	  componentWillReceiveProps: function(nextProps       ) {
	    if (this.shouldComponentUpdate(nextProps)) {
	      this.swapCoarseGraphBackIn(nextProps);

	      WorkerBridge.abort();

	      var mouseDown = nextProps.pointGroups.some(function(pg)  {return pg.mouseDownDiff;});
	      if (!mouseDown) {
	        this.refreshGeometryZValues(nextProps, this.state.graph.geometry);
	        this.asyncRequestColouring(nextProps);
	      }
	    }
	  },

	  asyncRequestColouring: function($__0         ) {var thetaResolution=$__0.thetaResolution,rResolution=$__0.rResolution,pointGroups=$__0.pointGroups;
	    console.log('[React] sending request');

	    WorkerBridge.request({thetaResolution:thetaResolution, rResolution:rResolution, pointGroups:pointGroups}, function($__0)  {var hues=$__0.hues;
	      var $__1=    this.state.graph.geometry,boundingBox=$__1.boundingBox,faces=$__1.faces,vertices=$__1.vertices;
	      var zRange = boundingBox.max.z - boundingBox.min.z;

	      for (var i = 0, len = hues.length; i < len; i = i + 1) {
	        var face = faces[i];
	        var normalizedZ = (vertices[face.a].z + vertices[face.a].z + vertices[face.a].z -
	          3 * boundingBox.min.z) / (3 * zRange);
	        face.color.setHSL(hues[i] / 256, 0.8, 0.20 + 0.82 * Math.pow(normalizedZ, 2));
	      }

	      this.state.graph.geometry.colorsNeedUpdate = true;
	      this.props.scene.remove(this.state.coarseGraph);
	      this.props.scene.add(this.state.graph);
	      this.props.forceParentUpdate();
	    }.bind(this));
	  },

	  render: function()                {
	    return null;
	  }
	});

	module.exports = WebWorkerGraph;


/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	var THREE = __webpack_require__(2);

	var FasterGeometry = function(func, slices, stacks) {

	  THREE.Geometry.call( this );

	  for ( var i = 0; i <= stacks; i = i + 1 ) {
	    var v = i / stacks;
	    for ( var j = 0; j <= slices; j = j + 1 ) {
	      this.vertices.push( func( j / slices, v ) );
	    }
	  }

	  var sliceCount = slices + 1;

	  for ( var p = 0; p < stacks; p = p + 1 ) {
	    for ( var q = 0; q < slices; q = q + 1 ) {
	      var a = p * sliceCount + q;
	      var b = p * sliceCount + q + 1;
	      var c = (p + 1) * sliceCount + q + 1;
	      var d = (p + 1) * sliceCount + q;
	      this.faces.push( new THREE.Face3( a, b, d ) );
	      this.faces.push( new THREE.Face3( b, c, d ) );
	    }
	  }
	};

	FasterGeometry.prototype = Object.create( THREE.Geometry.prototype );
	FasterGeometry.prototype.constructor = FasterGeometry;

	module.exports = FasterGeometry;


/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	                           
	                                 

	                                                   
	                
	                          
	                      
	                               
	  
	                                    
	                                 


	var worker = new Worker("./build/worker.bundle.js");

	module.exports = {
	  request: function(request         , callback          )       {
	    // set up return path.  I think this should overwrite old listeners.
	    worker.onmessage = function(event     ) {
	      callback(event.data.result);
	    };
	    worker.postMessage({request:request});
	  },

	  abort: function()       {
	    console.log("[Bridge] abort");
	    worker.postMessage({});
	  }
	};


/***/ }

});