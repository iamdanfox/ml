define ['react'], (React) ->

  Point = React.createClass
    render: ->
      style =
        left: @props.x
        top: @props.y
      <div className={'knn-point knn-type-' + @props.type} style={style}></div>



  KNN = React.createClass
    displayName: 'KNN'
    render: ->
      <div className='knn'>
        <Point type=1 x=100 y=200 />
        <Point type=1 x=200 y=50 />
        <Point type=2 x=400 y=300 />
        <Point type=2 x=500 y=700 />
      </div>

  App = React.createClass
    displayName: 'App'
    render: ->
      <KNN />

  App
