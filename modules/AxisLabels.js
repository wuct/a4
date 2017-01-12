import React, { PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'
import R from 'ramda'
import Label, { propTypes as LabelPropTypes } from './Label'
import emptyFunction from './utils/emptyFunction'

const enhance = compose(
  setPropTypes({
    ...LabelPropTypes,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    tickValues: PropTypes.array.isRequired,
    scale: PropTypes.func.isRequired,
    getLabelProps: PropTypes.func,
    getLabelValue: PropTypes.func,
    renderLabel: PropTypes.func,
  }),
  pure,
)

const AxisLabels = ({
  axis,
  tickValues,
  getLabelProps = emptyFunction,
  getLabelValue,
  scale,
  type,
  textAnchor,
  renderLabel,
  ...otherProps
}) => (
  <g {...otherProps}>
    {
      typeof renderLabel === 'function' ? (
        tickValues.map(renderLabel)
      ) : (
        tickValues.map((value, i) => {
          const label = getLabelValue ? getLabelValue(value, i) : value

          if (R.isNil(label)) {
            return null
          }

          return (
            <Label
              key={value}
              type={type}
              textAnchor={textAnchor}
              x={axis === 'x' ? scale(value) : 0}
              y={axis === 'y' ? scale(value) : 0}
              {...getLabelProps(value, i, tickValues)}
            >
              {label}
            </Label>
          )
        },
      ))
    }
  </g>
)

export default enhance(AxisLabels)
