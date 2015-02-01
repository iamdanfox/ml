/* @flow */
"use strict";

var React = require("react");
var Line = require("./Line.jsx");
var Axes = require("./Axes.jsx");
var AllPoints = require("./AllPoints.jsx");
// var ObjectiveFunctionVis = require("./ObjectiveFunctionVis.cjsx");
var Surface = require("./Surface.jsx");

var DIM = 400;

type F<U, V> = (x:U) => V;
type P2 = {x:number;y:number}

var points = require("../data/points.js");


function project(arg): number {
  var {x:x,y:y} = arg;
  var angleRadians = Math.atan(y/x);
  return (angleRadians/Math.PI + 0.7) % 1;
}


var DataSlider = React.createClass({
  propTypes: {
    fullData: React.PropTypes.array.isRequired,
    color: React.PropTypes.string.isRequired,
    cutoff: React.PropTypes.number.isRequired,
    updateCutoff: React.PropTypes.func.isRequired
  },

  mouseMove: function (e):void {
    var newCutoff = (e.pageX - this.refs.svg.getDOMNode().getBoundingClientRect().left) / DIM;
    this.props.updateCutoff(newCutoff);
  },

  render: function(): ?ReactElement {
    var height = 34;
    return (
      <svg style={{width: DIM, height: height, background: "#e0e0e0", display: "block", margin: "10 0"}}
        ref="svg" onMouseMove={this.mouseMove}>
        <rect x="0" y="0" height={height} width={this.props.cutoff * DIM} style={{fill:"#ccc"}} />
        { this.props.fullData
            .map(project)
            .map((i) => <path d={`M ${i*DIM} 0 L ${i*DIM} ${height}`} strokeWidth="1"
              stroke={this.props.color} style={{opacity: (i < this.props.cutoff) ? 1 : 0.1}} />) }
      </svg>
    );
  }
});


var MainPage = React.createClass({
  getInitialState: function():{highlightedW:?[number, number];cutoffs:[number, number]} {
    return {
      highlightedW: null,
      cutoffs: [1, 1]
    };
  },

  mouseMove: function (e: React.SyntheticElement):void {
    var {left:left, top:top} = this.refs.svg.getDOMNode().getBoundingClientRect();
    var x = e.pageX - left;
    var y = DIM - (e.pageY - top);
    this.highlightW(x - DIM/2, y - DIM/2);
  },

  highlightW: function (x:number,y:number): void {
    this.setState({
      highlightedW: [x,y]
    });
  },

  updateCutoff: function (i:number): F<number, void> {
    return (newCutoff) => {
      var newCutoffs = this.state.cutoffs.slice(0); // clone
      newCutoffs[i] = newCutoff;
      this.setState({
        cutoffs: newCutoffs
      });
    };
  },

  makeHyperplane: function():ReactElement | boolean {
    if (typeof this.state.highlightedW !== "undefined" && this.state.highlightedW !== null) {
      var x = this.state.highlightedW[0];
      var y = this.state.highlightedW[1];
      return (<g>
        <path d={`M 0 0 L ${x} ${y}`} strokeWidth="1.5" stroke={"rgba(255,0,0,0.4)"} />
        <Line w={{x:x,y:y}} dim={DIM} />
      </g>);
    } else {
      return false;
    }
  },

  render: function():?ReactElement {
    var pointClasses = [ points.class0, points.class1 ];
    for (var i=0; i<pointClasses.length; i++) {
      pointClasses[i] = pointClasses[i].filter((p) => project(p) < this.state.cutoffs[i]);
    }

    var style = {background:"#e0e0e0", width:DIM, height:DIM};
    return (
      <div className="main-page">
        <svg style={style} ref="svg" onMouseMove={this.mouseMove}>
          <g transform={"translate("+DIM/2+" "+DIM/2+") scale(1 -1)"}>
            <Axes dim={DIM} />
            <AllPoints pointClasses={pointClasses} />
            { this.makeHyperplane() }
          </g>
        </svg>

        <Surface dim={DIM} pointClasses={pointClasses}
          highlightedW={this.state.highlightedW} highlightW={this.highlightW} />

        <DataSlider color="red" fullData={points.class0}
          cutoff={this.state.cutoffs[0]} updateCutoff={this.updateCutoff(0)} />
        <DataSlider color="blue" fullData={points.class1}
          cutoff={this.state.cutoffs[1]} updateCutoff={this.updateCutoff(1)} />
      </div>
    );
  }
});

module.exports = MainPage;


