import React, { createElement, Children, cloneElement } from 'react'
import Ticks from './Ticks'

const Axis = ({
  tickValues = [],
  scale,
  tickSize,
  children,
  axis,
  tickClassName,
  ...otherProps
}) => (
  <g {...otherProps}>
    {
      tickSize > 0 && tickValues.length > 0
      ?
        createElement(
          Ticks, {
            axis,
            tickSize,
            values: tickValues,
            scale,
            tickClassName,
          }
        )
      : null
    }
    {
      Children.map(children, (child, i) =>
        cloneElement(child, {
          key: i,
          values: tickValues,
          scale,
        })
      )
    }
  </g>
)

export default Axis

