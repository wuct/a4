import React from 'react'

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

export default BrushSelection
