import React, { PropTypes } from 'react'
import { compose, pure, setPropTypes } from 'recompose'

import styles from './styles/Label.css'

export const propTypes = {
  type: PropTypes.oneOf(['default', 'small']),
  textAnchor: PropTypes.string,
}

const enhance = compose(
  pure,
  setPropTypes(propTypes)
)

const Label = ({
  type = 'default',
  textAnchor = 'middle',
  children,
  ...otherProps,
}) =>
  <g {...otherProps}>
    <text
      textAnchor={textAnchor}
      className={styles[type]}
    >
      {children}
    </text>
  </g>

export default enhance(Label)
