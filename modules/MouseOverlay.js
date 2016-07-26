import React, { PropTypes } from 'react'
import { compose, pure, setPropTypes, branch, renderNothing } from 'recompose'
import { path, isNil, identity, pipe } from 'ramda'
import { Portal } from 'react-overlays'

import styles from './styles/MouseOverlay.css'


const enhance = compose(
  pure,
  setPropTypes({
    mousePosition: PropTypes.object,
  }),
  branch(
    pipe(path(['mousePosition', 'pageX']), isNil),
    renderNothing,
    identity,
  )
)
const MouseOverlay = ({
  mousePosition,
  children,
}) => (
  <Portal>
    <div
      className={styles.default}
      style={{
        top: mousePosition.pageY,
        left: mousePosition.pageX,
      }}
    >
      {children}
    </div>
  </Portal>
)

export default enhance(MouseOverlay)
