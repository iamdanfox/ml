{rot90, dotProduct, sizeSquared} = require './VectorUtils.cjsx'

module.exports =

  projectErrorToRadius: (error) -> 10 - 0.7*Math.log(error+1) # errors are roughly ~1132257, so log makes them reasonable.

  projectErrorForGraph: (error) -> 10 - 0.7* Math.log(error+1)

  # for every misclassified point, find the distance squared to the separating line
  leastSquaresObjective: (w, pointClasses) ->
    rot90w = rot90 w
    misclassifiedPoints(w, pointClasses)
      .map (point) -> findError(rot90w, point)
      .reduce ((e1, e2) -> e1 + e2), 0

misclassifiedPoints = (w, [class0points, class1points]) ->
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