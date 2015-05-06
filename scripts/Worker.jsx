/* @flow */
"use strict";

type P2 = {x: number; y: number};
type PointGrp = {label: number; points: Array<P2>};
type Request = {
  vertices: Array<any>;
  faces: Array<any>;
  boundingBox: any;
  pointGroups: Array<PointGrp>;
};
type Result = {faces: Array<any>};


var WebWorkerGraphSlug = require("./WebWorkerGraphSlug.jsx");
var inProgressTimer = null;



self.addEventListener('message', function(event) {
  var request: Request = event.data.request;

  if (inProgressTimer) {
    console.log("[WORKER aborting]");
    clearTimeout(inProgressTimer); // aborts current job
  }

  console.log("[WORKER received request]");

  var doConstrainedProcessing = (closure) => {
    // execute closure, then async recurse or terminate
    var {result, continuation} = closure();

    // send intermediate results to main thread
    self.postMessage({result});

    // continue processing
    if (continuation) {
      console.log("[WORKER continuing]", continuation);
      inProgressTimer = setTimeout(() => doConstrainedProcessing(continuation), 300); // allows us to receive messages in between.
    } else {
      console.log("[WORKER done]");
      inProgressTimer = null;
    }
  };

  doConstrainedProcessing(() => WebWorkerGraphSlug.startProcessing(request));

});

