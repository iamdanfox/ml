React = require 'react'
makeSurface = require './SurfaceJS.js'

module.exports = Surface = React.createClass

  shouldComponentUpdate: (nextProps, nextState) ->
    # TODO check whether the data has changed and hence whether the objective plot should be re-calculated!
    false
    #If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change. (In addition, componentWillUpdate and componentDidUpdate will not be called.)

  componentWillReceiveProps: (nextProps) ->
    makeSurface(@refs.surface.getDOMNode(), nextProps.dim, nextProps.pointClasses)

  componentDidMount: ->
    makeSurface(@refs.surface.getDOMNode(), @props.dim, @props.pointClasses)

  render: ->
    <div ref="surface"></div>