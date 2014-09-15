define ['react', './knn'], (React, KNN) ->

  App = React.createClass
    displayName: 'App'
    render: ->
      <KNN maxX=600 maxY=300 clusters=3 k=10 />

  App
