/* @flow */
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type P2t = {x: number; y: number; t: number};
type PointClasses = [Array<P2>,Array<P2>];

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

  pointClassesTransform: function(pointClasses: PointClasses): Array<P2t> {
    var [class0, class1] = pointClasses;
    var transformedClass0 = class0.map(function(p) {
      return {x: p.x, y: p.y, t: -1};
    });
    var transformedClass1 = class1.map(function(p) {
      return {x: p.x, y: p.y, t: 1};
    });
    return transformedClass0.concat(transformedClass1);
  },

  pointClassesTransformZeroOne: function(pointClasses: PointClasses): Array<P2t> {
    var [class0, class1] = pointClasses;
    var transformedClass0 = class0.map(function(p) {
      return {x: p.x, y: p.y, t: 1};
    });
    var transformedClass1 = class1.map(function(p) {
      return {x: p.x, y: p.y, t: 0};
    });
    return transformedClass0.concat(transformedClass1);
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
