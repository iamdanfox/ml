MainPage = require './MainPage.cjsx'
React = require 'react'

window.React = React  # ensures the debugger works
React.render <MainPage />, document.body
