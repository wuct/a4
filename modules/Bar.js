import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'

const enhance = compose(
  pure,
  setPropTypes({
    strokeWidth: PropTypes.number,
    width: PropTypes.number, // alias for strokeWidth
    stroke: PropTypes.string,
    color: PropTypes.string, // alias for stroke
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
  }),
)

const Bar = ({
  x1,
  x2,
  y1,
  y2,
  strokeWidth,
  width = 10,
  stroke,
  color = '#EFEFEF',
  ...otherProps
}) => (
  <line
    x1={x1}
    x2={x2}
    y1={y1}
    y2={y2}
    strokeWidth={strokeWidth || width}
    stroke={stroke || color}
    {...otherProps}
  />
)

export default enhance(Bar)
