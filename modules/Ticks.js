import React, { createElement, PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'
import Line from './Line'
import transformAxis from './utils/transformAxis'
import getLineCoordinate from './utils/getLineCoordinate'
import { translateX, translateY } from './utils/translate'
import emptyFunction from './utils/emptyFunction'

const enhance = compose(
  setPropTypes({
    axis: PropTypes.oneOf(['x', 'y']),
    tickSize: PropTypes.number,
    values: PropTypes.array,
    scale: PropTypes.func,
    getTickProps: PropTypes.func,
  }),
  pure,
)

const Ticks = ({
  tickSize,
  axis = 'x',
  values = [],
  scale,
  getTickProps = emptyFunction,
  ...otherProps
}) => (
  <g {...otherProps}>
    {
      values.map((value, index) =>
        createElement(Line, {
          key: value,
          transform: axis === 'x'
            ? translateX(scale(value))
            : translateY(scale(value)),
          ...getTickProps(value, index),
          ...getLineCoordinate(transformAxis(axis), 0, tickSize),
        })
      )
    }
  </g>
)

export default enhance(Ticks)
