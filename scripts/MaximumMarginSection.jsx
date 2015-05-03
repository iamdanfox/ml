/* @flow */
"use strict";

var React = require("react");
var MainVis = require("./MainVis.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var K = require('./Katex.jsx');

var MaximumMarginSection = React.createClass({
  render: function(): ?ReactElement {
    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>
      <h2>Maximum Margin (SVM)</h2>

      <p>[objective function]
      <a href="https://www.cs.ox.ac.uk/teaching/materials13-14/machinelearning/lecture_lsvm.pdf">
      Slide 9</a></p>


      <p>
        <K tex="argmax_w \{ \frac{||w||^2}{2} \}" />
      </p>
      <p>
        <K tex="s.t. ~~~~ y_i  ( w \cdot x_i ) \geq 1, ~~~~ \forall i" />
      </p>

      <div style={{width: "850px"}}>
        <MainVis dim={400} projectedError={MaximumMargin.objective}  />
      </div>

      <p>Describe lagrangian/KKT method for solving this (?!?! needs work to understand this)</p>
    </div>);
  }
});

module.exports = MaximumMarginSection;
