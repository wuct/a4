import React from 'react'
import pure from 'recompose/pure'

const Line = ({ className, ...otherProps }) =>
  <line
    {...otherProps}
  />

export default pure(Line)
