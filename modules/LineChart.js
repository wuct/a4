import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import R from 'ramda'
import createPath from './utils/createPath'
import emptyFunction from './utils/emptyFunction'
import Dot from './Dot'

const enhance = compose(
  pure,
  setPropTypes({
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    getDotProps: PropTypes.func,
    getLineProps: PropTypes.func,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.any,
        y: PropTypes.any,
      })
    ),
  })
)

const LineChart = ({
  data: rawData = [],
  xScale,
  yScale,
  getDotProps = emptyFunction,
  getLineProps = emptyFunction,
  ...otherProps
}) => {
  const dotProps = getDotProps()
  const data = rawData.map(R.evolve({ x: xScale, y: yScale }))

  return (
    <g {...otherProps}>
      <path
        d={createPath(data)}
        stroke="#EFEFEF"
        strokeWidth="2"
        fill="transparent"
        {...getLineProps()}
      />
      {
        dotProps &&
          data.map(({ x, y }) =>
            <Dot
              key={`${x}, ${y}`}
              x={x}
              y={y}
              r={3}
              color="#EFEFEF"
              {...dotProps}
            />
          )
      }
    </g>
  )
}

export default enhance(LineChart)
