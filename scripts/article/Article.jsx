/* @flow */
"use strict";

var React = require("react/addons");
var HR = require("./HR.jsx");

var Header = require("./Header.jsx");
var BinaryClassifierSection = require("./BinaryClassifierSection.jsx");
var PerceptronSection = require("./PerceptronSection.jsx");
var ObjectiveFunctionSection = require("./ObjectiveFunctionSection.jsx");
var LogisticRegressionSection = require("./LogisticRegressionSection.jsx");
var MaximumMarginSection = require("./MaximumMarginSection.jsx");


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
