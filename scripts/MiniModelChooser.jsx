/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {
  label: number;
  points: Array<P2>;
  generatedBy: {
    center: P2;
    params: {l: number; theta: number};
  };
  mouseDownDiff: ?P2;
};

var CursorSphere = require("./CursorSphere.jsx");
var ThreeScene = require("./ThreeScene.jsx");
var Perceptron = require("./Perceptron.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var ParametricGraph = require("./ParametricGraph.jsx");
var React = require("react/addons");



var MiniModelChooser = React.createClass({

  propTypes: {
    highlightedW: React.PropTypes.object.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
  },

  render: function(): ?ReactElement {
    var dim = 120;
    return (
      <div>
        <ThreeScene dim={dim} pointGroups={this.props.pointGroups} angle={0}
            objective={Perceptron.objective} highlightW={function(){}}>
          <ParametricGraph thetaResolution={30} rResolution={6} colourFunction={ParametricGraph.COLOUR_FUNCTION} />
        </ThreeScene>

        <ThreeScene dim={dim} pointGroups={this.props.pointGroups} angle={0}
            objective={LogisticRegression.objective} highlightW={function(){}}>
          <ParametricGraph thetaResolution={30} rResolution={6} colourFunction={ParametricGraph.COLOUR_FUNCTION} />
        </ThreeScene>

        <ThreeScene dim={dim} pointGroups={this.props.pointGroups} angle={0}
            objective={MaximumMargin.objective} highlightW={function(){}}>
          <ParametricGraph thetaResolution={30} rResolution={6} colourFunction={ParametricGraph.COLOUR_FUNCTION} />
        </ThreeScene>
      </div>
    );
  }
});


module.exports = MiniModelChooser;
