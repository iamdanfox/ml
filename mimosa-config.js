exports.config = {
  "modules": [
    "copy",
    "server",
    "jshint",
    "csslint",
    "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "coffeescript",
    "less"
  ],
  "server": {
    "views": {
      "compileWith": "html",
      "extension": "html"
    }
  }
}