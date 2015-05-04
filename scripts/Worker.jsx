/* @flow */
"use strict";

var workerSlug = require("./WebWorkerGraphSlug.jsx");

self.addEventListener('message', function(event) {
  var {reactElementId, thetaResolution, rResolution, dim, pointClasses} = event.data;
  // var mesh = workerSlug(thetaResolution, rResolution, dim, pointClasses);
  // self.postMessage({reactElementId, mesh});
  self.postMessage({
    type: 'results',
    data: {
      a: 1234
    }
  });
});
