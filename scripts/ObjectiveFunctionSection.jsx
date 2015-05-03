/* @flow */
"use strict";

type P2 = {x: number; y: number};


var CursorSphere = require('./CursorSphere.jsx');
var Default2DVis = require("./Default2DVis.jsx");
var DisplayWNumbers = require("./DisplayWNumbers.jsx");
var Draggable3DScene = require("./Draggable3DScene.jsx");
var K = require('./Katex.jsx');
var OptimiserLine = require('./OptimiserLine.jsx');
var ParametricGraph = require('./ParametricGraph.jsx');
var React = require("react");
var {computePerceptronWeight} = require("./Perceptron.jsx");
var {perceptronError} = require("./LeastSquares.jsx");
var {ReplacePointsBar} = require("./ReplacePointsButton.jsx");



var PerceptronVis = React.createClass({
  getInitialState: function(): {highlightedW: ?P2} {
    return {
      highlightedW: null,
      pointClasses: require("../data/points.js"),
    };
  },

  highlightW: function(point: P2): void {
    this.setState({highlightedW: point});
  },

  updatePointClasses: function(newPointClasses: [Array<P2>, Array<P2>]): void {
    this.setState({pointClasses: newPointClasses});
  },

  render: function() {
    var dim = 400;

    var optimiserLine;
    if (typeof this.state.highlightedW !== "undefined" &&
       this.state.highlightedW !== null) {
      optimiserLine = computePerceptronWeight(this.state.highlightedW, this.state.pointClasses);
    }

    return <div style={{width: "850px"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>

        <div style={{position: "relative"}}>
          <Default2DVis dim={dim} pointClasses={this.state.pointClasses}
            highlightW={this.highlightW} optimiserLine={optimiserLine}
            highlightedW={this.state.highlightedW} updatePointClasses={this.updatePointClasses} />

          <ReplacePointsBar callback={this.updatePointClasses}
            style={{position: "absolute", bottom: 0, left: 0}} />
        </div>

        <Draggable3DScene dim={dim} pointClasses={this.state.pointClasses}
            projectedError={perceptronError} highlightW={this.highlightW}>
          <ParametricGraph thetaResolution={120} rResolution={20} />
          {optimiserLine && <OptimiserLine vertices={optimiserLine} />}
          {this.state.highlightedW && <CursorSphere highlightedW={this.state.highlightedW} />}
        </Draggable3DScene>
      </div>

      <div>
        { this.state.highlightedW && <DisplayWNumbers w={this.state.highlightedW} />}
      </div>
    </div>;
  }
});





var ObjectiveFunctionSection = React.createClass({
  render: function(): ?ReactElement {
    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>

      <h2>Objective Functions</h2>

      <p>How can we choose a better <K>w</K>?  From
      eyeballing a few possibilities, it&apos;s clear
      which ones will be good and which will be bad, but we need some way to quantify this.</p>

      <img src="http://i.imgur.com/Ds0JJjb.jpg" style={{maxWidth: "100%", margin: "1em" }} />

      <p>
      An <em>objective function</em> can
      compute a score for each potential
      vector <K>w</K> so
      that we can automatically choose the best one.  The blue pie-shape on the right
      shows the value of the perceptron objective for all the possible choices of the
      vector <K>w</K>.  Hover over the graph on the
      left to see what one particular choice
      of <K>w</K> looks like.</p>

      <PerceptronVis />

      <p>As you can see from the right hand diagram, there are a large
      number of possibilities for the
      vector <K>w</K> that all share the maximum objective
      function.</p>
    </div>);
  }
});

module.exports = ObjectiveFunctionSection;
