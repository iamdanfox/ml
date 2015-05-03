
// in worker.js
self.addEventListener('message', function() {
  // We received a message from the main thread!
  // do some computation that may normally cause the browser to hang
  // in my case, I computed the position of an object in space according
  // to Kepler's Laws

  //  now send back the results
  self.postMessage({
    type: 'results',
    data: {
      a: 4
    }
  });
});

