/* @flow */
"use strict";
type F<U, V> = (x: U) => V;
type P2 = {x: number; y: number};

type PointGrp = {label: number; points: Array<P2>};
type Request = {
  vertices: Array<any>;
  faces: Array<any>;
  boundingBox: any;
  pointGroups: Array<PointGrp>;
};
type Callback = (r: Result) => void;
type Result = {hsls: Array<any>};


var worker = new Worker("./build/worker.bundle.js");

module.exports = {
  request: function(request: Request, callback: Callback): void {
    // set up return path.  I think this should overwrite old listeners.
    worker.onmessage = function(event: any) {
      callback(event.data.result);
    };
    console.log('call to postmessage');
    worker.postMessage({request}); // this is taking 6 seconds.
  }
};
