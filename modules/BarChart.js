import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import R from 'ramda'
import Bar from './Bar'
import emptyFunction from './utils/emptyFunction'

const defaultYBaseAccessor = R.always(0)

const enhance = compose(
  pure,
  setPropTypes({
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    yBaseAccessor: PropTypes.func,
    getBarProps: PropTypes.func,
    data: PropTypes.array,
  })
)

const BarChart = ({
  data = [],
  xAccessor,
  yAccessor,
  yBaseAccessor = defaultYBaseAccessor,
  getBarProps = emptyFunction,
  ...otherProps
}) => {
  return (
    <g {...otherProps}>
      {
        data.map((datum, index) => {
          const x = xAccessor(datum)
          const y = yAccessor(datum)
          const yBase = yBaseAccessor(datum)

          if (R.isNil(x) || R.isNil(y) || R.isNil(yBase)) {
            return null
          }

          return (
            <Bar
              key={`${x}, ${y}`}
              x1={x}
              x2={x}
              y1={yBase}
              y2={y}
              {...getBarProps(datum, index, data)}
            />
          )
        })
      }
    </g>
  )
}

export default enhance(BarChart)
