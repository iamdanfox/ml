/* @flow */
var React = require('react');
var {rot90:rot90, lineEq:lineEq, scale:scale} = require('./VectorUtils.jsx');



var Line = React.createClass({
  displayName: 'Line',

  propTypes: {
    w: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired,
    dim: React.PropTypes.number.isRequired
  },

  render: function(): ?ReactElement {
    var boundaryPoint;
    if (lineEq({x:0,y:0}, this.props.w)) {
      boundaryPoint = {
        x: 0,
        y: 0
      };
    } else {
      var dim = this.props.dim;
      var top = [ [-dim/2, dim/2], [dim/2, dim/2] ];
      var right = [ [dim/2, dim/2], [dim/2, -dim/2] ];
      var bottom = [ [dim/2, -dim/2], [-dim/2, -dim/2] ];
      var left = [ [-dim/2, -dim/2], [-dim/2, dim/2] ];

      var v = rot90(this.props.w); // v is now the direction of the line
      var {x:x,y:y} = v;

      // we construct vectors for the edge of the viewport, then intersection test them.
      // this yields the lambda that we need to multiply v by to reach the edge.
      var intersections = [top, right, bottom, left]
        .map((arg) => lambdaGamma([0,0], [x,y], arg[0], arg[1]))
        .filter( function(lg) {
          if (lg != null) {
            var [lambda, gamma] = lg;
            return 0 < lambda && 0 < gamma && gamma <= 1; // not conventional intersection
          } else
            return false;
        });
      var first = intersections[0];
      if (first != null) {
        var [lambda,gamma] = first;
        boundaryPoint = scale(lambda)(v);
      } else {
        throw new Error();
      }
    }

    return (
      <path d={`M ${-boundaryPoint.x} ${-boundaryPoint.y} L ${boundaryPoint.x} ${boundaryPoint.y}`}
        strokeWidth="1.5"
        stroke="rgba(30,30,30,0.3)" />
    );
  }
});

module.exports = Line;

// my stackoverflow explanation: http://stackoverflow.com/a/24392281/1941552
function lambdaGamma (arg1, arg2, arg3, arg4) {
  var [a,b] = arg1;
  var [c,d] = arg2;
  var [p,q] = arg3;
  var [r,s] = arg4;

  var det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0)
    return null; // colinear
  else {
    var lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    var gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return [lambda, gamma];
  }
}