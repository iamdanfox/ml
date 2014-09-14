define ['jquery'], ($) ->

  class TestView

    render: (element) ->
      console.log 'b', <div />
      $(element).append "<div class='name'>TEST VIEW</div>"
      $(element).append "<div class='styled'>And its all been styled (poorly) using less</div>"

  TestView
