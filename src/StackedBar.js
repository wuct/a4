import React, { createElement } from 'react'
import { translateY } from './utils/translate'
import Bar from './Bar'

const StackedBar = ({
  colors,
  data,
  scale,
  width,
  ...otherProps,
}) => {
  const dataNames = Object.keys(data)

  const reducer = ({ accValue, result }, dataName) => {
    const value = data[dataName]
    const color = colors[dataName]

    result.push(createElement(Bar, {
      key: dataName,
      transform: translateY(scale(accValue) - scale(0)),
      width,
      value,
      scale,
      color,
    }))

    return {
      accValue: accValue + value,
      result,
    }
  }

  return (
    <g
      {...otherProps}
    >
      {
        dataNames.reduce(reducer, { accValue: 0, result: []}).result
      }
    </g>
  )
}

export default StackedBar
