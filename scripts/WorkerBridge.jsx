/* @flow */
"use strict";
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];

var worker = new Worker("./build/worker.bundle.js");
var subscribers = {};

worker.onmessage = function(event: any) {
  var {reactElementId, result} = event.data;

  if (reactElementId in subscribers) {
    subscribers[reactElementId](result);
  } else {
    console.log("no subscriber for: ", reactElementId, result, event);
  }
};


module.exports = {

  subscribe: function(
      reactElementId: string,
      callback: F<any, void>): (t: number, r: number, d: number, pc: PointClasses) => void {
    console.assert(!(reactElementId in subscribers), "No repeat subscribing: " + reactElementId);
    subscribers[reactElementId] = callback;

    return function request(thetaResolution: number, rResolution: number, dim: number, pointClasses: PointClasses) {
      console.assert(
        typeof thetaResolution === "number" &&
        typeof rResolution === "number" &&
        pointClasses instanceof Array);
      console.log('sending', reactElementId, pointClasses);
      worker.postMessage({reactElementId, thetaResolution, rResolution, dim, pointClasses});
    };
  },

  unsubscribe: function(reactElementId: string): void {
    console.assert(reactElementId in subscribers, "Can't unsubscribe " + reactElementId);
    delete subscribers[reactElementId];
  }

};