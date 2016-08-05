import React from 'react'
import { findDOMNode } from 'react-dom'
import { isNil, any } from 'ramda'
import createPath from './utils/createPath'

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
  state = {
    isMouseDown: false,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
  }

  onMouseDown = ({ clientX, clientY }) => {
    const { top, left } = this.overlayDOM.getBoundingClientRect()

    this.setState({
      isMouseDown: true,
      startX: clientX - left,
      startY: clientY - top,
      endX: null,
      endY: null,
    })
  }

  onMouseUp = ({ clientX, clientY }) => {
    const { top, left } = this.overlayDOM.getBoundingClientRect()

    this.setState({
      isMouseDown: false,
      endX: clientX - left,
      endY: clientY - top,
    })
  }

  onMouseMove = ({ clientX, clientY }) => {
    if (!this.state.isMouseDown) return

    const { top, left } = this.overlayDOM.getBoundingClientRect()

    this.setState({
      endX: clientX - left,
      endY: clientY - top,
    })
  }

  componentDidMount() {
    this.overlayDOM = findDOMNode(this.overlay)
  }

  render() {
    const {
      width,
      height,
    } = this.props

    const path = createRectPathMaybeFromStartToEnd(this.state)

    return (
      <g>
        <rect
          ref={ref => { this.overlay = ref }}
          width={width}
          height={height}
          fill="green"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          style={styles}
          />
        {
          path &&
            <path
              d={path}
              fill="red"
              pointerEvents={this.state.isMouseDown ? 'none' : 'all'}
            />
        }
      </g>
    )
  }
}

export default Brush
