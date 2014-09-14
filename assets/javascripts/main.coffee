require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    react: 'vendor/react/react'
  , ['app/app', 'react']
  , (App, React) ->

    React.renderComponent new App(), document.body
