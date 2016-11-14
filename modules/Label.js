import React, { PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'


export const propTypes = {
  type: PropTypes.oneOf(['default', 'small']),
  textAnchor: PropTypes.string,
  fill: PropTypes.string,
  color: PropTypes.string, // alias for fill
}

const enhance = compose(
  pure,
  setPropTypes(propTypes)
)

const Label = ({
  textAnchor = 'middle',
  fill,
  color = 'currentColor',
  children,
  ...otherProps
}) =>
  <g {...otherProps}>
    <text
      textAnchor={textAnchor}
      fill={fill || color}
    >
      {children}
    </text>
  </g>

export default enhance(Label)
