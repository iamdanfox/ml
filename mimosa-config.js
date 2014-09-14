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
    "cjsx",
    "less",
  ],
  "server": {
    "views": {
      "compileWith": "html",
      "extension": "html"
    }
  },
  onePager: true
}