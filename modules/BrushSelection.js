import React from 'react'
import dragable from './dragable'

const BrushSelection = ({
  setDragState,
  isDraging,
  startX,
  startY,
  endX,
  endY,
  ...otherProps,
}) => {
  return (
    <path
      {...otherProps}
    />
  )
}

export default dragable(BrushSelection)
