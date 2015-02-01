/* @flow */

declare class Point2 {
  x: number;
  y: number
}

module.exports = {
  lineEq: function (p1:Point2, p2:Point2): boolean {
    return (p1 != null && p2 != null) && (p1.x === p2.x) && (p1.y === p2.y)
  },
  // counter clockwise rotation of a vector, by 90 degrees
  rot90: function (arg: Point2): Point2 {
    var {x:x,y:y} = arg;
    return {
      x: -y,
      y: x
    }
  },
  dotProduct: function (a:Point2,b:Point2):number {
    var {x:x1,y:y1} = a;
    var {x:x2,y:y2} = b;
    return x1*x2 + y1*y2;
  },
  scale: function (sf:number):mixed {
    return function (arg:Point2):Point2 {
      var {x:x, y:y} = arg
      return {
        x: x*sf,
        y: y*sf
      }
    }
  },
  sizeSquared: function (arg: Point2) {
    var x = arg.x;
    var y = arg.y;
    x*x + y*y
  },
  add: function (a: Point2): mixed {
    return function (b): Point2 {
      return {
        x: a.x + b.x,
        y: a.y + b.y
      }
    }
  }
}
