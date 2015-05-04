webpackJsonp([0],{

/***/ 0:
/*!***************************!*\
  !*** ./scripts/Entry.jsx ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var Article = __webpack_require__(/*! ./Article.jsx */ 5);
	
	window.React = React;
	
	React.render(React.createElement(Article, null), document.body);


/***/ },

/***/ 5:
/*!*****************************!*\
  !*** ./scripts/Article.jsx ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var HR = __webpack_require__(/*! ./HR.jsx */ 23);
	
	var Header = __webpack_require__(/*! ./Header.jsx */ 24);
	var BinaryClassifierSection = __webpack_require__(/*! ./BinaryClassifierSection.jsx */ 25);
	var PerceptronSection = __webpack_require__(/*! ./PerceptronSection.jsx */ 26);
	var ObjectiveFunctionSection = __webpack_require__(/*! ./ObjectiveFunctionSection.jsx */ 27);
	var LogisticRegressionSection = __webpack_require__(/*! ./LogisticRegressionSection.jsx */ 28);
	var MaximumMarginSection = __webpack_require__(/*! ./MaximumMarginSection.jsx */ 29);
	
	
	var Article = React.createClass({displayName: "Article",
	  render: function()                {
	    return (
	      React.createElement("div", {className: "main-page", style: {fontSize: "22px",
	        fontFamily: "Georgia, Cambria, 'Times New Roman'",
	        color: "rgba(0, 0, 0, 0.8)",
	        letterSpacing: "0.16px",
	        display: "flex",
	        flexDirection: "column",
	        alignItems: "center"}}, 
	
	        React.createElement(Header, null), 
	        React.createElement(HR, null), 
	
	        React.createElement("div", {style: {width: "700px",
	        lineHeight: "31px",
	        paddingBottom: "10em"}}, 
	
	          React.createElement(BinaryClassifierSection, null), 
	          React.createElement(HR, null), 
	
	          React.createElement(PerceptronSection, null), 
	          React.createElement(HR, null), 
	
	          React.createElement(ObjectiveFunctionSection, null), 
	          React.createElement(HR, null), 
	
	          React.createElement(LogisticRegressionSection, null), 
	          React.createElement(HR, null), 
	
	          React.createElement(MaximumMarginSection, null)
	        )
	      )
	    );
	  }
	});
	
	module.exports = Article;


/***/ },

/***/ 23:
/*!************************!*\
  !*** ./scripts/HR.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	
	
	var HR = React.createClass({displayName: "HR",
	  render: function()                {
	    return React.createElement("hr", {style: {width: "100px",
	      borderWidth: "1px 0 0 0",
	      opacity: 0.5,
	      margin: "2em auto 2em auto"}});
	  }
	});
	
	
	module.exports = HR;


/***/ },

/***/ 24:
/*!****************************!*\
  !*** ./scripts/Header.jsx ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	
	
	var Header = React.createClass({displayName: "Header",
	  render: function()                {
	    return (
	      React.createElement("div", {className: "title-page", style: {width: "100%",
	        padding: "10px 0",
	        display: "flex",
	        justifyContent: "center",
	      }}, 
	        React.createElement("h2", {style: {width: "600px",
	          textAlign: "center",
	          lineHeight: "45px",
	          marginTop: "3em"}}, 
	          React.createElement("span", {style: {fontFamily: "Lucida Grande",
	            fontSize: "60px",
	            letterSpacing: "-2.4px"}}, "Understanding Machine Learning"), 
	          React.createElement("small", {style: {display: "block",
	            paddingTop: "2em",
	            fontStyle: "italic",
	            fontSize: "22px",
	            fontFamily: "Georgia, Cambria, 'Times New Roman'",
	            fontWeight: "normal"}}, "with Linear Classifiers")
	        )
	      )
	    );
	  }
	});
	
	
	module.exports = Header;


/***/ },

/***/ 25:
/*!*********************************************!*\
  !*** ./scripts/BinaryClassifierSection.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var K = __webpack_require__(/*! ./Katex.jsx */ 80);
	
	
	
	var BinaryClassifierSection = React.createClass({displayName: "BinaryClassifierSection",
	  render: function()                {
	    return (
	      React.createElement("div", {style: {
	        display: "flex",
	        flexDirection: "column",
	        alignItems: "center"}}, 
	
	        React.createElement("p", {style: {width: "100%"}}, 
	        "A ", React.createElement("em", null, "binary classifier"), " is something that" + ' ' +
	        "can learn how to put unseen objects into one of two classes based on examples" + ' ' +
	        "that are already in those classes."
	        ), 
	
	        React.createElement("img", {src: "http://i.imgur.com/BGPlM09.jpg", style: {maxWidth: "60%", margin: "1em"}}), 
	
	        React.createElement("p", null, 
	        "Linear classifiers accept objects represented as vectors," + ' ' +
	        "e.g. ", React.createElement(K, {tex: "[10, -3, 0, 4]"}), " and" + ' ' +
	        "make their decisions using a linear function of the input vector."
	        ), 
	
	        React.createElement("p", null, 
	        "If our objects are" + ' ' +
	        "one-dimensional, the decision boundary is just a single number." + ' ' +
	        "Everything on one side gets put in one class" + ' ' +
	        "and everything on the other side goes in the other. In two" + ' ' +
	        "dimensions, it's a line and in three dimensions, the decision" + ' ' +
	        "boundary is a plane."
	        ), 
	
	        React.createElement("img", {src: "http://i.imgur.com/jZg6nCx.jpg", style: {maxWidth: "120%", margin: "1em"}}), 
	
	        React.createElement("p", null, 
	        "Since the boundary is a hyperplane, we can represent it by a normal" + ' ' +
	        "vector, ", React.createElement(K, null, "n"), "," + ' ' +
	        "and an offset vector, ", React.createElement(K, null, "c"), ".  In practice, it's convenient" + ' ' +
	        "to add one fake dimension (with value 1) to every object in our data because" + ' ' +
	        "this lets us define the same hyperplane using just one vector." + ' ' +
	        "This is called ", React.createElement("em", null, "homogeneous form"), "."), 
	
	        React.createElement("img", {src: "http://i.imgur.com/XaHtzYx.jpg", style: {maxWidth: "50%", margin: "1em"}}), 
	
	        React.createElement("p", null, "Our classifier can then use this" + ' ' +
	        "vector ", React.createElement(K, null, "n"), " to decide the" + ' ' +
	        "class for an unseen vector ", React.createElement(K, null, "x = [x_1, x_2]"), ". It" + ' ' +
	        "computes ", React.createElement(K, {tex: "[x_1, x_2, 1] \\cdot n"}), " and" + ' ' +
	        "if the result is positive," + ' ' +
	        "returns class A, otherwise it returns class B."), 
	
	        React.createElement("p", null, "The question is, how can we learn the value of the" + ' ' +
	        "vector n from our training examples?")
	      )
	    );
	  }
	});
	
	module.exports = BinaryClassifierSection;


/***/ },

