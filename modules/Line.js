import React from 'react'
import pure from 'recompose/pure'

const Line = ({
  strokeWidth = 2,
  stroke = '#EFEFEF',
  ...otherProps,
}) =>
  <line
    strokeWidth={strokeWidth}
    stroke={stroke}
    {...otherProps}
  />

export default pure(Line)
