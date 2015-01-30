React = require 'react'
{rot90, lineEq, scale, dotProduct, sizeSquared} = require './VectorUtils.cjsx'


num = 14


grid = [0..num].map (x) -> for y in [0..num]
  x: x/num - 0.5
  y: y/num - 0.5
flatGrid = Array.prototype.concat.apply [], grid

module.exports = ObjectiveFunctionVis = React.createClass
  displayName: 'ObjectiveFunctionVis'

  render: ->
    dim = @props.dim

    <svg style={background: '#222', width: dim, height: dim}>
      <g transform={"translate("+dim/2+" "+dim/2+")  scale(1 -1) "}>
        { flatGrid  # require('../data/lines.json')
            .filter (w) -> not lineEq(w, {x:0,y:0})
            .map (w) =>
              w2 = scale(dim)(w)
              lso = leastSquaresObjective(w)
              console.assert not isNaN(lso)

              radius = 10 - 0.7*Math.log(lso+1) # errors are roughly ~1132257, so log makes them reasonable.

              <circle cx={w2.x} cy={w2.y} r={radius} fill="white" /> }
      </g>
    </svg>



# for every misclassified point, find the distance squared to the separating line
leastSquaresObjective = (w) ->
  rot90w = rot90 w
  misclassifiedPoints(w)
    .map (point) -> findError(rot90w, point)
    .reduce ((e1, e2) -> e1 + e2), 0

class0points = require '../data/class0points.json'
class1points = require '../data/class1points.json'

misclassifiedPoints = (w) ->
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
  return sizeSquared(point) - ( (dp * dp) / sizeSquared(rot90w) )