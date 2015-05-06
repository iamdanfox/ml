/* @flow */
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};

"use strict";

function sizeSquared(arg: P2): number {
  var x = arg.x;
  var y = arg.y;
  return x * x + y * y;
}

function dotProduct(a: P2, b: P2): number {
  var {x: x1, y: y1} = a;
  var {x: x2, y: y2} = b;
  return x1 * x2 + y1 * y2;
}

function modulus(arg: P2): number {
  return Math.sqrt(sizeSquared(arg));
}

function scale(sf: number): F<P2, P2> {
  return function(arg: P2): P2 {
    var {x: x, y: y} = arg;
    return {
      x: x * sf,
      y: y * sf
    };
  };
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

  rotate: function(theta: number, arg: P2): P2 {
    return {
      x: arg.x * Math.cos(theta) - arg.y * Math.sin(theta),
      y: arg.x * Math.sin(theta) + arg.y * Math.cos(theta),
    };
  },

  dotProduct: dotProduct,

  scale: scale,

  sizeSquared: sizeSquared,

  modulus: modulus,

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

  classify: function(w: P2, vectorToClassify: P2): number {
    if (dotProduct(vectorToClassify, w) > 0) {
      return 0;
    } else {
      return 1;
    }
  },

  classTransform: function(classificationResult: number): number {
    if (classificationResult === 0) {
      return -1;
    } else {
      console.assert(classificationResult === 1);
      return 1;
    }
  },
};
