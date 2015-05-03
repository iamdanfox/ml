/* @flow */
"use strict";

var React = require("react");
var MainVis = require("./MainVis.jsx");

var {objective, optimise, fastOptimise} = require("./LogisticRegression.jsx");
var K = require('./Katex.jsx');


var LogisticRegressionSection = React.createClass({
  render: function(): ?ReactElement {
    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>
      <h2>Logistic Regression</h2>

      <p style={{width: "100%"}}>Let&apos;s try a probability based model.
      It would be great if we knew: </p>

      <ul>
        <li>the probablity that a vector <K>x</K> was in
        one class, <K tex="p(C_1|x)" /></li>
        <li>and the probability that it&apos;s in
        the other class, <K tex="p(C_2|x)" /></li>
      </ul>

      <p style={{width: "100%"}}>Because if we did, we could just pick whichever was bigger, ie:</p>

      <ul style={{listStyle: "none"}}>
      <li>
        <K tex="log \frac{ p(C_1|x) }{ p(C_2|x) } > 0 ~~~ \rightarrow ~~" />
        return <K>x</K> in <K tex="C_1" />
      </li>
      <li>
        <K tex="log \frac{ p(C_1|x) }{ p(C_2|x) } < 0 ~~~ \rightarrow ~~" />
        return <K>x</K> in <K tex="C_2" />
      </li>
      </ul>

      <p>However, since we&apos;re trying to create a linear model, we need to
      express <K tex="log \frac{ p(C_1|x) }{ p(C_2|x) }" /> as some weight
      vector multiplied by our
      test vector, <K>w \cdot x</K>. </p>

      <K tex="y(x) = log \frac{ p(C_1|x) }{ p(C_2|x) } = w{\cdot}x" />


      <p style={{width: "100%"}}>
        <strong>
        How should we find a good value of <K>w</K>?</strong> Since
        we&apos;re using a probabilistic model, it makes sense to choose
        a <K>w</K> that maximises the likelihood of seeing the training data (MLE).
        ??!?!?!
      </p>

      <K tex="- \displaystyle \sum _i log ~ p(C_1 | x_i)^{y_i} p(C_2 | x_i)^{1 - y_i} " />

      <p>In order to compute this, we need an expression
      for <K>p(C_1|x_i)</K>. Luckily, we can re-arrange the equation
      for <K>y(x)</K> above:</p>

      <K tex="\Rightarrow p(C_1|x) =
      \sigma(w{\cdot}x) =
      \Large \frac{ 1 }{ 1 + e^{w \cdot x} }" />

      <p>Rearranging a bit, we can now compute a useful 'score' for any
      particular <K>w</K> that we want to try out:</p>

      <p>
        <K tex="\displaystyle
        -\sum _i ~ y_i log( \sigma(w \cdot x_i) ) + ( 1 - y_i ) log( 1 - \sigma ( w \cdot x_i ) )" />
      </p>


      <div style={{width: "1000px"}}>
        <MainVis dim={500} projectedError={objective} optimiserFunction={optimise} fastOptimise={fastOptimise} />
      </div>

      <p>
        (<a href={"https://www.cs.ox.ac.uk/" +
        "teaching/materials13-14/machinelearning/lecture_logistic_regression.pdf"}>slide 7, set 5</a>)</p>

      <p>algorithm: gradient descent to find best.yay..
      criticism of logistic regression (???)</p>
    </div>);
  }
});

module.exports = LogisticRegressionSection;
