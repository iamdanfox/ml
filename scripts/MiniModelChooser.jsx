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

  shouldComponentUpdate: function(nextProps: any): boolean {
    return (this.props.angle !== nextProps.angle ||
      this.props.pointGroups !== nextProps.pointGroups ||
      this.props.highlightedW !== nextProps.highlightedW ||
      this.props.focussedModelParams !== nextProps.focussedModelParams ||
      this.props.focussedModel !== nextProps.focussedModel);
  },

  render: function(): ?ReactElement {
    var dim = 120;

    var models = [Perceptron, LogisticRegression, MaximumMargin];

    return (
      <div>
        <div style={{display: "flex"}}>
        { models.map((model) =>
            <div style={{cursor: "pointer", opacity: model === this.props.focussedModel ? 1 : 0.5}}
              onClick={() => this.props.focusModel(model)}>
              <ThreeScene dim={dim} pointGroups={this.props.pointGroups} angle={this.props.angle}
                  objective={model.objective} highlightW={function() {}}>
                <ParametricGraph thetaResolution={30} rResolution={6}
                  colourFunction={ParametricGraph.COLOUR_FUNCTION} />
              </ThreeScene>
            </div>
          ) }
        </div>

        { this.props.focussedModel === Perceptron &&
            <div style={{background: "rgba(255, 255, 255, 0.4)", padding: "30px"}}>
              <h2>Perceptron</h2>
              <p>Epochs = 2</p>
            </div> }

        { this.props.focussedModel === LogisticRegression &&
            <div style={{background: "rgba(255, 255, 255, 0.4)", padding: "30px"}}>
              <LRParamChooser params={this.props.focussedModelParams}
                updateParams={this.props.updateModelParams} />
            </div> }

      </div>
    );
  }
});

var LRParamChooser = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    updateParams: React.PropTypes.func.isRequired,
  },

  updateParam: function(paramName: string, newValue: number): () => void {
    return () => {
      var newParams = Object.create(this.props.params);
      newParams[paramName] = newValue;
      this.props.updateParams(newParams);
    };
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <h2>Logistic Regression</h2>
        { ["NU", "ACCEPTING_GRAD", "MAX_STOPS"].map((paramName) =>
            <div>
              <p>{paramName}</p>
              <p>{ LogisticRegression.paramOptions(paramName).map((paramValue) =>
                  <button disabled={this.props.params[paramName] === paramValue}
                    onClick={this.updateParam(paramName, paramValue)}>
                    {paramValue}
                  </button>) }</p>
            </div>) }

      </div>
    );
  }
})


module.exports = MiniModelChooser;
