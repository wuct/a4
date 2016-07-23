import React, { PropTypes, createElement } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import withMousePosition from 'react-dom-utils/lib/withMousePosition'
import { identity } from 'ramda'
import Line from './Line'

const enhance = compose(
  pure,
  setPropTypes({
    width: PropTypes.number,
    color: PropTypes.string,
    y1: PropTypes.number,
    y2: PropTypes.number,
    x: PropTypes.number,
    labelComponent: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    datum: PropTypes.object,
  }),
  withMousePosition(identity),
)

const Bar = ({
  width,
  color,
  y1,
  y2,
  x,
  labelComponent,
  datum,
  mousePosition,
  ...otherProps,
}) => (
  <g>
    <Line
      y1={y1}
      y2={y2}
      x1={x}
      x2={x}
      style={{
        stroke: color,
        strokeWidth: width,
      }}
      {...otherProps}
    />
    {
      labelComponent &&
        createElement(labelComponent, {
          mousePosition,
          ...datum,
        })
    }
  </g>
)

export default enhance(Bar)
