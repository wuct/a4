import React from 'react'
import { findDOMNode } from 'react-dom'
import { isNil, any, clamp } from 'ramda'
import createPath from './utils/createPath'
import dragable from './dragable'
import BrushSelection from './BrushSelection'

const styles = {
  cursor: 'crosshair'
}

const createRectPathMaybeFromStartToEnd = ({ startX, startY, endX, endY }) => {
  if (any(isNil)([startX, startY, endX, endY])) return null
  return createPath([
    [startX, startY],
    [startX, endY],
    [endX, endY],
    [endX, startY],
    [startX, startY],
  ])
}

class Brush extends React.Component {
  onSelectionDraging = ({ startX, startY, endX, endY}) => {}

  onSelectionDragEnd = () => {}

  render() {
    const {
      width,
      height,
      isDraging,
    } = this.props

    const path = createRectPathMaybeFromStartToEnd(this.props)

    return (
      <g>
        <rect
          ref={ref => { this.overlay = ref }}
          width={width}
          height={height}
          fill="rgba(0, 0, 0, 0.1)"
          style={styles}
          />
        {
          path &&
            <BrushSelection
              d={path}
              fill="red"
              cursor="move"
              pointerEvents={isDraging ? 'none' : 'all'}
              onDraging={this.onSelectionDraging}
              onDragEnd={this.onSelectionDragEnd}
            />
        }
      </g>
    )
  }
}

export default dragable(Brush)
