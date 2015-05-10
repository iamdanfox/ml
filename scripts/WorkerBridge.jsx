/* @flow */
"use strict";
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};

type PointGrp = {label: number; points: Array<P2>; editingInProgress: bool};
type Request = {
  thetaResolution: number;
  rResolution: number;
  pointGroups: Array<PointGrp>;
};
type Callback = (r: Result) => void;
type Result = {hues: Array<any>};


var worker = new Worker("./build/worker.bundle.js");

module.exports = {
  request: function(request: Request, callback: Callback): void {
    // set up return path.  I think this should overwrite old listeners.
    worker.onmessage = function(event: any) {
      callback(event.data.result);
    };
    worker.postMessage({request});
  },

  abort: function(): void {
    console.log("[Bridge] abort");
    worker.postMessage({});
  }
};
