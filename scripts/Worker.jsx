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
    var processThenReturnResult = (task) => {
      // execute task, then async recurse or terminate
      var t1 = (new Date()).getTime();
      var {result, continuation} = task();
      var t2 = (new Date()).getTime();
      console.log('[Worker] task:', t2 - t1, t2 - t0);

      // if an abort message arrives during a long computation, it should get scheduled here and
      // prevent the postMessage
      inProgressTimer = setTimeout(() => {
        if (t2 - t0 > 3000) {
          self.postMessage({result}); // v. slow.
        }

        // continue processing
        if (continuation) {
          inProgressTimer = setTimeout(() => processThenReturnResult(continuation), 10); // allows us to receive messages in between.
        } else {
          console.log("[Worker] done.");
          inProgressTimer = null;
        }
      }, 10);
    };

    processThenReturnResult(() => WebWorkerGraphSlug.startProcessing(event.data.request));
  }
});

