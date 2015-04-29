/* @flow */
"use strict";

var React = require("react");
var HR = require("./HR.jsx");
var Header = require("./Header.jsx");
var MainPage = require("./MainPage.jsx");


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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "10em"}}>


          <p style={{width: '100%'}}>
          A <em>binary classifier</em> is something that
          can learn how to put unseen objects into one of two classes based on examples
          that are already in those classes.
          </p>

          <img src="http://i.imgur.com/BGPlM09.jpg" style={{maxWidth: "60%", margin: "1em" }} />

          <p>Linear classifiers accept objects represented as vectors, e.g. [10, -3, 0, 4],
          and make their decisions using a linear function of the input vector. </p>

          <p>
          If our objects are
          one-dimensional, the decision boundary is just a single number.
          Everything on one side gets put in one class
          and everything on the other side goes in the other. In two
          dimensions, it&apos;s a line and in three dimensions, the decision
          boundary is a plane.
          </p>

          <img src="http://i.imgur.com/jZg6nCx.jpg" style={{maxWidth: "120%", margin: "1em" }} />

          <p>
          Since the boundary is a hyperplane, we can represent it by a normal vector, n,
          and an offset vector, c.  In practice, it&apos;s convenient
          to add one fake dimension (with value 1) to every object in our data because
          this lets us define the same hyperplane using just one vector.
          This is called <em>homogeneous form</em>.</p>

          <img src="http://i.imgur.com/XaHtzYx.jpg" style={{maxWidth: "50%", margin: "1em" }} />

          <p>Our classifier can then use this vector n to decide the
          class for an unseen vector x = [x1, x2].
          It computes [x1, x2, 1] . n and if the result is positive,
          returns class A, otherwise it returns class B.</p>

          <p>The question is, how can we learn the value of the
          vector n from our training examples?</p>

          <HR />

          <h2>The Perceptron</h2>

          <p>A good idea would be to look through all our known training data
          and find a hyperplane that classifies them all correctly.  The
          Perceptron algorithm is one example of this.</p>

          <code>
          Initialize vector w<br />
          cycle through points<br />
          if w classifies a point x incorrectly, subtract x from w.<br />
          repeat until w makes no mistakes
          </code>

          <p>[[[ANIMATION ALG VIS. AUto start when you scroll down.]]]</p>

          <p>The perceptron is not perfect however.  Since it can choose any
          hyperplane that makes no mistakes, it will sometimes give you one that
          performs badly in the real world. </p>


          <img src="http://i.imgur.com/QlNAio9.jpg" style={{maxWidth: "70%", margin: "1em" }} />

          <p>Also, if there are no hyperplanes that separate the two classes,
          the perceptron algorithm freaks out. (Note that Voted / Averaged Perceptrons
          can help this.</p>

          <HR />

          <h2>Objective Functions</h2>

          <p>How can we choose a better w?  From eyeballing a few possibilities, it&apos; clear
          which ones will be good and which will be bad, but we need some way to quantify this.</p>

          <p>[[Same data, show: [Bad, Good, Bad]]]</p>

          <p>An <em>objective function</em> can
          compute a score for each potential vector w
          so that we can automatically choose the best one.  Unsurprisingly, the perceptron
          objective function isn&apos;t particularly helpful:</p>

          <div style={{width: "850px"}}>
            <MainPage dim={400}  />
          </div>

          <p>As you can see from the right hand diagram, there are a large
          number of possibilities for the vector w that all share the maximum objective
          function.</p>

          <HR />

          <h2>Logistic Regression</h2>
        </div>
      </div>
    );
  }
});

module.exports = Article;
