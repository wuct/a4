import React, { PropTypes } from 'react'
import R from 'ramda'
import { pure, compose, setPropTypes } from 'recompose'
import { pie, arc } from 'd3-shape'
import emptyFunction from './utils/emptyFunction'

const defaultValueAccessor = R.identity
const defaultInnerRadiusAccessor = R.always(0)
const defaultOuterRadiusAccessor = R.prop('outerRadius')
const defaultStartAngleAccessor = R.always(0)
const defaultEndAngleAccessor = R.always(2 * Math.PI)
const defaultPadAngleAccessor = R.always(0)

const enhance = compose(
  pure,
  setPropTypes({
    getArcProps: PropTypes.func,
    data: PropTypes.array,
    valueAccessor: PropTypes.func,
    innerRadiusAccessor: PropTypes.func,
    outerRadiusAccessor: PropTypes.func,
    startAngleAccessor: PropTypes.func,
    endAngleAccessor: PropTypes.func,
    padAngleAccessor: PropTypes.func,
    sortComparator: PropTypes.func,
    renderLabel: PropTypes.func,
  }),
)

const PieChart = ({
  data = [],
  valueAccessor = defaultValueAccessor,
  innerRadiusAccessor = defaultInnerRadiusAccessor,
  outerRadiusAccessor = defaultOuterRadiusAccessor,
  startAngleAccessor = defaultStartAngleAccessor,
  endAngleAccessor = defaultEndAngleAccessor,
  padAngleAccessor = defaultPadAngleAccessor,
  sortComparator = null,
  getArcProps = emptyFunction,
  renderLabel,
  ...otherProps
}) => {
  const pieGen = pie()
    .padAngle(padAngleAccessor)
    .startAngle(startAngleAccessor)
    .endAngle(endAngleAccessor)
    .value(valueAccessor)
    .sort(sortComparator)

  const arcGen = arc()
    .innerRadius(innerRadiusAccessor)
    .outerRadius(outerRadiusAccessor)

  return (
    <g {...otherProps}>
      {
        pieGen(data).map((d, i) => (
          /* eslint react/no-array-index-key: 0 */
          <g key={i}>
            <path
              fill={'#EFEFEF'}
              d={arcGen(d)}
              {...getArcProps(d)}
            />
            {
              R.is(Function, renderLabel) && renderLabel(d, arcGen.centroid(d))
            }
          </g>
        ))
      }
    </g>
  )
}

export default enhance(PieChart)
