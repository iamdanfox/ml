require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    jquery: 'vendor/jquery/jquery'
    react: 'vendor/react/react'
  , ['app/test-view', 'react']
  , (TestView, React) ->

    React.renderComponent new TestView(), document.documentElement
