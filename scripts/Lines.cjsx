React = require 'react'
{rot90, lineEq, scale} = require './VectorUtils.cjsx'


module.exports = Lines = React.createClass
  displayName: 'Lines'

  render: ->
    dim = @props.dim

    top = [ [-dim/2, dim/2], [dim/2, dim/2] ]
    right = [ [dim/2, dim/2], [dim/2, -dim/2] ]
    bottom = [ [dim/2, -dim/2], [-dim/2, -dim/2] ]
    left = [ [-dim/2, -dim/2], [-dim/2, dim/2] ]

    edges = [top, right, bottom, left]

    # the argument vector is in the normal to the line
    <g>
    { require('../data/lines.json').map (w) =>
        {x,y} = v = rot90 w # v is now the direction of the line

        # we construct vectors for the edge of the viewport, then intersection test them.
        # this yields the lambda that we need to multiply v by to reach the edge.
        intersections = edges.map ([p1,p2]) -> lambdaGamma([0,0], [x,y], p1, p2)
          .filter (lg) ->
            if lg?
              [lambda, gamma] = lg
              return 0 < lambda and (0 < gamma <= 1) # not conventional intersection
            else
              return false
        [lambda,gamma] = intersections[0]
        boundaryPoint = scale(lambda)(v)

        <path key={x+""+y} d="M #{-boundaryPoint.x} #{-boundaryPoint.y} L #{boundaryPoint.x} #{boundaryPoint.y}"
          strokeWidth="1.5"
          stroke={if lineEq(w, @props.hoveredLine) then "rgba(30,30,30,0.7)" else "rgba(30,30,30,0.3)"}
          onMouseOver={=> @props.selectLine(w)} /> }
    </g>


# my stackoverflow explanation: http://stackoverflow.com/a/24392281/1941552
lambdaGamma = ([a,b],[c,d],[p,q],[r,s]) ->
  det = (c - a) * (s - q) - (r - p) * (d - b)
  if det is 0
    return null # colinear
  else
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
    return [lambda, gamma]