Test = require './Test'
React = require 'react'

window.React = React  # ensures the debugger works
React.render <Test />, document.body
