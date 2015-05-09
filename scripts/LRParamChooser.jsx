/* @flow */
"use strict";

var LogisticRegression = require("./LogisticRegression.jsx");
var React = require("react/addons");

var LRParamChooser = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    updateParams: React.PropTypes.func.isRequired,
  },

  updateParam: function(paramName: string, newValue: number): () => void {
    return () => {
      var newParams = JSON.parse(JSON.stringify(this.props.params));
      newParams[paramName] = newValue;
      this.props.updateParams(newParams);
    };
  },

  makeButtons: function(paramName: string): Array<ReactElement> {
    return LogisticRegression.paramOptions(paramName).map((paramValue) =>
              <button disabled={this.props.params[paramName] === paramValue}
                onClick={this.updateParam(paramName, paramValue)}>
                {paramValue}
              </button>);
  },

  render: function(): ?ReactElement {
    return (
      <div style={{padding: "30px"}}>
        <h2>Logistic Regression</h2>
        { ["NU", "ACCEPTING_GRAD", "MAX_STOPS"].map((paramName) =>
            <div>
              <p>{paramName}</p>
              <p>{ this.makeButtons(paramName) }</p>
            </div>) }

      </div>
    );
  }
});

module.exports = LRParamChooser;
