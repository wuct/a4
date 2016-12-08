import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import R from 'ramda'
import createPath from './utils/createPath'
import emptyFunction from './utils/emptyFunction'
import Dot from './Dot'

const isFunction = fn => typeof fn === 'function'

const enhance = compose(
  pure,
  setPropTypes({
    generator: PropTypes.func,
    getDotProps: PropTypes.func,
    getLineProps: PropTypes.func,
    data: PropTypes.array,

    // deprecated
    yScale: PropTypes.func,
    xScale: PropTypes.func,
  })
)

const LineChart = ({
  data: rawData = [],
  generator,
  xScale,
  yScale,
  getDotProps,
  getLineProps = emptyFunction,
  ...otherProps
}) => {
  const path = isFunction(generator)
    ? generator(rawData)
    : createPath(rawData.map(R.evolve({ x: xScale, y: yScale })))

  return (
    <g {...otherProps}>
      <path
        d={path}
        stroke="#EFEFEF"
        strokeWidth="2"
        fill="transparent"
        {...getLineProps()}
      />
      {
        getDotProps &&
          rawData.map((datum, index) => {
            const { x, y } = R.evolve({ x: xScale, y: yScale }, datum)
            return (
              <Dot
                key={`${x}, ${y}`}
                x={x}
                y={y}
                r={3}
                color="#EFEFEF"
                {...getDotProps(datum, index)}
              />
            )
          })
      }
    </g>
  )
}

export default enhance(LineChart)
