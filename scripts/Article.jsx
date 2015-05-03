/* @flow */
"use strict";

var React = require("react");
var HR = require("./HR.jsx");

var Header = require("./Header.jsx");
var BinaryClassifierSection = require('./BinaryClassifierSection.jsx');
var PerceptronSection = require('./PerceptronSection.jsx');
var ObjectiveFunctionSection = require('./ObjectiveFunctionSection.jsx');
var LogisticRegressionSection = require('./LogisticRegressionSection.jsx');
var MaximumMarginSection = require('./MaximumMarginSection.jsx');

var Draggable3DScene = require('./Draggable3DScene.jsx');
var ParametricGraph = require('./ParametricGraph.jsx');
var {objective, optimise} = require("./LogisticRegression.jsx");

var Article = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="main-page" style={{fontSize: "22px",
        fontFamily: "Georgia, Cambria, 'Times New Roman'",
        color: "rgba(0, 0, 0, 0.8)",
        letterSpacing: "0.16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>

        <Header />
        <HR />

        <div style={{width: "700px",
        lineHeight: "31px",
        paddingBottom: "10em"}}>


          <Draggable3DScene dim={600} pointClasses={require('../data/points.js')}
              projectedError={objective} highlightW={function() {}}>
            <ParametricGraph rResolution={12} thetaResolution={120} />
          </Draggable3DScene>


          <HR />


          <BinaryClassifierSection />
          <HR />

          <PerceptronSection />
          <HR />

          <ObjectiveFunctionSection />
          <HR />

          <LogisticRegressionSection />
          <HR />

          <MaximumMarginSection />
        </div>
      </div>
    );
  }
});

module.exports = Article;
