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
  },

  shouldComponentUpdate: function(nextProps: any): boolean {
    return (this.props.angle !== nextProps.angle ||
      this.props.pointGroups !== nextProps.pointGroups ||
      this.props.highlightedW !== nextProps.highlightedW);
  },

  render: function(): ?ReactElement {
    var dim = 120;

    var models = [Perceptron, LogisticRegression, MaximumMargin];

    return (
      <div>
        { models.map((model) =>
            <div style={{cursor: "pointer"}} onClick={() => this.props.focusModel(model)}>
              <ThreeScene dim={dim} pointGroups={this.props.pointGroups} angle={this.props.angle}
                  objective={model.objective} highlightW={function() {}}>
                <ParametricGraph thetaResolution={30} rResolution={6}
                  colourFunction={ParametricGraph.COLOUR_FUNCTION} />
              </ThreeScene>
            </div>
          ) }
      </div>
    );
  }
});


module.exports = MiniModelChooser;
