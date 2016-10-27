import { createElement, PropTypes } from 'react'
import { getContext } from 'recompose'
import Axis from './Axis'

const enhance = getContext({
  yScale: PropTypes.func,
})

const YAxis = ({
  yScale,
  tickValues,
  ...otherProps
}) =>
  createElement(Axis, {
    axis: 'y',
    tickValues,
    scale: yScale,
    ...otherProps,
  })

export default enhance(YAxis)

