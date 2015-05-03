/* @flow */
"use strict";

type P2 = {x: number; y: number};
type State = {
  nextStep: ?number;
  timer: ?number;
}

var React = require("react");
var {SimpleHyperplaneVis, Hyperplane} = require("./SimpleHyperplaneVis.jsx");
var Perceptron = require("./Perceptron.jsx");

var INITIAL_POINTS = require('../data/points.js');
var INITIAL_W = {x: 80, y: 60};
var perceptronSteps:Array<P2> = Perceptron.computePerceptronWeight(INITIAL_W, INITIAL_POINTS);



var PerceptronSection = React.createClass({
  getInitialState: function(): State {
    return {
      nextStep: null, // null implies animation isn't started.
      timer: null
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.onScroll, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onScroll, false);
    clearTimeout(this.state.timer);
  },

  onScroll: function() {
    if (this.state.nextStep === null) {
      var el = React.findDOMNode(this.refs.container);
      var {top, bottom} = el.getBoundingClientRect();
      var isVisible = (top >= 0) && (bottom <= window.innerHeight);

      if (isVisible) {
        this.startAnimation();
      }
    }
  },

  startAnimation: function() {
    clearTimeout(this.state.timer);
    this.setState({
      nextStep: 0,
      timer: setInterval(this.advanceStep, 800)
    });
  },

  advanceStep: function() {
    if (this.state.nextStep === perceptronSteps.length) {
      clearTimeout(this.state.timer);
    } else {
      this.setState({nextStep: 1 + this.state.nextStep});
    }
  },

  render: function(): ?ReactElement {

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>
      <h2>The Perceptron</h2>
      <p>A good idea would be to look through all our known training data
      and find a hyperplane that classifies them all correctly.  The
      <em> Perceptron</em> algorithm does exactly this.</p>

      <code>
      Initialize vector w<br />
      cycle through points<br />
      if w classifies a point x incorrectly, subtract x from w.<br />
      repeat until w makes no mistakes
      </code>

      <div ref="container">
        <SimpleHyperplaneVis dim={400} highlightW={function() {}} pointClasses={INITIAL_POINTS}>
          { this.state.nextStep && <Hyperplane w={perceptronSteps[this.state.nextStep - 1]} dim={400} />}
        </SimpleHyperplaneVis>
        <div>
          <button onClick={this.startAnimation}>Start again</button>
        </div>
      </div>

      <p>The perceptron is not perfect however.  Since it can choose any
      hyperplane that makes no mistakes, it will sometimes give you one that
      performs badly in the real world. </p>


      <img src="http://i.imgur.com/QlNAio9.jpg" style={{maxWidth: "70%", margin: "1em" }} />

      <p>Also, if there are no hyperplanes that separate the two classes,
      the perceptron algorithm freaks out. (Note that Voted / Averaged Perceptrons
      can help this.</p>
    </div>);
  }
});

module.exports = PerceptronSection;
