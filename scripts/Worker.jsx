/* @flow */
"use strict";

var {respond} = require("./WebWorkerGraphSlug.jsx");

self.addEventListener('message', function(event) {
  var {reactElementId, thetaResolution, rResolution, dim, pointClasses} = event.data;
  var result = respond(thetaResolution, rResolution, dim, pointClasses);
  self.postMessage({reactElementId, result});
});
