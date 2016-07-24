import React, { createElement, PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import Bar from './Bar'

const enhance = compose(
  pure,
  setPropTypes({
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    width: PropTypes.number,
    color: PropTypes.string,
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
  width,
  color,
  labelComponent,
  ...otherProps,
}) => (
  <g {...otherProps}>
    {
      data.map(datum =>
        createElement(Bar, {
          key: datum.x,
          width,
          x: xScale(datum.x),
          y1: yScale(0),
          y2: yScale(datum.y),
          color,
          labelComponent,
          datum,
        })
      )
    }
  </g>
)

export default enhance(BarChart)
