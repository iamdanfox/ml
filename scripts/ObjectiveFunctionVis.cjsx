React = require 'react'
{rot90, lineEq, scale, dotProduct, sizeSquared} = require './VectorUtils.cjsx'


module.exports = ObjectiveFunctionVis = React.createClass
  displayName: 'ObjectiveFunctionVis'

  render: ->
    dim = @props.dim

    <svg style={background: '#222', width: dim, height: dim}>
      <g transform={"translate("+dim/2+" "+dim/2+")  scale(1 -1) "}>
        { require('../data/lines.json')
            .map (w) =>
              w2 = scale(dim)(w)
              if lineEq(w, @props.hoveredLine)
                lso = leastSquaresObjective(w)
                console.log lso
                <circle key={w2.x} cx={w2.x} cy={w2.y} r="3" fill="red" />
              else
                <circle key={w2.x} cx={w2.x} cy={w2.y} r="3" fill="white" /> }
      </g>
    </svg>



# for every misclassified point, find the distance squared to the separating line
leastSquaresObjective = (w) ->
  errorSquared = 0
  rot90w = rot90 w
  for point in missclassifiedPoints w
    errorSquared += findError(rot90w, point)

  errorSquared

class0points = require '../data/class0points.json'
class1points = require '../data/class1points.json'

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
  return sizeSquared(point) - ( (dp * dp) / sizeSquared(rot90w) )