/***/ 26:
/*!***************************************!*\
  !*** ./scripts/PerceptronSection.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                                 
	              
	                    
	                 
	 
	
	var Hyperplane = __webpack_require__(/*! ./Hyperplane.jsx */ 81);
	var Perceptron = __webpack_require__(/*! ./Perceptron.jsx */ 82);
	var React = __webpack_require__(/*! react/addons */ 1);
	var SimpleHyperplaneVis = __webpack_require__(/*! ./SimpleHyperplaneVis.jsx */ 83);
	
	var INITIAL_POINTS = __webpack_require__(/*! ../data/points.js */ 84);
	var INITIAL_W = {x: 80, y: 60};
	var perceptronSteps           = Perceptron.optimise(INITIAL_W, INITIAL_POINTS);
	
	
	
	var PerceptronSection = React.createClass({displayName: "PerceptronSection",
	  getInitialState: function()        {
	    return {
	      nextStep: null, // null implies animation isn't started.
	      timer: null
	    };
	  },
	
	  componentDidMount: function() {
	    window.addEventListener("scroll", this.onScroll, false);
	  },
	
	  componentWillUnmount: function() {
	    window.removeEventListener("scroll", this.onScroll, false);
	    clearTimeout(this.state.timer);
	  },
	
	  onScroll: function() {
	    if (this.state.nextStep === null) {
	      var el = React.findDOMNode(this.refs.container);
	      var $__0=   el.getBoundingClientRect(),top=$__0.top,bottom=$__0.bottom;
	      var isVisible = (top >= 0) && (bottom <= window.innerHeight);
	
	      if (isVisible) {
	        this.startAnimation();
	      }
	    }
	  },
	
	  startAnimation: function() {
	    clearTimeout(this.state.timer);
	    this.setState({
	      nextStep: 0,
	      timer: setInterval(this.advanceStep, 800)
	    });
	  },
	
	  advanceStep: function() {
	    if (this.state.nextStep === perceptronSteps.length) {
	      clearTimeout(this.state.timer);
	    } else {
	      this.setState({nextStep: 1 + this.state.nextStep});
	    }
	  },
	
	  render: function()                {
	
	    return (React.createElement("div", {style: {
	        display: "flex",
	        flexDirection: "column",
	        alignItems: "center"}}, 
	      React.createElement("h2", null, "The Perceptron"), 
	      React.createElement("p", null, "A good idea would be to look through all our known training data" + ' ' +
	      "and find a hyperplane that classifies them all correctly.  The", 
	      React.createElement("em", null, " Perceptron"), " algorithm does exactly this."), 
	
	      React.createElement("code", null, 
	      "Initialize vector w", React.createElement("br", null), 
	      "cycle through points", React.createElement("br", null), 
	      "if w classifies a point x incorrectly, subtract x from w.", React.createElement("br", null), 
	      "repeat until w makes no mistakes"
	      ), 
	
	      React.createElement("div", {ref: "container"}, 
	        React.createElement(SimpleHyperplaneVis, {dim: 400, highlightW: function() {}, pointClasses: INITIAL_POINTS}, 
	           this.state.nextStep && React.createElement(Hyperplane, {w: perceptronSteps[this.state.nextStep - 1], dim: 400})
	        ), 
	        React.createElement("div", null, 
	          React.createElement("button", {onClick: this.startAnimation}, "Start again")
	        )
	      ), 
	
	      React.createElement("p", null, "The perceptron is not perfect however.  Since it can choose any" + ' ' +
	      "hyperplane that makes no mistakes, it will sometimes give you one that" + ' ' +
	      "performs badly in the real world. "), 
	
	
	      React.createElement("img", {src: "http://i.imgur.com/QlNAio9.jpg", style: {maxWidth: "70%", margin: "1em"}}), 
	
	      React.createElement("p", null, "Also, if there are no hyperplanes that separate the two classes," + ' ' +
	      "the perceptron algorithm freaks out. (Note that Voted / Averaged Perceptrons" + ' ' +
	      "can help this.")
	    ));
	  }
	});
	
	module.exports = PerceptronSection;


/***/ },

/***/ 27:
/*!**********************************************!*\
  !*** ./scripts/ObjectiveFunctionSection.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                                 
	
	
	var CursorSphere = __webpack_require__(/*! ./CursorSphere.jsx */ 85);
	var Default2DVis = __webpack_require__(/*! ./Default2DVis.jsx */ 86);
	var DisplayWNumbers = __webpack_require__(/*! ./DisplayWNumbers.jsx */ 87);
	var Draggable3DScene = __webpack_require__(/*! ./Draggable3DScene.jsx */ 88);
	var K = __webpack_require__(/*! ./Katex.jsx */ 80);
	var OptimiserLine = __webpack_require__(/*! ./OptimiserLine.jsx */ 89);
	var ParametricGraph = __webpack_require__(/*! ./ParametricGraph.jsx */ 90);
	var React = __webpack_require__(/*! react/addons */ 1);
	var ReplacePointsBar = __webpack_require__(/*! ./ReplacePointsBar.jsx */ 91);
	var $__0=   __webpack_require__(/*! ./Perceptron.jsx */ 82),objective=$__0.objective,optimise=$__0.optimise;
	
	
	
	var PerceptronVis = React.createClass({displayName: "PerceptronVis",
	  getInitialState: function()                      {
	    return {
	      highlightedW: null,
	      pointClasses: __webpack_require__(/*! ../data/points.js */ 84),
	    };
	  },
	
	  highlightW: function(point    )       {
	    this.setState({highlightedW: point});
	  },
	
	  updatePointClasses: function(newPointClasses                        )       {
	    this.setState({pointClasses: newPointClasses});
	  },
	
	  render: function() {
	    var dim = 400;
	
	    var optimiserLine;
	    if (typeof this.state.highlightedW !== "undefined" &&
	       this.state.highlightedW !== null) {
	      optimiserLine = optimise(this.state.highlightedW, this.state.pointClasses);
	    }
	
	    return React.createElement("div", {style: {width: "850px"}}, 
	      React.createElement("div", {style: {display: "flex", justifyContent: "space-between"}}, 
	
	        React.createElement("div", {style: {position: "relative"}}, 
	          React.createElement(Default2DVis, {dim: dim, pointClasses: this.state.pointClasses, 
	            highlightW: this.highlightW, optimiserLine: optimiserLine, 
	            highlightedW: this.state.highlightedW, updatePointClasses: this.updatePointClasses}), 
	
	          React.createElement(ReplacePointsBar, {callback: this.updatePointClasses, 
	            style: {position: "absolute", bottom: 0, left: 0}})
	        ), 
	
	        React.createElement(Draggable3DScene, {dim: dim, pointClasses: this.state.pointClasses, 
	            projectedError: objective, highlightW: this.highlightW}, 
	          React.createElement(ParametricGraph, {thetaResolution: 120, rResolution: 20}), 
	          optimiserLine && React.createElement(OptimiserLine, {vertices: optimiserLine}), 
	          this.state.highlightedW && React.createElement(CursorSphere, {highlightedW: this.state.highlightedW})
	        )
	      ), 
	
	      React.createElement("div", null, 
	         this.state.highlightedW && React.createElement(DisplayWNumbers, {w: this.state.highlightedW})
	      )
	    );
	  }
	});
	
	
	
	
	
	var ObjectiveFunctionSection = React.createClass({displayName: "ObjectiveFunctionSection",
	  render: function()                {
	    return (React.createElement("div", {style: {
	        display: "flex",
	        flexDirection: "column",
	        alignItems: "center"}}, 
	
	      React.createElement("h2", null, "Objective Functions"), 
	
	      React.createElement("p", null, "How can we choose a better ", React.createElement(K, null, "w"), "?  From" + ' ' +
	      "eyeballing a few possibilities, it's clear" + ' ' +
	      "which ones will be good and which will be bad, but we need some way to quantify this."), 
	
	      React.createElement("img", {src: "http://i.imgur.com/Ds0JJjb.jpg", style: {maxWidth: "100%", margin: "1em"}}), 
	
	      React.createElement("p", null, 
	      "An ", React.createElement("em", null, "objective function"), " can" + ' ' +
	      "compute a score for each potential" + ' ' +
	      "vector ", React.createElement(K, null, "w"), " so" + ' ' +
	      "that we can automatically choose the best one.  The blue pie-shape on the right" + ' ' +
	      "shows the value of the perceptron objective for all the possible choices of the" + ' ' +
	      "vector ", React.createElement(K, null, "w"), ".  Hover over the graph on the" + ' ' +
	      "left to see what one particular choice" + ' ' +
	      "of ", React.createElement(K, null, "w"), " looks like."), 
	
	      React.createElement(PerceptronVis, null), 
	
	      React.createElement("p", null, "As you can see from the right hand diagram, there are a large" + ' ' +
	      "number of possibilities for the" + ' ' +
	      "vector ", React.createElement(K, null, "w"), " that all share the maximum objective" + ' ' +
	      "function.")
	    ));
	  }
	});
	
	module.exports = ObjectiveFunctionSection;


/***/ },

