/* @flow */
"use strict";

var React = require("react");


var PointClass = React.createClass({
  displayName: "PointClass",
  render: function(): ?ReactElement {
    return (<g>
      { this.props.points
          .map((p) => <circle key={p.x + " " + p.y} cx={p.x} cy={p.y} r="3" fill={this.props.color} />) }
    </g>);
  }
});


var AllPoints = React.createClass({
  displayName: "AllPoints",

  propTypes: {
    pointClasses: React.PropTypes.array.isRequired
  },

  render: function(): ?ReactElement {
    var [class0, class1] = this.props.pointClasses;
    return (<g>
      <PointClass points={class0} color="red" />
      <PointClass points={class1} color="blue" />
    </g>);
  }
});


module.exports = AllPoints;
