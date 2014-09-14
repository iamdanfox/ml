define ['react', './knn'], (React, KNN) ->

  App = React.createClass
    displayName: 'App'
    render: ->
      <KNN maxX=600 maxY=300 />

  App