/***/ 28:
/*!***********************************************!*\
  !*** ./scripts/LogisticRegressionSection.jsx ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                                 
	
	var CursorSphere = __webpack_require__(/*! ./CursorSphere.jsx */ 85);
	var Default2DVis = __webpack_require__(/*! ./Default2DVis.jsx */ 86);
	var DisplayWNumbers = __webpack_require__(/*! ./DisplayWNumbers.jsx */ 87);
	var Draggable3DScene = __webpack_require__(/*! ./Draggable3DScene.jsx */ 88);
	var K = __webpack_require__(/*! ./Katex.jsx */ 80);
	var OptimiserLine = __webpack_require__(/*! ./OptimiserLine.jsx */ 89);
	var WebWorkerGraph = __webpack_require__(/*! ./WebWorkerGraph.jsx */ 92);
	var React = __webpack_require__(/*! react/addons */ 1);
	var $__0=    __webpack_require__(/*! ./LogisticRegression.jsx */ 93),objective=$__0.objective,optimise=$__0.optimise,fastOptimise=$__0.fastOptimise;
	
	
	
	var LogisticRegressionVis = React.createClass({displayName: "LogisticRegressionVis",
	  getInitialState: function()                      {
	    return {
	      highlightedW: null,
	      pointClasses: __webpack_require__(/*! ../data/closePoints.js */ 94),
	    };
	  },
	
	  highlightW: function(point    )       {
	    this.setState({highlightedW: point});
	  },
	
	  updatePointClasses: function(newPointClasses                        )       {
	    this.setState({pointClasses: newPointClasses});
	  },
	
	  render: function() {
	    var dim = 500;
	
	    var optimiserLine;
	    if (typeof this.state.highlightedW !== "undefined" &&
	       this.state.highlightedW !== null) {
	      optimiserLine = optimise(this.state.highlightedW, this.state.pointClasses);
	    }
	
	    var colourFunction = (function(boundingBox, vertex1, vertex2, vertex3, mutableFaceColor)       {
	      var zMin = boundingBox.min.z;
	      var zRange = boundingBox.max.z - zMin;
	      var totalZ = vertex1.z + vertex2.z + vertex3.z;
	      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
	
	      var stops = fastOptimise(vertex1, this.state.pointClasses) / 250; // should match MAX_STOPS
	
	      mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
	    }).bind(this);
	
	    return React.createElement("div", {style: {width: "1000px"}}, 
	      React.createElement("div", {style: {display: "flex", justifyContent: "space-between"}}, 
	
	        React.createElement(Default2DVis, {dim: dim, pointClasses: this.state.pointClasses, 
	          highlightW: this.highlightW, optimiserLine: optimiserLine, 
	          highlightedW: this.state.highlightedW, updatePointClasses: this.updatePointClasses}), 
	
	        React.createElement(Draggable3DScene, {dim: dim, pointClasses: this.state.pointClasses, 
	            projectedError: objective, highlightW: this.highlightW}, 
	          React.createElement(WebWorkerGraph, {thetaResolution: 24, rResolution: 8}), 
	          optimiserLine && React.createElement(OptimiserLine, {vertices: optimiserLine}), 
	          this.state.highlightedW && React.createElement(CursorSphere, {highlightedW: this.state.highlightedW})
	        )
	      ), 
	
	      React.createElement("div", null, 
	         this.state.highlightedW && React.createElement(DisplayWNumbers, {w: this.state.highlightedW})
	      )
	    );
	  }
	});
	
	
	
	
	
	
	var LogisticRegressionSection = React.createClass({displayName: "LogisticRegressionSection",
	  render: function()                {
	    return (React.createElement("div", {style: {
	        display: "flex",
	        flexDirection: "column",
	        alignItems: "center"}}, 
	      React.createElement("h2", null, "Logistic Regression"), 
	
	      React.createElement("p", {style: {width: "100%"}}, "Let's try a probability based model." + ' ' +
	      "It would be great if we knew: "), 
	
	      React.createElement("ul", null, 
	        React.createElement("li", null, "the probablity that a vector ", React.createElement(K, null, "x"), " was in" + ' ' +
	        "one class, ", React.createElement(K, {tex: "p(C_1|x)"})), 
	        React.createElement("li", null, "and the probability that it's in" + ' ' +
	        "the other class, ", React.createElement(K, {tex: "p(C_2|x)"}))
	      ), 
	
	      React.createElement("p", {style: {width: "100%"}}, "Because if we did, we could just pick whichever was bigger, ie:"), 
	
	      React.createElement("ul", {style: {listStyle: "none"}}, 
	      React.createElement("li", null, 
	        React.createElement(K, {tex: "log \\frac{ p(C_1|x) }{ p(C_2|x) } > 0 ~~~ \\rightarrow ~~"}), 
	        "return ", React.createElement(K, null, "x"), " in ", React.createElement(K, {tex: "C_1"})
	      ), 
	      React.createElement("li", null, 
	        React.createElement(K, {tex: "log \\frac{ p(C_1|x) }{ p(C_2|x) } < 0 ~~~ \\rightarrow ~~"}), 
	        "return ", React.createElement(K, null, "x"), " in ", React.createElement(K, {tex: "C_2"})
	      )
	      ), 
	
	      React.createElement("p", null, "However, since we're trying to create a linear model, we need to" + ' ' +
	      "express ", React.createElement(K, {tex: "log \\frac{ p(C_1|x) }{ p(C_2|x) }"}), " as some weight" + ' ' +
	      "vector multiplied by our" + ' ' +
	      "test vector, ", React.createElement(K, null, "w \\cdot x"), ". "), 
	
	      React.createElement(K, {tex: "y(x) = log \\frac{ p(C_1|x) }{ p(C_2|x) } = w{\\cdot}x"}), 
	
	
	      React.createElement("p", {style: {width: "100%"}}, 
	        React.createElement("strong", null, 
	        "How should we find a good value of ", React.createElement(K, null, "w"), "?"), " Since" + ' ' +
	        "we're using a probabilistic model, it makes sense to choose" + ' ' +
	        "a ", React.createElement(K, null, "w"), " that maximises the likelihood of seeing the training data (MLE)." + ' ' +
	        "??!?!?!"
	      ), 
	
	      React.createElement(K, {tex: "- \\displaystyle \\sum _i log ~ p(C_1 | x_i)^{y_i} p(C_2 | x_i)^{1 - y_i} "}), 
	
	      React.createElement("p", null, "In order to compute this, we need an expression" + ' ' +
	      "for ", React.createElement(K, null, "p(C_1|x_i)"), ". Luckily, we can re-arrange the equation" + ' ' +
	      "for ", React.createElement(K, null, "y(x)"), " above:"), 
	
	      React.createElement(K, {tex: "\\Rightarrow p(C_1|x) =" + ' ' +
	      "\\sigma(w{\\cdot}x) =" + ' ' +
	      "\\Large \\frac{ 1 }{ 1 + e^{w \\cdot x} }"}), 
	
	      React.createElement("p", null, "Rearranging a bit, we can now compute a useful 'score' for any" + ' ' +
	      "particular ", React.createElement(K, null, "w"), " that we want to try out:"), 
	
	      React.createElement("p", null, 
	        React.createElement(K, {tex: "\\displaystyle -\\sum _i ~ y_i " +
	          "log( \\sigma(w \\cdot x_i) ) + ( 1 - y_i ) log( 1 - \\sigma ( w \\cdot x_i ) )"})
	      ), 
	
	      React.createElement(LogisticRegressionVis, null), 
	
	      React.createElement("p", null, 
	        "(", React.createElement("a", {href: "https://www.cs.ox.ac.uk/" +
	        "teaching/materials13-14/machinelearning/lecture_logistic_regression.pdf"}, "slide 7, set 5"), ")"), 
	
	      React.createElement("p", null, "algorithm: gradient descent to find best.yay.." + ' ' +
	      "criticism of logistic regression (???)")
	    ));
	  }
	});
	
	module.exports = LogisticRegressionSection;


/***/ },

