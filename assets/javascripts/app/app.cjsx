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
    getInitialState: ->
      points: []
      walkthroughState:
        id: 'START'
        parameters: {}

    componentWillMount: ->
      @setState points: @generatePoints 10

    generatePoints: (number, maxX, maxY) ->
      for i in [0...number]
        x: Math.random() * @props.maxX
        y: Math.random() * @props.maxY
        type: if Math.random() > 0.5 then 1 else 2

    addAPoint: ->
      @setState
        walkthroughState:
          id: 'NEW_POINT'
          parameters:
            x: Math.random() * @props.maxX
            y: Math.random() * @props.maxY

    render: ->
      <div className='knn'>
        { for point in @state.points
          <Point type=1 x={point.x} y={point.y} type={point.type} /> }

        { if @state.walkthroughState.id is 'NEW_POINT'
            {x,y} = @state.walkthroughState.parameters
            <Point type='new' x={x} y={y} /> }

        { if @state.walkthroughState.id is 'START'
            <button onClick={@addAPoint}>Add a point</button> }
      </div>

  App = React.createClass
    displayName: 'App'
    render: ->
      <KNN maxX=600 maxY=300 />

  App
