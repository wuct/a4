# a4
A pure React chart library 📈

__This project is still in alpha. APIs might change heavily in the future.__


- [__Demo__](https://wuct.github.io/a4/)

## To Try

1. `git clone https://github.com/wuct/a4.git`
2. `cd a4`
3. `npm install`
4. `cd docsSrc && npm install && npm start`
5. go to [http://localhost:3000]()


## To Install

`npm install a4`


## Quick Example


```JavaScript
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
```


## To Contribute

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
