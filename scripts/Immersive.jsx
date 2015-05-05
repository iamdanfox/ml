/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];
type PointGrp = {
  label: number;
  points: Array<P2>;
  generatedBy: {
    center: P2;
    params: {l: number; theta: number};
  };
  mouseDownDiff: ?P2;
};
type State = {
  pointGroups: Array<PointGrp>;
  highlightedW: P2;
}

var React = require("react/addons");
var AwesomeDataComponent = require("./AwesomeDataComponent.jsx");
var {scale} = require("./VectorUtils.jsx");

var CursorSphere = require("./CursorSphere.jsx");
var Draggable3DScene = require("./Draggable3DScene.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var ParametricGraph = require("./ParametricGraph.jsx");
var React = require("react/addons");
var Perceptron = require("./Perceptron.jsx");
var OptimiserLine = require("./OptimiserLine.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var WebWorkerGraph = require("./WebWorkerGraph.jsx");


var [class0, class1] = require("../data/closePoints.js");
var oldPointGroups = [
  {
    points: class0.map(scale(1 / 200)),
    label: 0,
    generatedBy: {
      center: {x: -0.35, y: 0},
      params: {l: 0.9, theta: -0.4},
    },
    mouseDownDiff: null,
  },
  {
    points: class1.map(scale(1 / 200)),
    label: 1,
    generatedBy: {
      center: {x: 0.2, y: -0.2},
      params: {l: 0.7, theta: -0.4},
    },
    mouseDownDiff: null,
  }
];




var Immersive = React.createClass({
  getInitialState: function(): State {
    return {
      pointGroups: oldPointGroups,
      highlightedW: {x: 0.2, y: 0.2},
    };
  },

  updatePointGroups: function(pointGroups: Array<PointGrp>): void {
    this.setState({pointGroups});
  },

  highlightW: function(highlightedW: P2) {
    this.setState({highlightedW});
  },

  render: function(): ?ReactElement {

    // <Draggable3DScene dim={500} pointClasses={this.computePointClasses()}
    //     objective={MaximumMargin.objective} highlightW={this.highlightW}>

    //   <ParametricGraph thetaResolution={120} rResolution={40} />
    //   <CursorSphere highlightedW={this.state.highlightedW} />

    // </Draggable3DScene>
    // var optimiserLine = Perceptron.optimise(this.state.highlightedW, pointClasses);

    // <Draggable3DScene dim={500} pointClasses={pointClasses}
    //     objective={Perceptron.objective} highlightW={this.highlightW}>

    //   <ParametricGraph thetaResolution={120} rResolution={20} />
    //   <OptimiserLine vertices={optimiserLine} />
    //   <CursorSphere highlightedW={this.state.highlightedW} />
    // </Draggable3DScene>
          // <WebWorkerGraph thetaResolution={24} rResolution={8} />

    return (
      <div>
        <AwesomeDataComponent dim={500}
          updatePointGroups={this.updatePointGroups} pointGroups={this.state.pointGroups} />

        <LogisticRegressionVis highlightW={this.highlightW}
          highlightedW={this.state.highlightedW} pointGroups={this.state.pointGroups} />


      </div>
    );
  }
});

var LogisticRegressionVis = React.createClass({

  getInitialState: function() {
    return {
      pointClasses: this.computePointClasses(this.props.pointGroups)
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.pointGroups !== this.props.pointGroups) {
      this.setState({
        pointClasses: this.computePointClasses(nextProps.pointGroups)
      });
    }
  },

  computePointClasses: function(pointGroups): PointClasses {
    return [0, 1].map((l) => pointGroups
          .reduce((acc, pg) => pg.label === l ? acc.concat(pg.points) : acc, []));
  },

  render: function (): ?ReactElement {
    var colourFunction = (boundingBox, vertex1, vertex2, vertex3, mutableFaceColor) => {
      var zMin = boundingBox.min.z;
      var zRange = boundingBox.max.z - zMin;
      var totalZ = vertex1.z + vertex2.z + vertex3.z;
      var normalizedZ = (totalZ - 3 * zMin) / (3 * zRange);
      var stops = LogisticRegression.fastOptimise(vertex1, this.state.pointClasses) / 250;
      mutableFaceColor.setHSL(0.54 + stops * 0.3, 0.8,  0.08 + 0.82 * Math.pow(normalizedZ, 2));
    };

    var optimiserLine = LogisticRegression.optimise(this.props.highlightedW, this.state.pointClasses);

    return (
      <Draggable3DScene dim={500} pointClasses={this.state.pointClasses}
          objective={LogisticRegression.objective} highlightW={this.props.highlightW}>

        <OptimiserLine vertices={optimiserLine} />
        <CursorSphere highlightedW={this.props.highlightedW} />
        <ParametricGraph thetaResolution={24} rResolution={8} colourFunction={colourFunction} />

      </Draggable3DScene>
    );
  }
})

module.exports = Immersive;
