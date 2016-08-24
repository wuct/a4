import React from 'react'
import { BarChart, Brush, createLinearScale } from 'a4'

const xScale = createLinearScale({
  domain: [1, 5],
  range: [10, 190],
})

const yScale = createLinearScale({
  domain: [1, 5],
  range: [190, 0],
})

const data = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
]

const BarChartExample = () =>
  <svg width="200" height="200">
    <BarChart
      data={data}
      xScale={xScale}
      yScale={yScale}
      getBarProps={() => ({
        width: 20,
        color: '#5d9ce3',
      })}
    />
    <Brush
      width={200}
      height={200}
    />
  </svg>

export default BarChartExample
