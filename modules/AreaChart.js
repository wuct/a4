import React, { PropTypes } from 'react'
import { pure, compose, setPropTypes } from 'recompose'
import emptyFunction from './utils/emptyFunction'

const enhance = compose(
  pure,
  setPropTypes({
    generator: PropTypes.func,
    getAreaProps: PropTypes.func,
    data: PropTypes.array,
  }),
)

const AreaChart = ({
  data,
  generator,
  getAreaProps = emptyFunction,
  ...otherProps
}) => {
  const path = generator(data)

  return (
    <g {...otherProps}>
      <path
        d={path}
        fill="#EFEFEF"
        {...getAreaProps()}
      />
    </g>
  )
}

export default enhance(AreaChart)
