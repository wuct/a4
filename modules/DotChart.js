import React, { PropTypes } from 'react'
import R from 'ramda'
import { pure, compose, setPropTypes } from 'recompose'
import emptyFunction from './utils/emptyFunction'
import Dot from './Dot'

const defaultDefinedAccessor = R.always(true)

const enhance = compose(
  pure,
  setPropTypes({
    getDotProps: PropTypes.func,
    data: PropTypes.array,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
  }),
)

const DotChart = ({
  data = [],
  xAccessor,
  yAccessor,
  definedAccessor = defaultDefinedAccessor,
  getDotProps = emptyFunction,
  ...otherProps
}) => {
  const dots = R.compose(
    R.map((...args) => {
      const x = xAccessor(...args)
      const y = yAccessor(...args)

      return (
        <Dot
          key={`${x}, ${y}`}
          x={x}
          y={y}
          r={3}
          color="#EFEFEF"
          {...getDotProps(...args)}
        />
      )
    }),
    R.filter(definedAccessor),
  )(data)

  return (
    <g {...otherProps}>
      {dots}
    </g>
  )
}

export default enhance(DotChart)
