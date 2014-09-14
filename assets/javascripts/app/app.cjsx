define ['react'], (React) ->

  Point = React.createClass
    displayName: 'Point'
    render: ->
      style =
        left: @props.x
        top: @props.y
      <div className={'knn-point knn-type-' + @props.type} style={style}></div>



  KNN = React.createClass
    displayName: 'KNN'
    componentWillMount: ->
      @setState points: @generatePoints 10, 600, 300

    generatePoints: (number, maxX, maxY) ->
      for i in [0...number]
        x: Math.random()*maxX
        y: Math.random()*maxY
        type: if Math.random() > 0.5 then 1 else 2

    render: ->
      <div className='knn'>
        { for point in @state.points
          <Point type=1 x={point.x} y={point.y} type={point.type} /> }
      </div>

  App = React.createClass
    displayName: 'App'
    render: ->
      <KNN />

  App
