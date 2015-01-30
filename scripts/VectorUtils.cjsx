module.exports =
  lineEq: (p1, p2) ->
    (p1? and p2?) and (p1.x is p2.x) and (p1.y is p2.y)

  # counter clockwise rotation of a vector, by 90 degrees
  rot90: ({x,y}) ->
    x: -y
    y: x

  dotProduct: ({x:x1,y:y1}, {x:x2,y:y2}) -> x1*x2 + y1*y2

  scale: (sf) -> ({x,y}) ->
    x: x*sf
    y: y*sf

  sizeSquared: ({x,y}) -> x*x + y*y

  add: (a) -> (b) ->
    x: a.x + b.x
    y: a.y + b.y
