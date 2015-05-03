/* @flow */
"use strict";

var React = require("react");

var MainVis = require("./MainVis.jsx");
var K = require('./Katex.jsx');
var {perceptronError} = require("./LeastSquares.jsx");
var {computePerceptronWeight} = require("./Perceptron.jsx");

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

      <div style={{width: "850px"}}>
        <MainVis dim={400} projectedError={perceptronError}
          optimiserFunction={computePerceptronWeight} />
      </div>

      <p>As you can see from the right hand diagram, there are a large
      number of possibilities for the
      vector <K>w</K> that all share the maximum objective
      function.</p>
    </div>);
  }
});

module.exports = ObjectiveFunctionSection;
