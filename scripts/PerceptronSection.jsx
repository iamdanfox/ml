/* @flow */
"use strict";

var React = require("react");


var PerceptronSection = React.createClass({
  render: function(): ?ReactElement {
    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>
      <h2>The Perceptron</h2>
      <p>A good idea would be to look through all our known training data
      and find a hyperplane that classifies them all correctly.  The
      <em> Perceptron</em> algorithm does exactly this.</p>

      <code>
      Initialize vector w<br />
      cycle through points<br />
      if w classifies a point x incorrectly, subtract x from w.<br />
      repeat until w makes no mistakes
      </code>

      <p>[[[ANIMATION ALG VIS. AUto start when you scroll down.]]]</p>

      <p>The perceptron is not perfect however.  Since it can choose any
      hyperplane that makes no mistakes, it will sometimes give you one that
      performs badly in the real world. </p>


      <img src="http://i.imgur.com/QlNAio9.jpg" style={{maxWidth: "70%", margin: "1em" }} />

      <p>Also, if there are no hyperplanes that separate the two classes,
      the perceptron algorithm freaks out. (Note that Voted / Averaged Perceptrons
      can help this.</p>
    </div>);
  }
});

module.exports = PerceptronSection;
