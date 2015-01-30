React = require 'react'

dim = 400

lineEq = (p1, p2) ->
  (p1? and p2?) and (p1.x is p2.x) and (p1.y is p2.y)

# counter clockwise rotation of a vector, by 90 degrees
rot90 = ({x,y}) ->
  x: -y
  y: x

dotProduct = ({x:x1,y:y1}, {x:x2,y:y2}) -> x1*x2 + y1*y2

scale = (sf) -> ({x,y}) ->
  x: x*sf
  y: y*sf

sizeSquared = ({x,y}) -> x*2 + y*2



class0points = require './class0points.json'
class1points = require './class1points.json'


# for every misclassified point, find the distance squared to the separating line
leastSquaresObjective = (w) ->
  errorSquared = 0
  rot90w = rot90 w
  for point in missclassifiedPoints w
    errorSquared += findError(rot90w, point)

  errorSquared

missclassifiedPoints = (w) ->
  as = class0points.filter (p) -> dotProduct(p, w) <= 0
  bs = class1points.filter (p) -> dotProduct(p, w) > 0
  return as.concat(bs)

# returns the square of the distance to rot90w's line
findError = (rot90w, point) ->
  # consider a triangle made of the vector `point`, the line `rot90w` and the distance `d`.
  # let `theta` be the angle at the origin
  # trigonometry: d = |point|*sin(theta)
  # we desire d^2
  #           d^2 = |point|^2 * sin^2(theta)
  # trignometric identity
  #           d^2 = |point|^2 * (1 - cos^2(theta))
  # we can find `cos(theta)` using the dot product
  #           d^2 = |point|^2 * (1 - (rot90w . point)^2/(|rot90w|*|point|)^2 )
  # eliminating factors of |point|^2
  #           d^2 = |point|^2 - (rot90w . point)^2 / |rot90w|^2

  dp = dotProduct rot90w, point
  console.log dp * dp
  return sizeSquared(point) - ( (dp * dp) / sizeSquared(rot90w) )


module.exports = MainPage = React.createClass
  displayName: 'MainPage'

  getInitialState: ->
    hoveredLine: null

  selectLine: (line) ->
    @setState hoveredLine: line

  render: ->
    # console.log JSON.stringify allPoints

    yAxis = "M#{ 0 } #{ dim } L#{ 0 } #{ -dim }"
    xAxis = "M#{ -dim } #{ 0 } L#{ dim } #{ 0 }"

    <div className='main-page'>
      <h1>Hard visualisation</h1>
      <p><a href="https://docs.google.com/document/d/1a93Snwyk2De1WCbcvVH24oXq3HFlw3Z03Gx_u_6Xowg/edit#">Google Doc</a></p>

      <h2>Main vis</h2>
      <svg style={background:'#e0e0e0', width:dim, height:dim}>
        <g transform={"translate("+dim/2+" "+dim/2+") scale(1 -1)"}>
          <path d={xAxis} strokeWidth="3" stroke="#d0d0d0" />
          <path d={yAxis} strokeWidth="3" stroke="#d0d0d0" />

          <Lines dim={dim} selectLine={@selectLine} hoveredLine={@state.hoveredLine} />
          <Points points={require './class0points.json'} color="red" />
          <Points points={require './class1points.json'} color="blue" />
        </g>
      </svg>

      <svg style={background: '#222', width: dim, height: dim}>
        <g transform={"translate("+dim/2+" "+dim/2+")  scale(1 -1) "}>
          { require('./lines.json')
              .map (w) =>
                w2 = scale(dim)(w)
                if lineEq(w, @state.hoveredLine)
                  # console.log leastSquaresObjective(w)
                  <circle key={w2.x} cx={w2.x} cy={w2.y} r="3" fill="red" />
                else
                  <circle key={w2.x} cx={w2.x} cy={w2.y} r="3" fill="white" /> }
        </g>
      </svg>
    </div>


Points = React.createClass
  displayName: 'Points'

  render: ->
    <g>
      {@props.points.map (p) => <circle key={p.x} cx={p.x} cy={p.y} r="3" fill={@props.color} /> }
    </g>


Lines = React.createClass
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
    { require('./lines.json').map (w) =>
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

# each p needs to be a 2-element array:[x,y]
intersects = (p1,p2,p3,p4) ->
  if (lg = lambdaGamma(p1,p2,p3,p4))?
    [lambda, gamma] = lg
    return (0 < lambda <= 1) and (0 < gamma <= 1)
  else
    return false