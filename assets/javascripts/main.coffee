require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    react: 'vendor/react/react'
    underscore: 'vendor/underscore/underscore'
  , ['app/app', 'react']
  , (App, React) ->

    React.renderComponent new App(), document.body
