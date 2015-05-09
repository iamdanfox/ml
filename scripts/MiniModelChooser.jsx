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

var LogisticRegression = require("./LogisticRegression.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var ParametricGraph = require("./ParametricGraph.jsx");
var Perceptron = require("./Perceptron.jsx");
var React = require("react/addons");
var ThreeScene = require("./ThreeScene.jsx");
require("./MiniModelChooser.css");
var LRParamChooser = require("./LRParamChooser.jsx");




var MiniModelChooser = React.createClass({

  propTypes: {
    highlightedW: React.PropTypes.object.isRequired,
    pointGroups: React.PropTypes.array.isRequired,
    angle: React.PropTypes.number.isRequired,
    focusModel: React.PropTypes.func.isRequired,
    focussedModel: React.PropTypes.object.isRequired,
    focussedModelParams: React.PropTypes.object.isRequired,
    updateModelParams: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {hover: false};
  },

  onMouseEnter: function() {
    this.setState({hover: true});
  },

  onMouseLeave: function() {
    this.setState({hover: false});
  },

  render: function(): ?ReactElement {
    var dim = 120;

    var {focussedModel} = this.props;

    var models = [Perceptron, LogisticRegression, MaximumMargin];

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div style={{display: "flex"}}>
        { models.map((model) =>
            <div className={model === focussedModel ? "minimodel minimodel-focussed" : "minimodel"}
              onClick={() => this.props.focusModel(model)}>
              <ThreeScene dim={dim} pointGroups={this.props.pointGroups} angle={this.props.angle}
                  objective={model.objective} highlightW={function() {}}>
                <ParametricGraph thetaResolution={30} rResolution={6}
                  colourFunction={ParametricGraph.COLOUR_FUNCTION} />
              </ThreeScene>
            </div>
          ) }
        </div>

        <div className={focussedModel === Perceptron && this.state.hover ?
            "slide-down slide-down-show" : "slide-down"}>
          <h2>Perceptron</h2>
          <p>Epochs = 2</p>
        </div>

        <div className={focussedModel === LogisticRegression && this.state.hover ?
            "slide-down slide-down-show" : "slide-down"}>
          <LRParamChooser params={this.props.focussedModelParams}
            updateParams={this.props.updateModelParams} />
        </div>

      </div>
    );
  }
});



module.exports = MiniModelChooser;
