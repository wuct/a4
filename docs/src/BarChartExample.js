import React from 'react'
import { BarChart } from 'a4'
import { createLinearScale } from 'a4/lib/utils/createScale'

const xScale = createLinearScale({
  domain: [1, 5],
  range: [20, 380],
})

const yScale = createLinearScale({
  domain: [1, 5],
  range: [400, 40],
})

const data = [
  { x: 1, y: 1},
  { x: 2, y: 2},
  { x: 3, y: 3},
  { x: 4, y: 4},
  { x: 5, y: 5},
]

console.log(xScale(1))
const BarChartExample = () =>
  <svg width="400" height="400">
    <BarChart
      data={data}
      xScale={xScale}
      yScale={yScale}
      getBarProps={() => ({
        width: 40,
        color: "yellowgreen"
      })}
      width={40}
    />
  </svg>

export default BarChartExample
