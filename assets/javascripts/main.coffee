require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    react: 'vendor/react/react'
  , ['app/test-view', 'react']
  , (TestView, React) ->

    React.renderComponent new TestView(), document.documentElement
