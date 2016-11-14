import React, { PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'
import R from 'ramda'
import Label, { propTypes as LabelPropTypes } from './Label'
import { translateX, translateY } from './utils/translate'
import emptyFunction from './utils/emptyFunction'

const enhance = compose(
  setPropTypes({
    ...LabelPropTypes,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    tickValues: PropTypes.array.isRequired,
    scale: PropTypes.func.isRequired,
    getLabelProps: PropTypes.func,
    getLabelValue: PropTypes.func,
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
  ...otherProps
}) => (
  <g {...otherProps}>
    {
      tickValues.map((value, i) =>
        <Label
          key={i}
          type={type}
          textAnchor={textAnchor}
          transform={axis === 'x'
            ? translateX(scale(value))
            : translateY(scale(value))
          }
          {...getLabelProps(value, i)}
        >
          {
            getLabelValue ? getLabelValue(value, i) : value
          }
        </Label>
      )
    }
  </g>
)

export default enhance(AxisLabels)
