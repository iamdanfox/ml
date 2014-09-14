define ['react', 'underscore'], (React, _) ->

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

    getKNearest: (k, newPoint) ->
      distTo = (point) ->
        Math.sqrt (newPoint.x-point.x)**2 + (newPoint.y-point.y)**2

      return _.sortBy(@state.points, distTo)[0...k]

    render: ->
      style =
        width: @props.maxX
        height: @props.maxY

      <div className='knn'>
      <svg style={style}>
        { if @state.walkthroughState.id is 'NEW_POINT' then do =>
            newPoint = @state.walkthroughState.parameters
            kNearest = @getKNearest 4, newPoint
            return <g>
              { for point in kNearest
                <line x1={newPoint.x} y1={newPoint.y} x2={point.x} y2={point.y} style={stroke:'rgb(255,0,0)',strokeWidth:2} />}
            </g> }

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
