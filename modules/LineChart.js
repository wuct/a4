import React, { PropTypes } from 'react'
import { getContext, pure, compose } from 'recompose'
import { zip } from 'ramda'
import createPath from './utils/createPath'
import Dot from './Dot'

const enhance = compose(
  getContext({
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    xs: PropTypes.array,
  }),
  pure,
)

const LineChart = ({
  xScale,
  yScale,
  xs,
  data,
  color,
  dotColor,
  ...otherProps,
}) => {
  const coordinates = zip(
    xs.map(xScale),
    data.map(yScale)
  )

  return (
    <g>
      <path
        d={createPath(coordinates)}
        stroke={color}
        strokeWidth="2"
        fill="transparent"
        {...otherProps}
      />
      {
        dotColor &&
          coordinates.map(([x, y], index) =>
            <Dot
              key={index}
              x={x}
              y={y}
              r={3}
              color={dotColor}
            />
          )
      }
    </g>
  )
}

export default enhance(LineChart)
