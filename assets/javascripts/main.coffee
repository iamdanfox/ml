require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    react: 'vendor/react/react'
    jquery: 'vendor/jquery/jquery'
    underscore: 'vendor/underscore/underscore'
    backbone: 'vendor/backbone/backbone'
    'react.backbone': 'vendor/react.backbone/react.backbone'

  , ['app/app', 'react']
  , (App, React) ->

    React.renderComponent new App(), document.body
