/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Request = {
  thetaResolution: number;
  rResolution: number;
  pointGroups: Array<PointGrp>;
};
type Result = {hsls: Array<any>};


var WebWorkerGraphSlug = require("./WebWorkerGraphSlug.jsx");
var inProgressTimer = null;



self.addEventListener('message', function(event) {
  if (inProgressTimer) {
    clearTimeout(inProgressTimer); // aborts current job
  }

  if (event.data.request) {
    var t0 = (new Date()).getTime();
    var doConstrainedProcessing = (closure) => {
      // execute closure, then async recurse or terminate
      var t1 = (new Date()).getTime();
      var {result, continuation} = closure();
      var t2 = (new Date()).getTime();
      console.log('[Worker] task:', t2 - t1, t2 - t0);

      if (t2 - t0 > 2700) {
        self.postMessage({result});
      }

      // continue processing
      if (continuation) {
        inProgressTimer = setTimeout(() => doConstrainedProcessing(continuation), 10); // allows us to receive messages in between.
      } else {
        console.log("[Worker] done.");
        inProgressTimer = null;
      }
    }

    doConstrainedProcessing(() => WebWorkerGraphSlug.startProcessing(event.data.request));
  }
});

