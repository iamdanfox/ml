/* @flow */
"use strict";

type P2 = {x: number; y: number};


var CursorSphere = require("../CursorSphere.jsx");
var Default2DVis = require("./Default2DVis.jsx");
var DisplayWNumbers = require("./DisplayWNumbers.jsx");
var Draggable3DScene = require("../Draggable3DScene.jsx");
var K = require("./Katex.jsx");
var OptimiserLine = require("../OptimiserLine.jsx");
var ParametricGraph = require("../ParametricGraph.jsx");
var React = require("react/addons");
var Perceptron = require("../Perceptron.jsx");
var {objective, optimise, DEFAULT_PARAMS} = require("../Perceptron.jsx");



var PerceptronVis = React.createClass({
  getInitialState: function(): {highlightedW: ?P2} {
    return {
      highlightedW: null,
      pointGroups: require("../../data/awesomePointGroups.js"),
    };
  },

  highlightW: function(point: P2): void {
    this.setState({highlightedW: point});
  },

  render: function() {
    var dim = 400;

    var optimiserLine;
    if (typeof this.state.highlightedW !== "undefined" &&
       this.state.highlightedW !== null) {
      optimiserLine = optimise(this.state.highlightedW, this.state.pointGroups, DEFAULT_PARAMS);
    }

    return <div style={{width: "850px"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>

        <div style={{position: "relative"}}>
          <Default2DVis dim={dim} pointGroups={this.state.pointGroups}
            highlightW={this.highlightW} optimiserLine={optimiserLine}
            highlightedW={this.state.highlightedW} />
        </div>

        <Draggable3DScene dim={dim} pointGroups={this.state.pointGroups}
            objective={objective} highlightW={this.highlightW}>
          <ParametricGraph thetaResolution={120} rResolution={20} colourFunction={ParametricGraph.COLOUR_FUNCTION} />
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
