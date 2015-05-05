webpackJsonp([0],{

/***/ 0:
/*!***************************!*\
  !*** ./scripts/Entry.jsx ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var Immersive = __webpack_require__(/*! ./Immersive.jsx */ 229);
	
	window.React = React;
	
	React.render(React.createElement(Immersive, null), document.body);


/***/ },

/***/ 89:
/*!**********************************!*\
  !*** ./scripts/CursorSphere.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var THREE = __webpack_require__(/*! three */ 2);
	
	                                 
	                                           
	              
	                    
	                             
	                                                                
	                     
	 
	
	
	var CursorSphere = React.createClass({displayName: "CursorSphere",
	  propTypes: {
	    highlightedW: React.PropTypes.object.isRequired,
	    pointClasses: React.PropTypes.array.isRequired,
	    projectedError: React.PropTypes.func.isRequired,
	    scene: React.PropTypes.any.isRequired
	  },
	
	  getInitialState: function() {
	    return {
	      sphere: new THREE.Mesh( new THREE.SphereGeometry(3 / 400, 32, 32) , new THREE.MeshLambertMaterial() )
	    };
	  },
	
	  componentWillMount: function() {
	    this.props.scene.add(this.state.sphere);
	  },
	
	  componentWillUnmount: function() {
	    this.props.scene.remove(this.state.sphere);
	  },
	
	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.highlightedW !== this.props.highlightedW);
	  },
	
	  componentWillReceiveProps: function(nextProps       ) {
	    if (this.shouldComponentUpdate(nextProps)) {
	      var highlightedW = nextProps.highlightedW;
	      if (typeof highlightedW !== "undefined" && highlightedW !== null) {
	        var $__0=   highlightedW,x=$__0.x,y=$__0.y;
	        var z = nextProps.projectedError(highlightedW, nextProps.pointClasses);
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

/***/ 92:
/*!**************************************!*\
  !*** ./scripts/Draggable3DScene.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                           
	                                 
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var THREE = __webpack_require__(/*! three */ 2);
	
	              
	                
	                                  
	                                 
	                            
	                                 
	                                
	                     
	                      
	 
	                                           
	              
	              
	                          
	                             
	                                                                
	 
	
	
	
	var Draggable3DScene = React.createClass({displayName: "Draggable3DScene",
	  propTypes: {
	    dim: React.PropTypes.number.isRequired,
	    highlightW: React.PropTypes.func.isRequired,
	    pointClasses: React.PropTypes.array.isRequired,
	    projectedError: React.PropTypes.func.isRequired
	  },
	
	  getInitialState: function()        {
	    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 10 ); // Field of view, aspect ratio, near clip, far clip
	    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
	    initialCamera.position.z = 0.75;
	
	
	    var initialRenderer = new THREE.WebGLRenderer({antialias: true});
	    initialRenderer.setClearColor( 0x111111, 1 );
	
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
	
	  componentWillMount: function() {
	    this.state.renderer.setSize( this.props.dim, this.props.dim );
	    this.updateCamera(this.state);
	  },
	
	  componentDidMount: function() {
	    this.refs.container.getDOMNode().appendChild(this.state.renderer.domElement);
	    this.state.renderer.render(this.state.scene, this.state.camera);
	  },
	
	  componentWillUpdate: function(nextProps       , nextState        )       {
	    if (typeof nextState !== "undefined" && nextState !== null) {
	      this.updateCamera(nextState);
	    }
	  },
	
	  updateCamera: function(state       )       {
	    this.state.camera.position.x = Math.cos(state.angle) * 0.75;
	    this.state.camera.position.y = Math.sin(state.angle) * 0.75;
	    this.state.camera.lookAt(new THREE.Vector3(0, 0, 0));
	  },
	
	  mouseDown: function(e                      )       {
	    var intersections = this.raycast(this.state.camera, e).intersectObjects(this.state.scene.children);
	    if (intersections.length > 0){ // try to drag
	      this.setState({
	        mouseDownCamera: this.state.camera.clone(),
	        mouseDownPoint: intersections[0].point
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
	
	  handleHover: function(e                      )       {
	    var intersections = this.raycast(this.state.camera, e).intersectObjects(this.state.scene.children);
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
	      dim: this.props.dim,
	      pointClasses: this.props.pointClasses,
	      projectedError: this.props.projectedError,
	      scene: this.state.scene
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
	      React.createElement("div", {ref: "container", style: {display: "inline-block"}, 
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

/***/ 95:
/*!*************************************!*\
  !*** ./scripts/ParametricGraph.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var THREE = __webpack_require__(/*! three */ 2);
	
	                                 
	                                           
	              
	                                    
	                                                            
	                                           
	              
	                             
	                                                                
	                      
	                     
	                          
	 
	              
	                    
	 
	
	
	
	var MATERIAL = new THREE.MeshBasicMaterial({
	  side: THREE.DoubleSide,
	  vertexColors: THREE.FaceColors,
	  opacity: 0.8,
	  transparent: true,
	});
	
	
	var ParametricGraph = React.createClass({displayName: "ParametricGraph",
	  propTypes: {
	    colourFunction: React.PropTypes.func,
	    dim: React.PropTypes.number.isRequired,
	    pointClasses: React.PropTypes.array.isRequired,
	    projectedError: React.PropTypes.func.isRequired,
	    rResolution: React.PropTypes.number,
	    scene: React.PropTypes.any.isRequired,
	    thetaResolution: React.PropTypes.number,
	  },
	
	  // 120 * 40 looks great... 4800 computations
	  // 96 * 32
	  // 72 * 24
	  // 36 * 12
	  // 24 * 8 is pretty much a minimum.
	
	  getDefaultProps: function() {
	    return {
	      thetaResolution: 96,
	      rResolution: 32,
	      colourFunction: function(boundingBox, vertex1, vertex2, vertex3, mutableFaceColor)       {
	        var zMin = boundingBox.min.z;
	        var zRange = boundingBox.max.z - zMin;
	        var totalZ = vertex1.z + vertex2.z + vertex3.z;
	        var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
	        mutableFaceColor.setHSL(0.54, 0.8, 0.08 + 0.82 * Math.pow(normalizedZ, 2));
	      }
	    };
	  },
	
	  getInitialState: function()        {
	    return {
	      graph: new THREE.Mesh(this.colourGeometry(this.buildInitialGeometry(this.props)), MATERIAL.clone())
	    };
	  },
	
	  componentWillMount: function() {
	    this.props.scene.add(this.state.graph);
	  },
	
	  componentWillUnmount: function() {
	    this.props.scene.remove(this.state.graph);
	  },
	
	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.pointClasses !== this.props.pointClasses ||
	      nextProps.projectedError !== this.props.projectedError);
	  },
	
	  componentWillReceiveProps: function(nextProps       ) {
	    if (this.shouldComponentUpdate(nextProps)) {
	      var geometry = this.state.graph.geometry;
	
	      for (var i = 0; i < geometry.vertices.length; i = i + 1) {
	        var vertex = geometry.vertices[i];
	        vertex.setZ(nextProps.projectedError(vertex, nextProps.pointClasses));
	      }
	
	      this.colourGeometry(geometry);
	      this.state.graph.geometry.verticesNeedUpdate = true;
	    }
	  },
	
	  buildInitialGeometry: function(props       )                           {
	    var polarMeshFunction = function(i        , j        )                {
	      var theta = i * 2 * Math.PI;
	      var r = (Math.pow(1.8, j * j) - 1) / 400; // this ensures there are lots of samples near the origin and gets close to 0!
	      var x = r * Math.cos(theta) * props.dim;
	      var y = r * Math.sin(theta) * props.dim;
	      var z = props.projectedError({x:x, y:y}, props.pointClasses);
	      return new THREE.Vector3(x, y, z);
	    };
	
	    return new THREE.ParametricGeometry(polarMeshFunction,
	      this.props.thetaResolution, this.props.rResolution, true);
	  },
	
	  colourGeometry: function(graphGeometry                          )                           {
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

/***/ 104:
/*!***********************************!*\
  !*** ./scripts/MaximumMargin.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                                 
	                                             
	                                          
	
	"use strict";
	
	var $__0=    __webpack_require__(/*! ./VectorUtils.jsx */ 170),pointClassesTransform=$__0.pointClassesTransform,dotProduct=$__0.dotProduct,modulus=$__0.modulus;
	
	
	// the objective function is used to generate the surface
	function objective(w    , pointClasses              )         {
	
	  // compute the `margin` for all points in pointClasses
	  var $__0=   pointClasses,class0=$__0[0],class1=$__0[1];
	
	  // var margins = points.map( (point) => -1 * point.t * dotProduct(w, point) ); // -1 fudge
	  var margins0 = class0.map( function(point)  {return dotProduct(w, point);} );
	  var minimumMargin0 = Math.min.apply(null, margins0);
	
	  var margins1 = class1.map( function(point)  {return -1 * dotProduct(w, point);} );
	  var minimumMargin1 = Math.min.apply(null, margins1);
	
	  var minimumMargin = Math.min(minimumMargin0, minimumMargin1);
	  // find the minimum of these
	  // normalise by w.
	  var normalisationFactor = 1 / modulus(w);
	  return normalisationFactor * minimumMargin;
	}
	
	module.exports = {objective:objective};


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
	var $__2=  __webpack_require__(/*! react/addons */ 1).addons,PureRenderMixin=$__2.PureRenderMixin;
	
	
	
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
	      style: {border: "1px solid red"}, onMouseMove: this.mouseMove}, 
	
	        React.createElement("g", {transform: ("translate(" + (this.props.dim / 2) + " " + (this.props.dim / 2) + ")\n          scale(" + 
	(this.props.dim / 2) + " " + (-this.props.dim / 2) + ")")}, 
	
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
	var $__2=  __webpack_require__(/*! react/addons */ 1).addons,PureRenderMixin=$__2.PureRenderMixin;
	
	
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

/***/ 228:
/*!************************************!*\
  !*** ./data/awesomePointGroups.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = [{"label":0,"points":[{"x":-0.5997479449727805,"y":0.3266696424458529},{"x":-0.40911978879586314,"y":0.8414896852756555},{"x":-0.6003797969565033,"y":0.38752330824897496},{"x":-0.5974989282403006,"y":0.16793046373201084},{"x":-0.3731116894435043,"y":0.25446221414788783},{"x":-0.4611574437563745,"y":0.7513580834354632},{"x":-0.5666119173059607,"y":0.1786999017955041},{"x":-0.2660309178401766,"y":0.7466422175867058},{"x":-0.45781364583698203,"y":-0.02543721371721755},{"x":-0.7637313902662306,"y":0.8401606006403106},{"x":-0.6719389189432546,"y":-0.3705455189155673},{"x":-0.7724832708046918,"y":-0.20005680566395434},{"x":-0.6921484832633631,"y":0.027283867565444403},{"x":-0.530968122206404,"y":0.795008094328021},{"x":-0.8273452458511434,"y":-0.002424446162095889},{"x":-0.5185588104892703,"y":0.4620006701485645},{"x":-0.7023706476095739,"y":-0.15958155170093186},{"x":-0.8186378396018115,"y":0.23211487091509184},{"x":-0.5665597344525202,"y":0.524761380696566}],"generatedBy":{"center":{"x":-0.5966666666666667,"y":0.19666666666666655},"params":{"l":0.8658457650695586,"theta":-0.17021192528547435}},"mouseDownDiff":null},{"points":[{"x":0.4163818674864531,"y":-0.23528659967706647},{"x":0.44437265613239896,"y":-0.32627143782971557},{"x":0.23942084809958375,"y":-0.6063253418870334},{"x":0.20789742517139406,"y":-0.4091351995003449},{"x":0.2859242354507277,"y":-0.628035096817553},{"x":0.4479649125412124,"y":-0.32415304169593623},{"x":0.45280865076218857,"y":-0.28336832097127984},{"x":0.4075665078010422,"y":-0.39443831290755565},{"x":0.41222269797067723,"y":-0.5769874083755533},{"x":0.3604938339252303,"y":-0.6174488199442758},{"x":0.32403805174279,"y":-0.4848541835691167},{"x":0.34868895341495887,"y":-0.5032884333079499},{"x":0.5243233489148638,"y":-0.20416220785332426},{"x":0.2691046775763215,"y":-0.5310206893985944}],"label":1,"generatedBy":{"center":{"x":0.36999999999999966,"y":-0.3666666666666666},"params":{"l":0.16719914938645886,"theta":1.1606689862534059}},"mouseDownDiff":null},{"label":1,"points":[{"x":0.6660524477396749,"y":0.08876441212498268},{"x":0.6803536514830696,"y":0.16701383499073325},{"x":0.5737262476146427,"y":0.09345571376890369},{"x":0.740243418325372,"y":0.21788967786543098},{"x":0.5723510298190286,"y":-0.048872997526596906},{"x":0.7230819188867843,"y":0.021448199402366697},{"x":0.801222820812387,"y":0.16978847488949483},{"x":0.703671157000718,"y":-0.09675544323096463},{"x":0.5828143995173792,"y":-0.021816106911635158},{"x":0.610639172868958,"y":-0.020054843756927843},{"x":0.43240212272182954,"y":-0.10731745449670954},{"x":0.4766009580339221,"y":-0.04283729687880106},{"x":0.8295860086096446,"y":0.17175194897798224},{"x":0.6763934813675491,"y":0.20435599390510958},{"x":0.6764534988724937,"y":0.1631264448161256}],"generatedBy":{"center":{"x":0.6364731932586679,"y":0.05456092271332935},"params":{"l":0.2054371382466992,"theta":1.000694039631934}},"mouseDownDiff":null}];


/***/ },

/***/ 229:
/*!*******************************!*\
  !*** ./scripts/Immersive.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                                 
	                                           
	                 
	                
	                    
	                
	               
	                                       
	    
	                     
	  
	              
	                               
	                   
	 
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var AwesomeDataComponent = __webpack_require__(/*! ./AwesomeDataComponent.jsx */ 225);
	
	var CursorSphere = __webpack_require__(/*! ./CursorSphere.jsx */ 89);
	var Draggable3DScene = __webpack_require__(/*! ./Draggable3DScene.jsx */ 92);
	var MaximumMargin = __webpack_require__(/*! ./MaximumMargin.jsx */ 104);
	var ParametricGraph = __webpack_require__(/*! ./ParametricGraph.jsx */ 95);
	var React = __webpack_require__(/*! react/addons */ 1);
	
	
	var Immersive = React.createClass({displayName: "Immersive",
	  getInitialState: function()        {
	    return {
	      pointGroups: __webpack_require__(/*! ../data/awesomePointGroups.js */ 228),
	      highlightedW: {x: 0.2, y: 0.2},
	    };
	  },
	
	  updatePointGroups: function(pointGroups                 )       {
	    this.setState({pointGroups:pointGroups});
	  },
	
	  computePointClasses: function()               {
	    return [0, 1].map(function(l)  {return this.state.pointGroups
	          .reduce(function(acc, pg)  {return pg.label === l ? acc.concat(pg.points) : acc;}, []);}.bind(this));
	  },
	
	  highlightW: function(highlightedW    ) {
	    this.setState({highlightedW:highlightedW});
	  },
	
	  render: function()                {
	    return (
	      React.createElement("div", null, 
	        React.createElement(AwesomeDataComponent, {dim: 500, 
	          updatePointGroups: this.updatePointGroups, pointGroups: this.state.pointGroups}), 
	
	
	        React.createElement(Draggable3DScene, {dim: 500, pointClasses: this.computePointClasses(), 
	            projectedError: MaximumMargin.objective, highlightW: this.highlightW}, 
	
	          React.createElement(ParametricGraph, {thetaResolution: 120, rResolution: 40}), 
	          React.createElement(CursorSphere, {highlightedW: this.state.highlightedW})
	
	        )
	
	
	      )
	    );
	  }
	});
	
	module.exports = Immersive;


/***/ }

});
//# sourceMappingURL=bundle.js.map