/***/ 29:
/*!******************************************!*\
  !*** ./scripts/MaximumMarginSection.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                                 
	
	var CursorSphere = __webpack_require__(/*! ./CursorSphere.jsx */ 85);
	var DisplayWNumbers = __webpack_require__(/*! ./DisplayWNumbers.jsx */ 87);
	var Draggable3DScene = __webpack_require__(/*! ./Draggable3DScene.jsx */ 88);
	var Hyperplane = __webpack_require__(/*! ./Hyperplane.jsx */ 81);
	var K = __webpack_require__(/*! ./Katex.jsx */ 80);
	var MaximumMargin = __webpack_require__(/*! ./MaximumMargin.jsx */ 95);
	var ParametricGraph = __webpack_require__(/*! ./ParametricGraph.jsx */ 90);
	var React = __webpack_require__(/*! react/addons */ 1);
	var ReplacePointsBar = __webpack_require__(/*! ./ReplacePointsBar.jsx */ 91);
	var SimpleHyperplaneVis = __webpack_require__(/*! ./SimpleHyperplaneVis.jsx */ 83);
	
	
	
	var MaxMarginVis = React.createClass({displayName: "MaxMarginVis",
	  getInitialState: function()                      {
	    return {
	      highlightedW: null,
	      pointClasses: __webpack_require__(/*! ../data/closePoints.js */ 94),
	    };
	  },
	
	  highlightW: function(point    )       {
	    this.setState({highlightedW: point});
	  },
	
	  updatePointClasses: function(newPointClasses                        )       {
	    this.setState({pointClasses: newPointClasses});
	  },
	
	  render: function() {
	    var dim = 400;
	    return React.createElement("div", {style: {width: "850px"}}, 
	      React.createElement("div", {style: {display: "flex", justifyContent: "space-between"}}, 
	
	        React.createElement("div", {style: {position: "relative"}}, 
	          React.createElement(SimpleHyperplaneVis, {dim: dim, pointClasses: this.state.pointClasses, 
	            highlightW: this.highlightW}, 
	             this.state.highlightedW && React.createElement(Hyperplane, {w: this.state.highlightedW, dim: dim})
	          ), 
	
	          React.createElement(ReplacePointsBar, {callback: this.updatePointClasses, 
	            style: {position: "absolute", bottom: 0, left: 0}})
	        ), 
	
	        React.createElement(Draggable3DScene, {dim: dim, pointClasses: this.state.pointClasses, 
	            projectedError: MaximumMargin.objective, highlightW: this.highlightW}, 
	          React.createElement(ParametricGraph, {thetaResolution: 120, rResolution: 40}), 
	          this.state.highlightedW && React.createElement(CursorSphere, {highlightedW: this.state.highlightedW})
	        )
	      ), 
	
	      React.createElement("div", null, 
	         this.state.highlightedW && React.createElement(DisplayWNumbers, {w: this.state.highlightedW})
	      )
	    );
	  }
	});
	
	
	
	var MaximumMarginSection = React.createClass({displayName: "MaximumMarginSection",
	  render: function()                {
	    return (React.createElement("div", {style: {
	        display: "flex",
	        flexDirection: "column",
	        alignItems: "center"}}, 
	      React.createElement("h2", null, "Maximum Margin (SVM)"), 
	
	      React.createElement("p", null, "[objective function]", 
	      React.createElement("a", {href: "https://www.cs.ox.ac.uk/teaching/materials13-14/machinelearning/lecture_lsvm.pdf"}, 
	      "Slide 9")), 
	
	      React.createElement("p", null, 
	        React.createElement(K, {tex: "argmax_w \\{ \\frac{||w||^2}{2} \\}"})
	      ), 
	      React.createElement("p", null, 
	        React.createElement(K, {tex: "s.t. ~~~~ y_i  ( w \\cdot x_i ) \\geq 1, ~~~~ \\forall i"})
	      ), 
	
	      React.createElement(MaxMarginVis, null), 
	
	      React.createElement("p", null, "Describe lagrangian/KKT method for solving this (?!?! needs work to understand this)")
	    ));
	  }
	});
	
	module.exports = MaximumMarginSection;


/***/ },

/***/ 80:
/*!***************************!*\
  !*** ./scripts/Katex.jsx ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var katex = __webpack_require__(/*! katex */ 3);
	
	
	var Katex = React.createClass({displayName: "Katex",
	  render: function()                {
	    var tex = this.props.tex || this.props.children;
	    var math = katex.renderToString(tex);
	    return (
	      React.createElement("span", {dangerouslySetInnerHTML: {__html: math}})
	    );
	  }
	});
	
	module.exports = Katex;


/***/ },

/***/ 81:
/*!********************************!*\
  !*** ./scripts/Hyperplane.jsx ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var Line = __webpack_require__(/*! ./Line.jsx */ 168);
	var React = __webpack_require__(/*! react/addons */ 1);
	var $__0=  __webpack_require__(/*! react/addons */ 1).addons,PureRenderMixin=$__0.PureRenderMixin;
	
	
	var Hyperplane = React.createClass({displayName: "Hyperplane",
	  mixins: [PureRenderMixin],
	
	  propTypes: {
	    w: React.PropTypes.object.isRequired,
	    dim: React.PropTypes.number.isRequired
	  },
	
	  render: function()                {
	    var $__0=   this.props.w,x=$__0.x,y=$__0.y;
	    return React.createElement("g", null, 
	      React.createElement("path", {d: ("M 0 0 L " + x + " " + y), strokeWidth: "1.5", stroke: "rgba(255, 0, 0, 0.4)"}), 
	      React.createElement(Line, {w: {x:x, y:y}, dim: this.props.dim})
	    );
	  }
	});
	
	module.exports = Hyperplane;


/***/ },

/***/ 82:
/*!********************************!*\
  !*** ./scripts/Perceptron.jsx ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	                                 
	                                          
	
	var $__0=       __webpack_require__(/*! ./VectorUtils.jsx */ 169),add=$__0.add,scale=$__0.scale,pointClassesTransform=$__0.pointClassesTransform,classify=$__0.classify,classTransform=$__0.classTransform,dotProduct=$__0.dotProduct;
	
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
	
	  objective: function(w    , pointClasses              )         {
	    var class0 = pointClasses[0].filter(function(p) { return dotProduct(p, w) <= 0; });
	    var class1 = pointClasses[1].filter(function(p) { return dotProduct(p, w) > 0; });
	    var misclassifieds = class0.concat(class1);
	
	    if (misclassifieds.length === 0) {
	      return 100; // incorporates prettiness scaling...
	    } else {
	      return 0;
	    }
	  },
	
	  optimise: function(startWeight    , pointClasses              )            {
	    var trainingData = pointClassesTransform(pointClasses);
	
	    var resultantWeights = [startWeight];
	    for (var epoch = 0; epoch < EPOCHS; epoch = epoch + 1){
	      for (var i = 0; i < trainingData.length; i = i + 1){
	        var trainingVector = trainingData[i];
	        var lastW = resultantWeights[resultantWeights.length - 1];
	        if (classTransform(classify(lastW, trainingVector)) !== trainingVector.t) {
	          // there was a classification error, so we should add or subtract the trainingVector.
	          var nextWeight = add(lastW)(scale(-1 * PERCEPTRON_NU * trainingVector.t)( trainingVector ));
	          resultantWeights.push(nextWeight);
	        }
	      }
	    }
	    return resultantWeights;
	  },
	
	};


/***/ },

/***/ 83:
/*!*****************************************!*\
  !*** ./scripts/SimpleHyperplaneVis.jsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var AllPoints = __webpack_require__(/*! ./AllPoints.jsx */ 170);
	var Axes = __webpack_require__(/*! ./Axes.jsx */ 171);
	var React = __webpack_require__(/*! react/addons */ 1);
	var $__0=  __webpack_require__(/*! react/addons */ 1).addons,PureRenderMixin=$__0.PureRenderMixin;
	
	
	var SimpleHyperplaneVis = React.createClass({displayName: "SimpleHyperplaneVis",
	  mixins: [PureRenderMixin],
	
	  propTypes: {
	    dim: React.PropTypes.number.isRequired,
	    pointClasses: React.PropTypes.array.isRequired,
	    highlightW: React.PropTypes.func.isRequired,
	  },
	
	  mouseMove: function(e                      )       {
	    this.props.highlightW(this.getMouseXY(e));
	  },
	
	  getMouseXY: function(e                      )                         {
	    var $__0=   this.refs.svg.getDOMNode().getBoundingClientRect(),left=$__0.left,top=$__0.top;
	    var x = e.clientX - left;
	    var y = this.props.dim - (e.clientY - top);
	    return {x: x - this.props.dim / 2, y: y - this.props.dim / 2};
	  },
	
	  render: function()                {
	    var style = {background: "#e0e0e0", width: this.props.dim, height: this.props.dim};
	    return (
	      React.createElement("svg", {style: style, ref: "svg", onMouseMove: this.mouseMove}, 
	        React.createElement("g", {transform: "translate(" + this.props.dim / 2 + " " + this.props.dim / 2 + ") scale(1 -1)"}, 
	
	          React.createElement(Axes, {dim: this.props.dim}), 
	          React.createElement(AllPoints, {pointClasses: this.props.pointClasses}), 
	
	           this.props.children
	        )
	      )
	    );
	  }
	});
	
	module.exports = SimpleHyperplaneVis;


