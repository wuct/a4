import React, { PropTypes, createElement } from 'react'
import { pure, compose, setPropTypes } from 'recompose'

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
)

const Bar = ({
  width,
  color,
  y1,
  y2,
  x,
  labelComponent,
  datum,
  style,
  ...otherProps,
}) => (
  <g>
    <rect
      x={x - width / 2}
      y={y2}
      height={y1 - y2}
      width={width}
      style={{
        fill: color,
        ...style,
      }}
      {...otherProps}
    />
    {
      labelComponent &&
        createElement(labelComponent, {
          ...datum,
        })
    }
  </g>
)

export default enhance(Bar)
