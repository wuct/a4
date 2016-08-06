import React from 'react'
import { findDOMNode } from 'react-dom'
import { isNil, any, clamp } from 'ramda'
import createPath from './utils/createPath'
import brushable from './brushable'
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
  render() {
    const {
      width,
      height,
    } = this.props

    const path = createRectPathMaybeFromStartToEnd(this.props)

    return (
      <g>
        <rect
          ref={ref => { this.overlay = ref }}
          width={width}
          height={height}
          fill="green"
          style={styles}
          />
        {
          path &&
            <BrushSelection
              d={path}
              fill="red"
              cursor="move"
              pointerEvents={this.props.isBrushing ? 'none' : 'all'}
            />
        }
      </g>
    )
  }
}

export default brushable(Brush)
