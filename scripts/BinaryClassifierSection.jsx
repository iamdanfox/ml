/* @flow */
"use strict";

var React = require("react");
var K = require('./Katex.jsx');



var BinaryClassifierSection = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>

        <p style={{width: '100%'}}>
        A <em>binary classifier</em> is something that
        can learn how to put unseen objects into one of two classes based on examples
        that are already in those classes.
        </p>

        <img src="http://i.imgur.com/BGPlM09.jpg" style={{maxWidth: "60%", margin: "1em" }} />

        <p>
        Linear classifiers accept objects represented as vectors,
        e.g. <K tex="[10, -3, 0, 4]" /> and
        make their decisions using a linear function of the input vector.
        </p>

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
        Since the boundary is a hyperplane, we can represent it by a normal
        vector, <K>n</K>,
        and an offset vector, <K>c</K>.  In practice, it&apos;s convenient
        to add one fake dimension (with value 1) to every object in our data because
        this lets us define the same hyperplane using just one vector.
        This is called <em>homogeneous form</em>.</p>

        <img src="http://i.imgur.com/XaHtzYx.jpg" style={{maxWidth: "50%", margin: "1em" }} />

        <p>Our classifier can then use this
        vector <K>n</K> to decide the
        class for an unseen vector <K>x = [x_1, x_2]</K>. It
        computes <K tex="[x_1, x_2, 1] \cdot n" /> and
        if the result is positive,
        returns class A, otherwise it returns class B.</p>

        <p>The question is, how can we learn the value of the
        vector n from our training examples?</p>
      </div>
    );
  }
});

module.exports = BinaryClassifierSection;
