/* @flow */
"use strict";

var React = require("react");
var HR = require("./HR.jsx");
var Header = require("./Header.jsx");
var MainPage = require("./MainPage.jsx");

var LogisticRegression = require("./LogisticRegression.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var K = require('./Katex.jsx');
var BinaryClassifierSection = require('./BinaryClassifierSection.jsx');
var PerceptronSection = require('./PerceptronSection.jsx');


var ObjectiveFunctionSection = require('./ObjectiveFunctionSection.jsx');


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


          <div style={{width: "850px"}}>
            <MainPage dim={400} projectedError={LogisticRegression.objective}  />
          </div>

          <p>(<a href="https://www.google.com/url?q=https%3A%2F%2Fwww.cs.ox.ac.uk%2Fteaching%2Fmaterials13-14%2Fmachinelearning%2Flecture_logistic_regression.pdf&sa=D&sntz=1&usg=AFQjCNFe-3EOTDqUonxMk8NwJr4ipEsK7A">
            slide 7, set 5</a>)</p>

          <p>algorithm: gradient descent to find best.yay..
          criticism of logistic regression (???)</p>

          <HR />


          <h2>Maximum Margin (SVM)</h2>

          <p>[objective function]
          <a href="https://www.cs.ox.ac.uk/teaching/materials13-14/machinelearning/lecture_lsvm.pdf">
          Slide 9</a></p>


          <p>
            <K tex="argmax_w \{ \frac{||w||^2}{2} \}" />
          </p>
          <p>
            <K tex="s.t. ~~~~ y_i  ( w \cdot x_i ) \geq 1, ~~~~ \forall i" />
          </p>

          <div style={{width: "850px"}}>
            <MainPage dim={400} projectedError={MaximumMargin.objective}  />
          </div>

          <p>Describe lagrangian/KKT method for solving this (?!?! needs work to understand this)</p>

        </div>
      </div>
    );
  }
});

module.exports = Article;
