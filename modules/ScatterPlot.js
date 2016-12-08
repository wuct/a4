import React, { PropTypes } from 'react'
import { getContext, pure, compose } from 'recompose'
import { translate } from './utils/translate'
import Dot from './Dot'

const enhance = compose(
  getContext({
    yScale: PropTypes.func,
    xScale: PropTypes.func,
  }),
  pure,
)

const ScatterPlot = ({
  xScale,
  yScale,
  data,
  dotComponent: DotComponent = Dot,
}) =>
  <g>
    {
      data.map(d =>
        <g
          key={d.key}
          transform={translate(xScale(d.x), yScale(d.y))}
        >
          <DotComponent {...d} />
        </g>
      )
    }
  </g>

export default enhance(ScatterPlot)
