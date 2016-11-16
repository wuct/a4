import React from 'react'
import Axis from './Axis'
import { translateY } from './utils/translate'

const XAxis = ({
  position = 0,
  ...otherProps
}) =>
  <Axis
    axis="x"
    transform={translateY(position)}
    {...otherProps}
  />


export default XAxis
