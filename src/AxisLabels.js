import React, { createElement, PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'
import { isFunction } from 'lodash'
import Label, { propTypes as LabelPropTypes } from './Label'
import { translateX, translateY } from './utils/translate'

const handleLabel = (label, value, i) => {
  if (isFunction(label)) {
    return label(value, i)
  }

  if (label != null) {
    return label
  }

  return i
}

const enhance = compose(
  setPropTypes({
    ...LabelPropTypes,
    axis: PropTypes.oneOf(['x', 'y']),
    label: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
    values: PropTypes.array,
    scale: PropTypes.func,
    labelComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
  }),
  pure,
)

const AxisLabels = ({
  axis,
  label,
  labelComponent: LabelComponent = Label,
  values,
  scale,
  type,
  textAnchor,
  ...otherProps,
}) => (
  <g {...otherProps}>
    {
      values.map((value, i) =>
        createElement(LabelComponent, {
          key: i,
          type,
          textAnchor,
          transform: axis === 'x'
            ? translateX(scale(value))
            : translateY(scale(value)),
        }, handleLabel(label, value, i))
      )
    }
  </g>
)

export default enhance(AxisLabels)
