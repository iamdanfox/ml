/* @flow */
"use strict";
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};

var worker = new Worker("./build/worker.bundle.js");
var subscribers = {};

worker.onmessage = function(event: any) {
  var {reactElementId, requestNumber, result} = event.data;

  if (reactElementId in subscribers) {
    subscribers[reactElementId](requestNumber, result);
  } else {
    console.log("no subscriber for: ", reactElementId, requestNumber, result, event);
  }
};


module.exports = {

  subscribe: function(
      reactElementId: string,
      callback: (n:number, r:any) => void): (rn: number, t: number, r: number, d: number, pointGroups: Array<PointGrp>) => void {
    console.assert(!(reactElementId in subscribers), "No repeat subscribing: " + reactElementId);
    subscribers[reactElementId] = callback;

    return function request(requestNumber: number, thetaResolution: number, rResolution: number, dim: number, pointGroups: Array<PointGrp>) {
      console.assert(
        typeof thetaResolution === "number" &&
        typeof rResolution === "number" &&
        pointGroups instanceof Array);
      if (reactElementId in subscribers) {
        worker.postMessage({requestNumber, reactElementId, thetaResolution, rResolution, dim, pointGroups});
      } else {
        console.log('ignoring');
      }
    };
  },

  unsubscribe: function(reactElementId: string): void {
    console.assert(reactElementId in subscribers, "Can't unsubscribe " + reactElementId);
    delete subscribers[reactElementId];
  }

};
