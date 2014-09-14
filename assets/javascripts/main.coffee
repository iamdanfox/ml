require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    jquery: 'vendor/jquery/jquery'
  , ['app/example-view', 'app/test-view']
  , (ExampleView, TestView) ->

    console.log 'main.coffee'

    view = new TestView()
    view.render('body')