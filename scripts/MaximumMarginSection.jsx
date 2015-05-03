/* @flow */
"use strict";

type P2 = {x: number; y: number};

var CursorSphere = require('./CursorSphere.jsx');
var DisplayWNumbers = require("./DisplayWNumbers.jsx");
var Draggable3DScene = require("./Draggable3DScene.jsx");
var HyperplaneVis = require("./HyperplaneVis.jsx");
var K = require('./Katex.jsx');
var MaximumMargin = require("./MaximumMargin.jsx");
var Modes = require("./Modes.js");
var ParametricGraph = require('./ParametricGraph.jsx');
var React = require("react");
var {ReplacePointsBar} = require("./ReplacePointsButton.jsx");



var MaxMarginVis = React.createClass({
  getInitialState: function(): {highlightedW: ?P2} {
    return {
      highlightedW: null,
      pointClasses: require("../data/closePoints.js"),
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
    return <div style={{width: "850px"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>

        <div style={{position: "relative"}}>
          <HyperplaneVis dim={dim} mode={Modes.TRY_HYPERPLANE}
            pointClasses={this.state.pointClasses} updatePointClasses={this.updatePointClasses}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

          <ReplacePointsBar callback={this.updatePointClasses}
            style={{position: "absolute", bottom: 0, left: 0}} />
        </div>

        <Draggable3DScene dim={dim} pointClasses={this.state.pointClasses}
            projectedError={MaximumMargin.objective} highlightW={this.highlightW}>
          <ParametricGraph thetaResolution={120} rResolution={40} />
          {this.state.highlightedW && <CursorSphere highlightedW={this.state.highlightedW} />}
        </Draggable3DScene>
      </div>

      <div>
        { this.state.highlightedW && <DisplayWNumbers w={this.state.highlightedW} />}
      </div>
    </div>;
  }
});



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

      <MaxMarginVis />

      <p>Describe lagrangian/KKT method for solving this (?!?! needs work to understand this)</p>
    </div>);
  }
});

module.exports = MaximumMarginSection;
