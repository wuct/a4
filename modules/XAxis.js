import { createElement, PropTypes } from 'react'
import { getContext } from 'recompose'
import { isNil } from 'ramda'
import Axis from './Axis'
import { translateY } from './utils/translate'

const enhance = getContext({
  height: PropTypes.number,
  paddingBottom: PropTypes.number,
  yMinPosition: PropTypes.number, // deprecated
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  xs: PropTypes.array,
})

const XAxis = ({
  height,
  paddingBottom,
  yMinPosition,
  xScale,
  yScale,
  xs,
  tickValues,
  ...otherProps
}) => {
  const getPosition = () => {
    if (!isNil(yScale)) {
      return yScale.range()[0]
    }

    // deprecated
    if (!isNil(paddingBottom)) {
      return height - paddingBottom
    }

    // deprecated
    return yMinPosition
  }

  return createElement(Axis, {
    axis: 'x',
    tickValues: tickValues || xs,
    scale: xScale,
    transform: translateY(getPosition()),
    ...otherProps,
  })
}

export default enhance(XAxis)
