import React, { createElement, Children, cloneElement, PropTypes } from 'react'
import { setPropTypes } from 'recompose'
import Ticks from './Ticks'

const enhance = setPropTypes({
  tickValues: PropTypes.array.isRequired,
  scale: PropTypes.func.isRequired,
  tickSize: PropTypes.number,
  axis: PropTypes.string.isRequired,
})

const Axis = ({
  tickValues = [],
  scale,
  tickSize = 0,
  children,
  axis,
  getTickProps,
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
            getTickProps,
          }
        )
      : null
    }
    {
      Children.map(children, (child, i) =>
        cloneElement(child, {
          key: i,
          tickValues,
          scale,
        })
      )
    }
  </g>
)

export default enhance(Axis)
