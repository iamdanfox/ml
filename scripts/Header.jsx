/* @flow */
"use strict";

var React = require("react");


var Header = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="title-page" style={{width: "100%",
        padding: "10px 0",
        display: "flex",
        justifyContent: "center",
      }}>
        <h2 style={{width: "600px",
          textAlign: "center",
          lineHeight: "45px",
          marginTop: "3em"}}>
          <span style={{fontFamily: "Lucida Grande",
            fontSize: "60px",
            letterSpacing: "-2.4px"}}>Understanding Machine Learning</span>
          <small style={{display: "block",
            paddingTop: "2em",
            fontStyle: "italic",
            fontSize: "22px",
            fontFamily: "Georgia, Cambria, 'Times New Roman'",
            fontWeight: "normal"}}>with Linear Classifiers</small>
        </h2>
      </div>
    );
  }
});


module.exports = Header;
