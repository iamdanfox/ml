/* @flow */
"use strict";

var React = require("react/addons");



var PointGroup = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired,
    points: React.PropTypes.array.isRequired,
  },

  render: function(): ?ReactElement {
    var {context} = this.props;

    for (var point of this.props.points) {
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = '#003300';
      context.stroke();
    }
    return null
  },
});



var AwesomeDataComponent = React.createClass({

  getInitialState: function() {
    return {
      pointGroups: [
        {
          label: 0,
          points: [{x: 10, y: 10}, {x: 14, y: 6}, {x: 4, y: 20}],
          generatedBy: {
            center: {x: 10, y: 10},
          },
        },
        {
          points: [{x: 50, y: 50}],
          label: 1,
          generatedBy: {
            center: {x: 50, y: 50},
          },
        }
      ],
      context: null
    };
  },

  componentDidMount: function() {
    var elem = React.findDOMNode(this.refs.canvas);
    this.setState({context: elem.getContext("2d")});
  },

  render: function(): ?ReactElement {
    return <canvas
      ref="canvas"
      width={this.props.width} height={this.props.height}
      style={{border: "1px solid red"}}>

        { this.isMounted() && this.state.pointGroups.map((pg) =>
          <PointGroup context={this.state.context}
            label={pg.label} points={pg.points} generatedBy={pg.generatedBy} />) }

      </canvas>;
  }
});

module.exports = AwesomeDataComponent;
