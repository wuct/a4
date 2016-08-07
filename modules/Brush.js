import React from 'react'
import { findDOMNode } from 'react-dom'
import { clamp, all, and, both, gte, lte, flip, pipe, evolve } from 'ramda'
import createPath from './utils/createPath'
import translate from './utils/translate'
import Dragable from './Dragable'
import BrushSelection from './BrushSelection'

const { max, min } = Math

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

const transformAreaToDelta = ({ x0, y0, x1, y1 }) => ({
  dx: x1 - x0,
  dy: y1 - y0,
})

class Brush extends React.Component {
  state = {
    selection: null,
    delta: null,
  }

  overlay = null

  clampSelectionByBoundaries = ({ x0, y0, x1, y1 }) => {
    const { top, bottom, left, right } = this.overlay.getBoundingClientRect()

    return {
      x0: x0 - left,
      y0: y0 - top,
      x1: clamp(left, right, x1) - left,
      y1: clamp(top, bottom, y1) - top,
    }
  }

  clampDeltaByBoundaries = ({ dx, dy }) => {
    const { selection: { x0, x1, y0, y1 } = {}} = this.state
    const { width, height } = this.overlay.getBoundingClientRect()

    return {
      dx: clamp(-min(x0, x1), width - max(x0, x1))(dx),
      dy: clamp(-min(y0, y1), height - max(y0, y1))(dy),
    }
  }

  onBrushStart = () =>
    this.setState({
      isBrushing: true,
      selection: null,
    })

  onBrushing = dragArea =>
    this.setState({
      selection: this.clampSelectionByBoundaries(dragArea)
    })

  onBrushEnd = dragArea =>
    this.setState({
      isBrushing: false,
      selection: this.clampSelectionByBoundaries(dragArea)
    })

  onSelectionDraging = pipe(
    transformAreaToDelta,
    this.clampDeltaByBoundaries,
    ({ dx, dy }) => {
      this.setState({
        delta: { dx, dy },
      })
    }
  )

  onSelectionDragEnd = () => {
    const {
      delta: { dx, dy },
      selection: { x0, x1, y0, y1 },
    } = this.state

    this.setState({
      delta: null,
      selection: {
        x0: x0 + dx,
        x1: x1 + dx,
        y0: y0 + dy,
        y1: y1 + dy,
      }
    })
  }

  render() {
    const {
      width,
      height,
    } = this.props

    const {
      selection,
      delta,
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
          selection &&
            <BrushSelection
              d={createPathFromArea(selection)}
              transform={delta ? translate(delta.dx, delta.dy) : undefined}
              fill="red"
              cursor="move"
              pointerEvents={isBrushing ? 'none' : 'all'}
              onDraging={this.onSelectionDraging}
              onDragEnd={this.onSelectionDragEnd}
            />
        }
      </Dragable>
    )
  }
}

export default Brush
