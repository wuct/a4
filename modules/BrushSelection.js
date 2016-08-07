import React from 'react'
import Dragable from './Dragable'

const BrushSelection = ({
  setDragState,
  isDraging,
  startX,
  startY,
  endX,
  endY,
  onDraging,
  onDragEnd,
  ...otherProps,
}) => {
  return (
    <Dragable
      onDraging={onDraging}
      onDragEnd={onDragEnd}
    >
      <path
        {...otherProps}
      />
    </Dragable>
  )
}

export default BrushSelection