/***/ },

/***/ 84:
/*!************************!*\
  !*** ./data/points.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	module.exports = [[{"x":-69.91981426253915,"y":4.750457964837551},{"x":-178.51315699517727,"y":5.177372507750988},{"x":-163.80291180685163,"y":50.880961399525404},{"x":-119.38504232093692,"y":56.0857011936605},{"x":-106.71077957376838,"y":34.54018207266927},{"x":-75.78700138255954,"y":39.27134918048978},{"x":-165.13287061825395,"y":76.93814281374216},{"x":-191.69903602451086,"y":-16.235588025301695},{"x":-97.5,"y":98.703125},{"x":-123.5,"y":89.703125},{"x":-76.5,"y":73.703125},{"x":-53.5,"y":87.703125},{"x":-60.5,"y":39.703125},{"x":-45.5,"y":61.703125},{"x":-85.5,"y":10.703125},{"x":-98.5,"y":-19.296875},{"x":-120.5,"y":-0.296875},{"x":-157.5,"y":36.703125},{"x":-118.5,"y":18.703125},{"x":-119.5,"y":46.703125},{"x":-144.5,"y":3.703125},{"x":-144.5,"y":-24.296875},{"x":-123.5,"y":-16.296875},{"x":-159.5,"y":-16.296875}],[{"x":134.68744903802872,"y":-50.3225514665246},{"x":117.15348390862346,"y":-35.96284864470363},{"x":111.5,"y":-81.296875},{"x":148.5,"y":-89.296875},{"x":125.5,"y":-111.296875},{"x":91.5,"y":-80.296875},{"x":53.5,"y":-79.296875},{"x":97.5,"y":-35.296875},{"x":97.5,"y":-14.296875},{"x":89.5,"y":-13.296875},{"x":128.5,"y":9.703125},{"x":108.5,"y":29.703125},{"x":87.5,"y":6.703125},{"x":104.5,"y":5.703125},{"x":158.5,"y":-7.296875},{"x":131.5,"y":-9.296875},{"x":157.5,"y":-37.296875},{"x":162.5,"y":-9.296875},{"x":64.5,"y":-55.296875},{"x":105.5,"y":-55.296875},{"x":113.5,"y":-71.296875},{"x":85.5,"y":-64.296875},{"x":94.5,"y":-51.296875}]];


/***/ },

/***/ 85:
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
	      sphere: new THREE.Mesh( new THREE.SphereGeometry(3, 32, 32) , new THREE.MeshLambertMaterial() )
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

/***/ 86:
/*!**********************************!*\
  !*** ./scripts/Default2DVis.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var Hyperplane = __webpack_require__(/*! ./Hyperplane.jsx */ 81);
	var Line = __webpack_require__(/*! ./Line.jsx */ 168);
	var React = __webpack_require__(/*! react/addons */ 1);
	var ReplacePointsBar = __webpack_require__(/*! ./ReplacePointsBar.jsx */ 91);
	var SimpleHyperplaneVis = __webpack_require__(/*! ./SimpleHyperplaneVis.jsx */ 83);
	var $__0=  __webpack_require__(/*! react/addons */ 1).addons,PureRenderMixin=$__0.PureRenderMixin;
	
	
	var Default2DVis = React.createClass({displayName: "Default2DVis",
	  mixins: [PureRenderMixin],
	
	  propTypes:{
	    dim: React.PropTypes.number.isRequired,
	    highlightedW: React.PropTypes.object,
	    highlightW: React.PropTypes.func.isRequired,
	    optimiserLine: React.PropTypes.array,
	    pointClasses: React.PropTypes.array.isRequired,
	    updatePointClasses: React.PropTypes.func.isRequired,
	  },
	
	  render: function()                {
	    return React.createElement("div", {style: {position: "relative"}}, 
	      React.createElement(SimpleHyperplaneVis, {dim: this.props.dim, pointClasses: this.props.pointClasses, 
	        highlightW: this.props.highlightW}, 
	
	         this.props.optimiserLine && this.props.optimiserLine.length > 0 &&
	          React.createElement(Line, {w: this.props.optimiserLine[this.props.optimiserLine.length - 1], 
	            style: {stroke: "green", opacity: 0.3}, dim: this.props.dim}), 
	         this.props.highlightedW &&
	          React.createElement(Hyperplane, {w: this.props.highlightedW, dim: this.props.dim})
	
	      ), 
	
	      React.createElement(ReplacePointsBar, {callback: this.props.updatePointClasses, 
	        style: {position: "absolute", bottom: 0, left: 0}})
	    );
	  }
	});
	
	module.exports = Default2DVis;


/***/ },

/***/ 87:
/*!*************************************!*\
  !*** ./scripts/DisplayWNumbers.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var K = __webpack_require__(/*! ./Katex.jsx */ 80);
	var React = __webpack_require__(/*! react/addons */ 1);
	
	var DisplayWNumbers = React.createClass({displayName: "DisplayWNumbers",
	  render: function() {
	    var $__0=   this.props.w,x=$__0.x,y=$__0.y;
	    var xVal = Math.floor(10 * x) / 10;
	    var yVal = Math.floor(10 * y) / 10;
	
	    return React.createElement(K, {tex: " \\large w = [" + xVal + ", " + yVal + "]"});
	  }
	});
	
	module.exports = DisplayWNumbers;


/***/ },

/***/ 88:
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
	    var initialCamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 ); // Field of view, aspect ratio, near clip, far clip
	    initialCamera.up = new THREE.Vector3( 0, 0, 1 );
	    initialCamera.position.z = 180;
	
	
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
	    this.state.camera.position.x = Math.cos(state.angle) * 300;
	    this.state.camera.position.y = Math.sin(state.angle) * 300;
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

/***/ 89:
/*!***********************************!*\
  !*** ./scripts/OptimiserLine.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var THREE = __webpack_require__(/*! three */ 2);
	
	                                 
	                                           
	              
	                      
	                             
	                                                                
	                     
	 
	              
	                    
	 
	
	
	var OptimiserLine = React.createClass({displayName: "OptimiserLine",
	  propTypes: {
	    vertices: React.PropTypes.array.isRequired,
	    projectedError: React.PropTypes.func.isRequired,
	    pointClasses: React.PropTypes.array.isRequired,
	    scene: React.PropTypes.any.isRequired
	  },
	
	  getInitialState: function()        {
	    return {line: null};
	  },
	
	  shouldComponentUpdate: function(nextProps       )       {
	    return (nextProps.vertices !== this.props.vertices ||
	      nextProps.pointClasses !== this.props.pointClasses ||
	      nextProps.projectedError !== this.props.projectedError);
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
	            var z = nextProps.projectedError(w, nextProps.pointClasses);
	            return new THREE.Vector3(w.x, w.y, z + 1); // hack to keep the line above the surface. (better would be smart interpolation)
	          }
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

/***/ 90:
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
	      var r = Math.pow(1.8, j * j) - 1; // this ensures there are lots of samples near the origin and gets close to 0!
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

/***/ 91:
/*!**************************************!*\
  !*** ./scripts/ReplacePointsBar.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	
	
	var ReplacePointsButton = React.createClass({displayName: "ReplacePointsButton",
	  handleClick: function() {
	    this.props.callback(this.props.points);
	  },
	
	  render: function()                {
	    return React.createElement("button", {onClick: this.handleClick}, this.props.children);
	  }
	});
	
	var ReplacePointsBar = React.createClass({displayName: "ReplacePointsBar",
	  render: function()                {
	    return React.createElement("div", {style: this.props.style}, 
	      React.createElement(ReplacePointsButton, {callback: this.props.callback, points: __webpack_require__(/*! ../data/points.js */ 84)}, 
	        "Default"
	      ), 
	      React.createElement(ReplacePointsButton, {callback: this.props.callback, points: __webpack_require__(/*! ../data/closePoints.js */ 94)}, 
	        "Close"
	      ), 
	      React.createElement(ReplacePointsButton, {callback: this.props.callback, points: __webpack_require__(/*! ../data/overlapPoints.js */ 174)}, 
	        "Overlap"
	      )
	    );
	  }
	});
	
	module.exports = ReplacePointsBar;


