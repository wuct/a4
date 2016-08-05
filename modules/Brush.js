import React from 'react'
import { findDOMNode } from 'react-dom'
import { isNil, any, clamp } from 'ramda'
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

    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseUp = ({ clientX, clientY }) => {
    const { top, bottom, left, right } = this.overlayDOM.getBoundingClientRect()

    this.setState({
      isMouseDown: false,
      endX: clamp(left, right, clientX) - left,
      endY: clamp(top, bottom, clientY) - top,
    })

    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = ({ clientX, clientY }) => {
    if (!this.state.isMouseDown) return

    const { top, bottom, left, right } = this.overlayDOM.getBoundingClientRect()

    this.setState({
      endX: clamp(left, right, clientX) - left,
      endY: clamp(top, bottom, clientY) - top,
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
