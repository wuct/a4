import { createElement, PropTypes } from 'react'
import { compose, withContext, withPropsOnChange } from 'recompose'
import { keys, pick } from 'ramda'
// TODO: remove d3 dep
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import getTicks from './utils/getTicks'
import warning from 'fbjs/lib/warning'

const context = {
  width: PropTypes.number,
  height: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  yMinPosition: PropTypes.number,
  yScale: PropTypes.func,
  xScale: PropTypes.func,
  yMax: PropTypes.number,
  xs: PropTypes.array,
  y: PropTypes.object,
  colors: PropTypes.object,
}

const pickContext = pick(keys(context))

const enhance = compose(
  withPropsOnChange(
    ['yMin, yMax', 'paddingTop', 'yMinPosition', 'paddingBottom', 'height', 'yScale'],
    ({ yMin, yMax, paddingTop, yMinPosition, paddingBottom, height, yScale }) => {
      if (yScale) {
        return { yScale }
      }

      warning(
        yMinPosition === undefined,
        '[Chart]: yMinPosition is deprecated, use paddingBottom instead'
      )

      return {
        yScale: yMinPosition
          ? scaleLinear()
            .range([yMinPosition, paddingTop])
            .domain([yMin, yMax])
          : scaleLinear()
            .range([height - paddingBottom, paddingTop])
            .domain([yMin, yMax]),
      }
    }),
  withPropsOnChange(
    ['xs', 'paddingRight', 'paddingLeft', 'width', 'xScale'],
    ({ xs = [], paddingRight, paddingLeft, width, xScale }) => {
      if (xScale) {
        return { xScale }
      }

      return {
        xScale: scaleOrdinal()
          .range(getTicks(xs.length, paddingLeft, width - paddingRight))
          .domain(xs),
      }
    }),
  withContext(context, pickContext)
)


const Chart = ({ width, height, children }) =>
  createElement('svg', { width, height, children })


export default enhance(Chart)