/***/ },

/***/ 92:
/*!************************************!*\
  !*** ./scripts/WebWorkerGraph.jsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var workerSlug = __webpack_require__(/*! ./WebWorkerGraphSlug.jsx */ 172);
	var WorkerBridge = __webpack_require__(/*! ./WorkerBridge.jsx */ 173);
	
	                                 
	                                           
	              
	              
	                             
	                      
	                     
	                          
	 
	              
	                    
	 
	
	
	
	var WebWorkerGraph = React.createClass({displayName: "WebWorkerGraph",
	  propTypes: {
	    dim: React.PropTypes.number.isRequired, // 400
	    pointClasses: React.PropTypes.array.isRequired,
	    rResolution: React.PropTypes.number.isRequired, // 8
	    scene: React.PropTypes.any.isRequired,
	    thetaResolution: React.PropTypes.number.isRequired, // 24
	  },
	
	  // 120 * 40 looks great... 4800 computations
	  // 96 * 32
	  // 72 * 24
	  // 36 * 12
	  // 24 * 8 is pretty much a minimum.
	
	  getInitialState: function()        {
	    return {graph: null};
	  },
	
	  componentWillMount: function() {
	    // synchronously compute the first graph.
	    var $__0=     this.props,thetaResolution=$__0.thetaResolution,rResolution=$__0.rResolution,dim=$__0.dim,pointClasses=$__0.pointClasses;
	    var graph = workerSlug(thetaResolution, rResolution, dim, pointClasses)
	    this.setState({graph:graph});
	    this.props.scene.add(graph);
	
	    // set up worker connection
	    var reactElementId = this._reactInternalInstance._rootNodeID; // maybe cache a UUID instead?
	    var webWorkerChannel = WorkerBridge.subscribe(reactElementId, this.receiveWebWorkerResponse);
	    webWorkerChannel(120, 40, 400, this.props.pointClasses);
	  },
	
	  receiveWebWorkerResponse: function(mesh)       {
	    console.log('reactElement received', mesh);
	  },
	
	  componentWillUnmount: function() {
	    this.props.scene.remove(this.state.graph);
	  },
	
	  shouldComponentUpdate: function()       {
	    // console.log('TODO');
	    return false;
	  },
	
	  render: function()                {
	    return null;
	  }
	});
	
	module.exports = WebWorkerGraph;


/***/ },

/***/ 93:
/*!****************************************!*\
  !*** ./scripts/LogisticRegression.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                                 
	                                             
	                                           
	
	"use strict";
	
	var $__0=      __webpack_require__(/*! ./VectorUtils.jsx */ 169),pointClassesTransformZeroOne=$__0.pointClassesTransformZeroOne,dotProduct=$__0.dotProduct,scale=$__0.scale,add=$__0.add,modulus=$__0.modulus;
	
	function sigmoid(wx)         {
	  return 1 / (1 + Math.exp(-wx));
	}
	
	function logSigmoid(wx)         {
	  return -Math.log(1 + Math.exp(-wx));
	}
	
	function logOneMinusSigmoid(wx)         {
	  return -Math.log(Math.exp(wx) + 1); // "equivalent" formulations of this don't give same results!
	}
	
	
	
	var ANTI_OVERFLOW_FUDGE = 1 / 200;
	
	// the objective function is used to generate the surface
	function objective(w    , pointClasses              )         {
	  var smallerW = scale(ANTI_OVERFLOW_FUDGE)(w);
	  var points = pointClassesTransformZeroOne(pointClasses);
	
	  // we're actually trying to minimise this.
	  var sum = -points
	    .map(function sumElement(point     )         { // crucially, t is either 0 or 1.
	      var wx = dotProduct(smallerW, point);
	      return point.t * logSigmoid(wx) + (1 - point.t) * logOneMinusSigmoid(wx);
	    })
	    .reduce(function(a, b) {return a + b;}, 0);
	
	  // flip representation because Surface.jsx shows maximisation
	  return 100 - Math.log(1 + sum) * 10;
	}
	
	
	
	var NU = 0.03;
	var ACCEPTING_GRAD = 1; // we reach this in ~ 300 loops, but it takes more like 6000 to reach 0.1!
	var MAX_STOPS = 250;
	
	function optimise(startW    , pointClasses              )            {
	  var points = pointClassesTransformZeroOne(pointClasses);
	  var len = points.length;
	
	  function gradient(w    )     {
	    var smallerW = scale(ANTI_OVERFLOW_FUDGE)(w);
	    var grad = {x: 0, y: 0};
	
	    for (var i = 0; i < len; i = i + 1) {
	      var point = points[i];
	      var scaleFactor = sigmoid(smallerW.x * point.x + smallerW.y * point.y) - point.t;
	      grad.x = grad.x + scaleFactor * point.x;
	      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
	    }
	    return grad;
	  }
	
	  var w = startW;
	  var grad;
	  var stops = [w];
	  while (grad = gradient(w, pointClasses), modulus(grad) > ACCEPTING_GRAD && stops.length < MAX_STOPS) {
	    w = add(w)(scale(-1 * NU)(grad));
	    stops.push(w);
	  }
	  return stops;
	}
	
	
	
	function fastOptimise(startW    , pointClasses              )         {
	  var points = pointClassesTransformZeroOne(pointClasses);
	
	  function gradient(w    )     {
	    var smallerW = {x: ANTI_OVERFLOW_FUDGE * w.x, y: ANTI_OVERFLOW_FUDGE * w.y};
	    var grad = {x: 0, y: 0};
	
	    for (var i = 0; i < points.length; i = i + 1) {
	      var point = points[i];
	      var scaleFactor = sigmoid(smallerW.x * point.x + smallerW.y * point.y) - point.t;
	      grad.x = grad.x + scaleFactor * point.x;
	      grad.y = grad.y + scaleFactor * point.y; // inlined scale factor and dot products here to reduce GC
	    }
	    return grad;
	  }
	
	  var w = {x: startW.x, y: startW.y};
	  var grad;
	  var stops = 1;
	  while (grad = gradient(w, pointClasses), modulus(grad) > ACCEPTING_GRAD && stops < MAX_STOPS) {
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

/***/ 94:
/*!*****************************!*\
  !*** ./data/closePoints.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	module.exports = [[{"x":-69.91981426253915,"y":4.750457964837551},{"x":-106.71077957376838,"y":34.54018207266927},{"x":-75.78700138255954,"y":39.27134918048978},{"x":-97.5,"y":98.703125},{"x":-76.5,"y":73.703125},{"x":-53.5,"y":87.703125},{"x":-60.5,"y":39.703125},{"x":-45.5,"y":61.703125},{"x":-85.5,"y":10.703125},{"x":-98.5,"y":-19.296875},{"x":-120.5,"y":-0.296875},{"x":-118.5,"y":18.703125},{"x":-144.5,"y":3.703125},{"x":-123.5,"y":-16.296875},{"x":-11.5,"y":2.453125},{"x":-8.5,"y":32.453125},{"x":-2.5,"y":87.453125},{"x":-45.5,"y":19.453125},{"x":-15.5,"y":62.453125},{"x":-50.5,"y":122.453125},{"x":-49.5,"y":-50.546875},{"x":-38.5,"y":-5.546875},{"x":-83.5,"y":-30.546875},{"x":-110.5,"y":-65.546875},{"x":-88.5,"y":-4.546875},{"x":-77.5,"y":-40.546875},{"x":-88.5,"y":-101.546875},{"x":-123.5,"y":-146.546875},{"x":-75.5,"y":-136.546875},{"x":-75.5,"y":-96.546875},{"x":-104.5,"y":-96.546875},{"x":-4.5,"y":85.453125},{"x":2.5,"y":169.453125},{"x":-22.5,"y":135.453125},{"x":-22.5,"y":104.453125},{"x":-10.5,"y":116.453125},{"x":-37.5,"y":59.453125},{"x":-50.5,"y":8.453125},{"x":-98.5,"y":-41.546875},{"x":-49.5,"y":-82.546875},{"x":-45.5,"y":5.453125},{"x":-59.5,"y":-53.546875},{"x":-84.5,"y":-13.546875},{"x":-71.5,"y":83.453125},{"x":-92.5,"y":30.453125},{"x":-99.5,"y":-14.546875},{"x":-63.5,"y":9.453125},{"x":-63.5,"y":40.453125},{"x":-38.5,"y":71.453125},{"x":-40.5,"y":-9.546875},{"x":-63.5,"y":-30.546875},{"x":-84.5,"y":-66.546875},{"x":-70.5,"y":-82.546875},{"x":-58.5,"y":-6.546875}],[{"x":53.5,"y":-79.296875},{"x":97.5,"y":-35.296875},{"x":108.5,"y":29.703125},{"x":87.5,"y":6.703125},{"x":64.5,"y":-55.296875},{"x":49.5,"y":-12.546875},{"x":31.5,"y":-68.546875},{"x":55.5,"y":42.453125},{"x":96.5,"y":140.453125},{"x":53.5,"y":88.453125},{"x":24.5,"y":31.453125},{"x":14.5,"y":6.453125},{"x":5.5,"y":-45.546875},{"x":31.5,"y":-45.546875},{"x":40.5,"y":-75.546875},{"x":45.5,"y":-97.546875},{"x":22.5,"y":-93.546875},{"x":14.5,"y":-75.546875},{"x":45.5,"y":-114.546875},{"x":73.5,"y":6.453125},{"x":97.5,"y":88.453125},{"x":73.5,"y":89.453125},{"x":35.5,"y":70.453125},{"x":19.5,"y":56.453125},{"x":44.5,"y":58.453125},{"x":29.5,"y":-24.546875},{"x":37.5,"y":19.453125},{"x":82.5,"y":42.453125},{"x":62.5,"y":-28.546875},{"x":30.5,"y":-128.546875},{"x":-22.5,"y":-140.546875},{"x":-2.5,"y":-101.546875},{"x":12.5,"y":-139.546875},{"x":12.5,"y":-157.546875},{"x":10.5,"y":-110.546875},{"x":-5.5,"y":-73.546875},{"x":26.5,"y":-2.546875},{"x":18.5,"y":-27.546875},{"x":47.5,"y":20.453125}]]

/***/ },

/***/ 95:
/*!***********************************!*\
  !*** ./scripts/MaximumMargin.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	                                 
	                                             
	                                          
	
	"use strict";
	
	var $__0=    __webpack_require__(/*! ./VectorUtils.jsx */ 169),pointClassesTransform=$__0.pointClassesTransform,dotProduct=$__0.dotProduct,modulus=$__0.modulus;
	
	
	// the objective function is used to generate the surface
	function objective(w    , pointClasses              )         {
	  // compute the `margin` for all points in pointClasses
	  var points = pointClassesTransform(pointClasses);
	  var margins = points.map( function(point)  {return -1 * point.t * dotProduct(w, point);} ); // -1 fudge
	  // find the minimum of these
	  var minimumMargin = Math.min.apply(null, margins);
	  // normalise by w.
	  var normalisationFactor = 1 / modulus(w);
	  return normalisationFactor * minimumMargin;
	}
	
	
	// optimisation algorithm is used to overlay the line
	// function optimise(startWeight: P2, pointClasses: PointClasses): Array<P2> {
	//   return [];
	// }
	
	module.exports = {
	  objective: objective,
	};


