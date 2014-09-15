define ['react', 'underscore'], (React, _) ->

  Point = React.createClass
    displayName: 'Point'
    propTypes:
      type: React.PropTypes.oneOf ['TYPE1', 'TYPE2', 'TYPE-NEW']

    render: ->
      <circle className={'knn-point knn-' + @props.type} cx={@props.x} cy={@props.y} r=5></circle>

  KNN = React.createClass
    displayName: 'KNN'
    getInitialState: ->
      k: 4
      points: []
      walkthroughState: 'START' # START -> NEW_POINT -> LINES -> CLASSIFY
      newPoint: null

    componentWillMount: ->
      @setState points: @generatePoints 10

    generatePoints: (number, maxX, maxY) ->
      for i in [0...number]
        x: Math.random() * @props.maxX
        y: Math.random() * @props.maxY
        type: if Math.random() > 0.5 then 'TYPE1' else 'TYPE2'

    addAPoint: ->
      @setState
        walkthroughState: 'NEW_POINT'
        newPoint:
          x: Math.random() * @props.maxX
          y: Math.random() * @props.maxY

    addLines: ->
      @setState
        walkthroughState: 'LINES'

    classify: ->
      @setState
        walkthroughState: 'CLASSIFY'

    classifyPoint: (newPoint) ->
      groupedPointsObject = _.groupBy @getKNearest(newPoint), 'type'
      groupedPointsList = for type,points of groupedPointsObject
        type: type
        points: points
      winner = _.max groupedPointsList, (results) -> results.points.length
      return winner.type

    getKNearest: (newPoint) ->
      distTo = (point) ->
        Math.sqrt (newPoint.x-point.x)**2 + (newPoint.y-point.y)**2

      return _.sortBy(@state.points, distTo)[0...@state.k]

    render: ->
      style =
        width: @props.maxX
        height: @props.maxY

      <div className='knn'>
      <svg style={style}>
        { if @state.walkthroughState in ['LINES', 'CLASSIFY'] then do =>
            newPoint = @state.newPoint
            kNearest = @getKNearest newPoint
            return <g>
              { for point in kNearest
                  <line x1={newPoint.x} y1={newPoint.y} x2={point.x} y2={point.y} style={stroke:'grey',strokeWidth:2} />}
            </g> }

        { for point in @state.points
          <Point type={point.type} x={point.x} y={point.y} /> }

        { if @state.walkthroughState in ['NEW_POINT', 'LINES']
            {x,y} = @state.newPoint
            <Point type='TYPE-NEW' x={x} y={y} /> }

        { if @state.walkthroughState is 'CLASSIFY' then do =>
            newPoint = @state.newPoint
            <Point type={@classifyPoint newPoint} x={newPoint.x} y={newPoint.y} /> }



      </svg>
        { if @state.walkthroughState is 'START'
            <button onClick={@addAPoint}>Add a point</button> }
        { if @state.walkthroughState is 'NEW_POINT'
          <button onClick={@addLines}>Show Lines</button> }
        { if @state.walkthroughState is 'LINES'
          <button onClick={@classify}>Classify</button> }
      </div>

  KNN
