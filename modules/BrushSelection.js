import React from 'react'
import Dragable from './Dragable'

const BrushSelection = ({
  onDraging,
  onDragEnd,
  ...otherProps,
}) => (
  <Dragable
    onDraging={onDraging}
    onDragEnd={onDragEnd}
  >
    <path
      {...otherProps}
    />
  </Dragable>
)


export default BrushSelection
