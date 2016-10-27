import React, { createElement, PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'
import Line from './Line'
import transformAxis from './utils/transformAxis'
import getLineCoordinate from './utils/getLineCoordinate'
import { translateX, translateY } from './utils/translate'

const enhance = compose(
  setPropTypes({
    axis: PropTypes.oneOf(['x', 'y']),
    tickSize: PropTypes.number,
    values: PropTypes.array,
    scale: PropTypes.func,
    tickClassName: PropTypes.string,
  }),
  pure,
)

const Ticks = ({
  tickSize,
  axis = 'x',
  values = [],
  scale,
  tickClassName,
  ...otherProps
}) => (
  <g {...otherProps}>
    {
      values.map(value =>
        createElement(Line, {
          key: value,
          className: tickClassName,
          transform: axis === 'x'
            ? translateX(scale(value))
            : translateY(scale(value)),
          ...getLineCoordinate(transformAxis(axis), 0, tickSize),
        })
      )
    }
  </g>
)

export default enhance(Ticks)
