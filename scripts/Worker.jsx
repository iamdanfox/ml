/* @flow */
"use strict";

var {respond} = require("./WebWorkerGraphSlug.jsx");

self.addEventListener('message', function(event) {
  var {reactElementId, requestNumber, thetaResolution, rResolution, dim, pointGroups} = event.data;
  var start = (new Date()).getTime();
  var result = respond(thetaResolution, rResolution, dim, pointGroups);
  console.log("[elapsed]:", (new Date()).getTime() - start);
  self.postMessage({reactElementId, requestNumber, result});
});

