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
    labelComponent: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
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
  labelComponent,
  ...otherProps,
}) => (
  <g {...otherProps}>
    {
      data.map(datum =>
        createElement(Bar, {
          key: datum.x,
          x: xScale(datum.x),
          y1: yScale(0),
          y2: yScale(datum.y),
          labelComponent,
          datum,
          ...getBarProps(datum)
        })
      )
    }
  </g>
)

export default enhance(BarChart)
