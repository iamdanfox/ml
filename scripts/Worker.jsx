/* @flow */
"use strict";

var {respond} = require("./WebWorkerGraphSlug.jsx");

self.addEventListener('message', function(event) {
  var {reactElementId, requestNumber, thetaResolution, rResolution, dim, pointGroups} = event.data;
  var result = respond(thetaResolution, rResolution, dim, pointGroups);
  self.postMessage({reactElementId, requestNumber, result});
});
