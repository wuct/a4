import React from 'react'
import Axis from './Axis'
import { translateX } from './utils/translate'

const YAxis = ({ position, ...otherProps }) =>
  <Axis
    axis="y"
    transform={translateX(position)}
    {...otherProps}
  />


export default YAxis
