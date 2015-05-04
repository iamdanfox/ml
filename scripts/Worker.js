/* @flow */
"use strict";

var THREE = require('three');


// in worker.js
self.addEventListener('message', function(event) {
  // can't clone the entire 'event' object

  // expect messages containing a return ID,
  // rResolution
  // thetaResolution
  // pointClasses

  // we will compute the mesh using logistic regression objective & optimise

  //  now send back the results
  self.postMessage({
    type: 'results',
    data: {
      received: event.data,
    }
  });
});

