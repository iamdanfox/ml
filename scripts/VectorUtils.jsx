/* @flow */


module.exports = {
  lineEq: function (p1:{x: number; y: number}, p2:{x: number; y: number}): boolean {
    return (p1 != null && p2 != null) && (p1.x === p2.x) && (p1.y === p2.y)
  },
  // counter clockwise rotation of a vector, by 90 degrees
  rot90: function (arg: {x: number; y: number}): {x: number; y: number} {
    var {x:x,y:y} = arg;
    return {
      x: -y,
      y: x
    }
  },
  dotProduct: function (a:{x: number; y: number},b:{x: number; y: number}): number {
    var {x:x1,y:y1} = a;
    var {x:x2,y:y2} = b;
    return x1*x2 + y1*y2;
  },
  scale: function (sf:number) {
    return function (arg:{x: number; y: number}):{x: number; y: number} {
      var {x:x, y:y} = arg
      return {
        x: x*sf,
        y: y*sf
      }
    }
  },
  sizeSquared: function (arg: {x: number; y: number}): number {
    var x = arg.x;
    var y = arg.y;
    return x*x + y*y;
  },
  add: function (a: {x: number; y: number}) {
    return function (b): {x: number; y: number} {
      return {
        x: a.x + b.x,
        y: a.y + b.y
      }
    }
  }
}
