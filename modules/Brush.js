import React from 'react'
import R from 'ramda'
import createPath from './utils/createPath'
import translate from './utils/translate'
import Dragable from './Dragable'
import BrushSelection from './BrushSelection'
import emptyFunction from './utils/emptyFunction'

const { max, min } = Math

const styles = {
  cursor: 'crosshair',
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
  static defaultProps = {
    onBrushStart: emptyFunction,
    onBrushing: emptyFunction,
    onBrushEnd: emptyFunction,
  }

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
      x1: R.clamp(left, right, x1) - left,
      y1: R.clamp(top, bottom, y1) - top,
    }
  }

  clampDeltaByBoundaries = ({ dx, dy }) => {
    const { selection: { x0, x1, y0, y1 } = {}} = this.state
    const { width, height } = this.overlay.getBoundingClientRect()

    return {
      dx: R.clamp(-min(x0, x1), width - max(x0, x1))(dx),
      dy: R.clamp(-min(y0, y1), height - max(y0, y1))(dy),
    }
  }

  onBrushStart = dragArea =>
    this.setState({
      isBrushing: true,
      selection: null,
    }, () => this.props.onBrushStart(dragArea))

  onBrushing = dragArea =>
    this.setState({
      selection: this.clampSelectionByBoundaries(dragArea),
    }, () => this.props.onBrushing(dragArea))

  onBrushEnd = dragArea =>
    this.setState({
      isBrushing: false,
      selection: this.clampSelectionByBoundaries(dragArea),
    }, () => this.props.onBrushEnd(dragArea))

  onSelectionDraging = R.pipe(
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

    const newArea = {
      x0: x0 + dx,
      x1: x1 + dx,
      y0: y0 + dy,
      y1: y1 + dy,
    }

    this.setState({
      delta: null,
      selection: newArea,
    }, () => this.props.onBrushEnd(newArea))
  }


  render() {
    const {
      width,
      height,
      fill = 'rgba(0, 0, 0, 0.1)',
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
          opacity="0"
          ref={ref => { this.overlay = ref }}
          width={width}
          height={height}
          style={styles}
        />
        {
          selection &&
            <BrushSelection
              d={createPathFromArea(selection)}
              transform={delta ? translate(delta.dx, delta.dy) : undefined}
              fill={fill}
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
