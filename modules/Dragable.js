import React from 'react'
import { findDOMNode } from 'react-dom'
import emptyFunction from './utils/emptyFunction'

class Dragable extends React.Component {
  static defaultProps = {
    onDragStart: emptyFunction,
    onDraging: emptyFunction,
    onDragEnd: emptyFunction,
  }

  isDraging = false
  dragStartPosition = {}

  componentDidMount() {
    this.DOM = findDOMNode(this)
    this.DOM.addEventListener('mousedown', this.onMouseDown)
  }

  componentWillUnmount() {
    this.DOM.removeEventListener('mousedown', this.onMouseDown)
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseDown = (e) => {
    e.stopPropagation()

    this.isDraging = true
    this.dragStartPosition = {
      x0: e.clientX,
      y0: e.clientY,
    }

    this.props.onDragStart(this.dragStartPosition)

    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseUp = (e) => {
    e.stopPropagation()

    this.props.onDragEnd({
      ...this.dragStartPosition,
      x1: e.clientX,
      y1: e.clientY,
    })

    this.isDraging = false
    this.dragStartPosition = {}

    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = (e) => {
    e.stopPropagation()

    if (!this.isDraging) return

    this.props.onDraging({
      ...this.dragStartPosition,
      x1: e.clientX,
      y1: e.clientY,
    })
  }


  render() {
    return <g>{this.props.children}</g>
  }
}

export default Dragable
