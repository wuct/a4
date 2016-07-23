import React from 'react'
import pure from 'recompose/pure'
import c from 'classnames'
import lineStyles from './styles/Line.css'

const Line = ({ className, ...otherProps }) =>
  <line
    className={c(lineStyles.default, className)}
    {...otherProps}
  />

export default pure(Line)
