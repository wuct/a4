import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'

const enhance = compose(
  pure,
  setPropTypes({
    width: PropTypes.number,
    color: PropTypes.string,
    y1: PropTypes.number,
    y2: PropTypes.number,
    x: PropTypes.number,
  }),
)

const Bar = ({
  width = 10,
  color,
  y1,
  y2,
  x,
  style,
  ...otherProps
}) => (
  <rect
    x={x - (width / 2)}
    y={y2}
    height={y1 - y2}
    width={width}
    style={{
      fill: color,
      ...style,
    }}
    {...otherProps}
  />
)

export default enhance(Bar)
