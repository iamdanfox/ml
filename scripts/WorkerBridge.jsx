/* @flow */
"use strict";
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type PointClasses = [Array<P2>, Array<P2>];


var worker = new Worker("./build/worker.bundle.js");
var subscribers = {};


worker.onmessage = function(event: any) {
  var {reactElementId, mesh} = event.data;

  if (reactElementId in subscribers) {
    subscribers[reactElementId](mesh);
  } else {
    console.log("no subscriber for: ", reactElementId, mesh);
  }
}


module.exports = {

  subscribe: function(reactElementId: string, callback: F<any, void>): (t: number, r: number, pc: PointClasses) => void {
    console.assert(!(reactElementId in subscribers), "No repeat subscribing: " + reactElementId);
    subscribers[reactElementId] = callback;

    return function(thetaResolution: number, rResolution: number, pointClasses: PointClasses) {
      console.assert(
        typeof thetaResolution === "number" &&
        typeof rResolution === "number" &&
        pointClasses instanceof Array);
      worker.postMessage({reactElementId, thetaResolution, rResolution, pointClasses});
    };
  },

  unsubscribe: function(reactElementId: string): void {
    console.assert(reactElementId in subscribers, "Can't unsubscribe " + reactElementId);
    delete subscribers[reactElementId];
  }

}
