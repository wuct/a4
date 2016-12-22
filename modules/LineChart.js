import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import { line, curveLinear } from 'd3-shape'
import emptyFunction from './utils/emptyFunction'

const isFunction = fn => typeof fn === 'function'

const defaultXAccessor = d => d[0]
const defaultYAccessor = d => d[1]
const defaultDefinedAccessor = () => true
const defaultCurveFactory = curveLinear

const enhance = compose(
  pure,
  setPropTypes({
    getDotProps: PropTypes.func,
    getLineProps: PropTypes.func,
    data: PropTypes.array,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    definedAccessor: PropTypes.func,
    curveFactory: PropTypes.func,

    // deprecated
    generator: PropTypes.func,
  })
)

const LineChart = ({
  data = [],
  generator,
  xAccessor = defaultXAccessor,
  yAccessor = defaultYAccessor,
  definedAccessor = defaultDefinedAccessor,
  curveFactory = defaultCurveFactory,
  getLineProps = emptyFunction,
  ...otherProps
}) => {
  const gen = isFunction(generator)
    ? generator
    : line()
      .x(xAccessor)
      .y(yAccessor)
      .defined(definedAccessor)
      .curve(curveFactory)

  return (
    <g {...otherProps}>
      <path
        d={gen(data)}
        stroke="#EFEFEF"
        strokeWidth="2"
        fill="transparent"
        {...getLineProps(data)}
      />
    </g>
  )
}

export default enhance(LineChart)
