define ['react'], (React) ->

  Point = React.createClass
    displayName: 'Point'
    render: ->
      <circle className={'knn-point knn-type-' + @props.type} cx={@props.x} cy={@props.y} r=5></circle>

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
      style =
        width: @props.maxX
        height: @props.maxY
      <div className='knn'>
      <svg style={style}>
        { for point in @state.points
          <Point type={point.type} x={point.x} y={point.y} /> }

        { if @state.walkthroughState.id is 'NEW_POINT'
            {x,y} = @state.walkthroughState.parameters
            <Point type='new' x={x} y={y} /> }

      </svg>
        { if @state.walkthroughState.id is 'START'
            <button onClick={@addAPoint}>Add a point</button> }
      </div>

  KNN
