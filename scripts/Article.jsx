/* @flow */
"use strict";

var React = require("react");
var HR = require("./HR.jsx");
var Header = require("./Header.jsx");
var MainPage = require("./MainPage.jsx");

var {perceptronError} = require("./LeastSquares.jsx");
var LogisticRegression = require("./LogisticRegression.jsx");
var MaximumMargin = require("./MaximumMargin.jsx");
var K = require('./Katex.jsx');




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

          <HR />

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

          <p>How can we choose a better <K>w</K>?  From
          eyeballing a few possibilities, it&apos;s clear
          which ones will be good and which will be bad, but we need some way to quantify this.</p>

          <img src="http://i.imgur.com/Ds0JJjb.jpg" style={{maxWidth: "100%", margin: "1em" }} />

          <p>
          An <em>objective function</em> can
          compute a score for each potential
          vector <K>w</K> so
          that we can automatically choose the best one.  The blue pie-shape on the right
          shows the value of the perceptron objective for all the possible choices of the
          vector <K>w</K>.  Hover over the graph on the
          left to see what one particular choice
          of <K>w</K> looks like.</p>

          <div style={{width: "850px"}}>
            <MainPage dim={400} projectedError={perceptronError}  />
          </div>

          <p>As you can see from the right hand diagram, there are a large
          number of possibilities for the
          vector <K>w</K> that all share the maximum objective
          function.</p>

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