/***/ },

/***/ 168:
/*!**************************!*\
  !*** ./scripts/Line.jsx ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	var $__0=  __webpack_require__(/*! react/addons */ 1).addons,PureRenderMixin=$__0.PureRenderMixin;
	var $__1=       __webpack_require__(/*! ./VectorUtils.jsx */ 169),rot90=$__1.rot90,lineEq=$__1.lineEq,scale=$__1.scale;
	
	
	// my stackoverflow explanation: http: //stackoverflow.com/a/24392281/1941552
	function lambdaGamma (arg1, arg2, arg3, arg4) {
	  var $__0=   arg1,a=$__0[0],b=$__0[1];
	  var $__1=   arg2,c=$__1[0],d=$__1[1];
	  var $__2=   arg3,p=$__2[0],q=$__2[1];
	  var $__3=   arg4,r=$__3[0],s=$__3[1];
	
	  var det = (c - a) * (s - q) - (r - p) * (d - b);
	  if (det === 0) {
	    return null; // colinear
	  } else {
	    var lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
	    var gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
	    return [lambda, gamma];
	  }
	}
	
	
	var Line = React.createClass({displayName: "Line",
	  propTypes: {
	    w: React.PropTypes.shape({
	      x: React.PropTypes.number.isRequired,
	      y: React.PropTypes.number.isRequired
	    }).isRequired,
	    dim: React.PropTypes.number.isRequired
	  },
	
	  mixins: [PureRenderMixin],
	
	  findBorderIntersection: function(v                       )                    {
	    var dim = this.props.dim;
	    var top = [[-dim / 2, dim / 2], [dim / 2, dim / 2]];
	    var right = [[dim / 2, dim / 2], [dim / 2, -dim / 2]];
	    var bottom = [[dim / 2, -dim / 2], [-dim / 2, -dim / 2]];
	    var left = [[-dim / 2, -dim / 2], [-dim / 2, dim / 2]];
	
	    // we construct vectors for the edge of the viewport, then intersection test them.
	    // this yields the lambda that we need to multiply v by to reach the edge.
	    var intersections = [top, right, bottom, left]
	      .map(function(arg)  {return lambdaGamma([0, 0], [v.x, v.y], arg[0], arg[1]);})
	      .filter( function(lg) {
	        if (typeof lg !== "undefined" && lg !== null) {
	          var $__0=   lg,lambda=$__0[0],gamma=$__0[1];
	          return 0 < lambda && 0 < gamma && gamma <= 1; // not conventional intersection
	        } else {
	          return false;
	        }
	      });
	    return intersections[0];
	  },
	
	  render: function()                {
	    var boundaryPoint;
	    if (lineEq({x: 0, y: 0}, this.props.w)) {
	      boundaryPoint = {
	        x: 0,
	        y: 0
	      };
	    } else {
	      var v = rot90(this.props.w); // v is now the direction of the line
	      var first = this.findBorderIntersection(v);
	      if (typeof first !== "undefined" && first !== null) {
	        var lambda = first[0];
	        boundaryPoint = scale(lambda)(v);
	      } else {
	        throw new Error();
	      }
	    }
	
	    return (
	      React.createElement("path", {d: ("M " + (-boundaryPoint.x) + " " + (-boundaryPoint.y) + " L " + boundaryPoint.x + " " + boundaryPoint.y), 
	        strokeWidth: "1.5", 
	        stroke: "rgba(30, 30, 30, 0.3)", 
	        style: this.props.style})
	    );
	  }
	});
	
	module.exports = Line;


/***/ },

/***/ 169:
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

/***/ 170:
/*!*******************************!*\
  !*** ./scripts/AllPoints.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	
	var React = __webpack_require__(/*! react/addons */ 1);
	
	
	var PointClass = React.createClass({
	  displayName: "PointClass",
	  render: function()                {
	    return (React.createElement("g", null, 
	       this.props.points
	          .map(function(p)  {return React.createElement("circle", {key: p.x + ":" + p.y, cx: p.x, cy: p.y, r: "3", fill: this.props.color});}.bind(this))
	    ));
	  }
	});
	
	
	var AllPoints = React.createClass({
	  displayName: "AllPoints",
	
	  propTypes: {
	    pointClasses: React.PropTypes.array.isRequired
	  },
	
	  render: function()                {
	    var $__0=   this.props.pointClasses,class0=$__0[0],class1=$__0[1];
	    return (React.createElement("g", null, 
	      React.createElement(PointClass, {points: class0, color: "red"}), 
	      React.createElement(PointClass, {points: class1, color: "blue"})
	    ));
	  }
	});
	
	
	module.exports = AllPoints;


