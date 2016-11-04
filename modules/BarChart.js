import React, { createElement, PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import Bar from './Bar'
import emptyFunction from './utils/emptyFunction'

const enhance = compose(
  pure,
  setPropTypes({
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    getBarProps: PropTypes.func,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.any,
        y: PropTypes.any,
      })
    ),
  })
)

const BarChart = ({
  data = [],
  xScale,
  yScale,
  getBarProps = emptyFunction,
  ...otherProps
}) => (
  <g {...otherProps}>
    {
      data.map((datum, index) => {
        const {
          x,
          y,
          props = {},
        } = datum
        const scaledX = xScale(x)
        const scaledY = yScale(y)

        return createElement(Bar, {
          key: `${scaledX}, ${scaledY}`,
          x: scaledX,
          y1: yScale(0),
          y2: scaledY,
          ...getBarProps(datum, index),
          ...props,
        })
      })
    }
  </g>
)

export default enhance(BarChart)
