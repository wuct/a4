import React from 'react'
import { findDOMNode } from 'react-dom'
import { clamp } from 'ramda'
import createPath from './utils/createPath'
import Dragable from './Dragable'
import BrushSelection from './BrushSelection'

const styles = {
  cursor: 'crosshair'
}

const createPathFromArea = ({ x0, y0, x1, y1 }) =>
  createPath([
    [x0, y0],
    [x0, y1],
    [x1, y1],
    [x1, y0],
    [x0, y0],
  ])

class Brush extends React.Component {
  state = {
    brushSelection: null
  }

  overlay = null

  clampSelectionByBoundingClientRect = ({ x0, y0, x1, y1 }) => {
    const {
      top,
      bottom,
      left,
      right,
    } = this.overlay.getBoundingClientRect()

    return {
      x0: x0 - left,
      y0: y0 - top,
      x1: clamp(left, right, x1) - left,
      y1: clamp(top, bottom, y1) - top,
    }
  }

  onBrushStart = () =>
    this.setState({
      isBrushing: true,
      brushSelection: null,
    })

  onBrushing = dragArea =>
    this.setState({
      brushSelection: this.clampSelectionByBoundingClientRect(dragArea)
    })

  onBrushEnd = dragArea =>
    this.setState({
      isBrushing: false,
      brushSelection: this.clampSelectionByBoundingClientRect(dragArea)
    })

  render() {
    const {
      width,
      height,
    } = this.props

    const {
      brushSelection,
      isBrushing,
    } = this.state

    return (
      <Dragable
        onDragStart={this.onBrushStart}
        onDraging={this.onBrushing}
        onDragEnd={this.onBrushEnd}
      >
        <rect
          ref={ref => { this.overlay = ref }}
          width={width}
          height={height}
          fill="rgba(0, 0, 0, 0.1)"
          style={styles}
          />
        {
          brushSelection &&
            <BrushSelection
              d={createPathFromArea(brushSelection)}
              fill="red"
              cursor="move"
              pointerEvents={isBrushing ? 'none' : 'all'}
            />
        }
      </Dragable>
    )
  }
}

export default Brush