/***/ },

/***/ 171:
/*!**************************!*\
  !*** ./scripts/Axes.jsx ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	var React = __webpack_require__(/*! react/addons */ 1);
	
	var Axes = React.createClass({displayName: "Axes",
	  render: function()                {
	    var yAxis = ("M" +  0 + " " +  this.props.dim + " L" +  0 + " " + ( -this.props.dim));
	    var xAxis = ("M" + ( -this.props.dim) + " " +  0 + " L" +  this.props.dim + " " +  0);
	    return (
	      React.createElement("g", null, 
	        React.createElement("path", {d: xAxis, strokeWidth: "3", stroke: "#d0d0d0"}), 
	        React.createElement("path", {d: yAxis, strokeWidth: "3", stroke: "#d0d0d0"})
	      )
	    );
	  }
	});
	
	module.exports = Axes;


/***/ },

/***/ 172:
/*!****************************************!*\
  !*** ./scripts/WebWorkerGraphSlug.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	                                 
	                                           
	
	
	var $__0=   __webpack_require__(/*! ./LogisticRegression.jsx */ 93),fastOptimise=$__0.fastOptimise,objective=$__0.objective;
	var THREE = __webpack_require__(/*! three */ 2);
	
	
	var MATERIAL = new THREE.MeshBasicMaterial({
	  side: THREE.DoubleSide,
	  vertexColors: THREE.FaceColors,
	  opacity: 0.8,
	  transparent: true,
	});
	
	function build(thetaResolution, rResolution, dim, pointClasses)                           {
	  var polarMeshFunction = function(i        , j        )                {
	    var theta = i * 2 * Math.PI;
	    var r = Math.pow(1.8, j * j) - 1; // this ensures there are lots of samples near the origin and gets close to 0!
	    var x = r * Math.cos(theta) * dim;
	    var y = r * Math.sin(theta) * dim;
	    var z = objective({x:x, y:y}, pointClasses);
	    return new THREE.Vector3(x, y, z);
	  };
	
	  return new THREE.ParametricGeometry(polarMeshFunction, thetaResolution, rResolution, true);
	}
	
	function colour(graphGeometry, pointClasses)       {
	  graphGeometry.computeBoundingBox();
	  var zMin = graphGeometry.boundingBox.min.z;
	  var zRange = graphGeometry.boundingBox.max.z - zMin;
	
	  var colourFunction = function(vertex1, vertex2, vertex3, mutableFaceColor)       {
	    var totalZ = vertex1.z + vertex2.z + vertex3.z;
	    var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
	    var stops = fastOptimise(vertex1, pointClasses) / 250; // should match MAX_STOPS
	    mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
	  };
	
	  for (var i = 0; i < graphGeometry.faces.length; i = i + 1) {
	    var face = graphGeometry.faces[i];
	    colourFunction(
	      graphGeometry.vertices[face.a],
	      graphGeometry.vertices[face.b],
	      graphGeometry.vertices[face.c],
	      face.color);
	  }
	
	  graphGeometry.colorsNeedUpdate = true;
	}
	
	module.exports = function respond(thetaResolution        , rResolution        , dim        , pointClasses              ) {
	  var graphGeometry = build(thetaResolution, rResolution, dim, pointClasses);
	  colour(graphGeometry, pointClasses);
	  return new THREE.Mesh(graphGeometry, MATERIAL.clone());
	};


/***/ },

/***/ 173:
/*!**********************************!*\
  !*** ./scripts/WorkerBridge.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	"use strict";
	                           
	                                 
	                                           
	
	
	var worker = new Worker("./build/worker.bundle.js");
	var subscribers = {};
	
	console.log('hi')
	
	worker.onmessage = function(event     ) {
	  console.log('onMessage', event);
	  // var {reactElementId, mesh} = event.data;
	
	  // if (reactElementId in subscribers) {
	  //   subscribers[reactElementId](mesh);
	  // } else {
	  //   console.log("no subscriber for: ", event, reactElementId, mesh);
	  // }
	};
	
	
	module.exports = {
	
	  subscribe: function(
	      reactElementId        ,
	      callback              )                                                              {
	    console.assert(!(reactElementId in subscribers), "No repeat subscribing: " + reactElementId);
	    subscribers[reactElementId] = callback;
	
	    return function request(thetaResolution        , rResolution        , dim        , pointClasses              ) {
	      console.assert(
	        typeof thetaResolution === "number" &&
	        typeof rResolution === "number" &&
	        pointClasses instanceof Array);
	      console.log('sending', reactElementId);
	      worker.postMessage({reactElementId:reactElementId, thetaResolution:thetaResolution, rResolution:rResolution, dim:dim, pointClasses:pointClasses});
	    };
	  },
	
	  unsubscribe: function(reactElementId        )       {
	    console.assert(reactElementId in subscribers, "Can't unsubscribe " + reactElementId);
	    delete subscribers[reactElementId];
	  }
	
	};


/***/ },

/***/ 174:
/*!*******************************!*\
  !*** ./data/overlapPoints.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	module.exports = [[{"x":-69.91981426253915,"y":4.750457964837551},{"x":-106.71077957376838,"y":34.54018207266927},{"x":-75.78700138255954,"y":39.27134918048978},{"x":-53.5,"y":87.703125},{"x":-60.5,"y":39.703125},{"x":-45.5,"y":61.703125},{"x":-85.5,"y":10.703125},{"x":-98.5,"y":-19.296875},{"x":-38.5,"y":24.703125},{"x":-23.5,"y":37.703125},{"x":-3.5,"y":63.703125},{"x":-25.5,"y":64.703125},{"x":-26.5,"y":5.703125},{"x":-34.5,"y":-4.296875},{"x":-49.5,"y":-40.296875},{"x":-51.5,"y":-9.296875},{"x":-72.5,"y":-31.296875},{"x":-96.5,"y":-45.296875},{"x":-115.5,"y":-62.296875},{"x":-90.5,"y":-70.296875},{"x":-23.5,"y":114.703125},{"x":-23.5,"y":96.703125},{"x":-32.5,"y":-37.296875},{"x":-43.5,"y":-71.296875},{"x":-6.5,"y":26.703125},{"x":-8.5,"y":-20.296875},{"x":9.5,"y":30.703125},{"x":-0.5,"y":-6.296875},{"x":17.5,"y":73.703125}],[{"x":53.5,"y":-79.296875},{"x":64.5,"y":-55.296875},{"x":69.5,"y":0.703125},{"x":35.5,"y":-3.296875},{"x":9.5,"y":-21.296875},{"x":6.5,"y":-79.296875},{"x":-11.5,"y":-82.296875},{"x":1.5,"y":-118.296875},{"x":12.5,"y":-115.296875},{"x":2.5,"y":-49.296875},{"x":62.5,"y":-36.296875},{"x":35.5,"y":-45.296875},{"x":36.5,"y":11.703125},{"x":52.5,"y":45.703125},{"x":64.5,"y":91.703125},{"x":59.5,"y":52.703125},{"x":31.5,"y":29.703125},{"x":64.5,"y":34.703125},{"x":60.5,"y":8.703125},{"x":43.5,"y":-20.296875},{"x":18.5,"y":-50.296875},{"x":18.5,"y":-86.296875},{"x":29.5,"y":-98.296875},{"x":1.5,"y":-143.296875},{"x":50.5,"y":-15.296875},{"x":50.5,"y":60.703125},{"x":58.5,"y":99.703125},{"x":-14.5,"y":-118.296875},{"x":40.5,"y":-71.296875},{"x":-48.5,"y":-63.296875},{"x":-22.5,"y":-60.296875},{"x":-22.5,"y":-7.296875},{"x":-22.5,"y":35.703125},{"x":-6.5,"y":72.703125},{"x":18.5,"y":86.703125},{"x":31.5,"y":95.703125},{"x":13.5,"y":44.703125},{"x":-4.5,"y":11.703125},{"x":-27.5,"y":-52.296875},{"x":-27.5,"y":-89.296875},{"x":-47.5,"y":-103.296875}]]

/***/ }

});
//# sourceMappingURL=bundle.js.map