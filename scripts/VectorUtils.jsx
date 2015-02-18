/* @flow */
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
"use strict";

function sizeSquared(arg: P2): number {
  var x = arg.x;
  var y = arg.y;
  return x * x + y * y;
}

module.exports = {
  lineEq: function(p1: P2, p2: P2): boolean {
    return (typeof p1 !== "undefined" && p1 !== null &&
      typeof p2 !== "undefined" && p2 !== null) &&
      (p1.x === p2.x) && (p1.y === p2.y);
  },

  // counter clockwise rotation of a vector, by 90 degrees
  rot90: function(arg: P2): P2 {
    var {x: x, y: y} = arg;
    return {
      x: -y,
      y: x
    };
  },

  dotProduct: function(a: P2, b: P2): number {
    var {x: x1, y: y1} = a;
    var {x: x2, y: y2} = b;
    return x1 * x2 + y1 * y2;
  },

  scale: function(sf: number): F<P2, P2> {
    return function(arg: P2): P2 {
      var {x: x, y: y} = arg;
      return {
        x: x * sf,
        y: y * sf
      };
    };
  },

  sizeSquared: sizeSquared,

  modulus: function(arg: P2): number {
    return Math.sqrt(sizeSquared(arg));
  },

  add: function(a: P2): F<P2, P2> {
    return function(b: P2): P2 {
      return {
        x: a.x + b.x,
        y: a.y + b.y
      };
    };
  },

  subtract: function(a: P2): F<P2, P2> {
    return function(b: P2): P2 {
      return {
        x: a.x - b.x,
        y: a.y - b.y
      };
    };
  },
};
