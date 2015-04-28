/* @flow */
"use strict";

var React = require("react");
var Surface = require("./Surface.jsx");
var {projectedError, projectedError2, perceptronError} = require("./LeastSquares.jsx");
var Modes = require("./Modes.js");
var HyperplaneVis = require("./HyperplaneVis.jsx");
var {computePerceptronWeight} = require("./Perceptron.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");

type P2 = {x: number; y: number}


var Header = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="title-page" style={{width: "100%",
        padding: "10px",
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

var HR = React.createClass({
  render: function(): ?ReactElement {
    return <hr style={{width: "100px",
      borderWidth: "1px 0 0 0",
      opacity: 0.5,
      margin: "2em auto 2em auto"}} />;
  }
});


var MainPage = React.createClass({
  propTypes: {
    dim: React.PropTypes.number.isRequired,
  },

  getInitialState: function(): {highlightedW: ?[number, number]; mode: number} {
    return {
      highlightedW: null,
      mode: Modes.TRY_HYPERPLANE,
      pointClasses: require("../data/points.js"),
    };
  },

  highlightW: function(x: number, y: number): void {
    this.setState({
      highlightedW: [x, y]
    });
  },

  updatePointClasses: function(newPointClasses: [Array<P2>, Array<P2>]): void {
    this.setState({
      pointClasses: newPointClasses,
    });
  },

  updateMode: function(nextMode: number): () => void {
    return () =>
      this.setState({
        mode: nextMode,
      });
  },

  handleClearData: function(): void {
    this.setState({
      pointClasses: this.state.pointClasses.map(function() { return []; }),
    });
  },

  handleResetData: function(): void {
    this.setState({
      pointClasses: require("../data/points.js"),
    });
  },

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
        lineHeight: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>


          <p>Machine learning is all about learning from data in order to
          make decisions. This article uses binary linear classifiers as an example.</p>

          <HR />

          <p style={{width: '100%'}}>What is a binary linear classifier?</p>

          <p style={{width: '100%'}}>Well, a "binary classifier" is something that
          takes in objects and puts then into one of two classes. These objects must be
          represented as a mathematical vector, e.g. x1 = [1,2,3,4].</p>

          <img src="http://i.imgur.com/BGPlM09.jpg" style={{maxWidth: "50%", margin: "1em" }} />

          <p>A classifier is "linear" if it makes this decision using a
          linear function of an input vector x.  If our objects are
          one-dimensional, the decision boundary is just a point. In two
          dimensions, it&apos;s a line and in three dimensions, the decision
          boundary is a plane.</p>


          <img src="http://i.imgur.com/jZg6nCx.jpg" style={{maxWidth: "120%", margin: "1em" }} />



        </div>






        { false && <div>

          <div>
            <button disabled={this.state.mode === Modes.TRY_HYPERPLANE}
              onClick={this.updateMode(Modes.TRY_HYPERPLANE)}>Try hyperplane</button>
            <button disabled={this.state.mode === Modes.ADD_DATA}
              onClick={this.updateMode(Modes.ADD_DATA)}>Add Data</button>
            <button disabled={this.state.mode === Modes.REMOVE_DATA}
              onClick={this.updateMode(Modes.REMOVE_DATA)}>Remove Data</button>
            <button onClick={this.handleClearData}>Clear Data</button>
            <button onClick={this.handleResetData}>Reset Data</button>
          </div>

          <HyperplaneVis
            dim={this.props.dim}
            mode={this.state.mode}
            pointClasses={this.state.pointClasses}
            updatePointClasses={this.updatePointClasses}
            highlightedW={this.state.highlightedW}
            highlightW={this.highlightW} />

          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={projectedError2}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW}
            optimiserFunction={computePerceptronWeight} />

          { false &&
            <Surface dim={this.props.dim}
              pointClasses={this.state.pointClasses} projectedError={perceptronError}
              highlightedW={this.state.highlightedW} highlightW={this.highlightW} />
          }

          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={projectedError}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

          <Surface dim={this.props.dim}
            pointClasses={this.state.pointClasses} projectedError={MaximumMargin.objective}
            highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

        </div> }

      </div>
    );
  }
});

module.exports = MainPage;
