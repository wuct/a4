import React, { createElement } from 'react'
import { findDOMNode } from 'react-dom'
import { isNil, any, clamp } from 'ramda'
import emptyFunction from './utils/emptyFunction'

const dragable = BaseComponent =>
  class extends React.Component {
    static defaultProps = {
      onDragStart: emptyFunction,
      onDraging: emptyFunction,
      onDragEnd: emptyFunction,
    }

    state = {
      isDraging: false,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    }

    setDragState = (newState, cb) =>
      this.setState(newState, cb)

    onMouseDown = e => {
      e.stopPropagation()

      const { clientX, clientY } = e
      const { top, left } = this.DOM.getBoundingClientRect()

      this.setDragState(
        {
          isDraging: true,
          startX: clientX - left,
          startY: clientY - top,
          endX: null,
          endY: null,
        },
        () => this.props.onDragStart(this.state)
      )

      window.addEventListener('mouseup', this.onMouseUp)
      window.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseUp = e => {
      e.stopPropagation()

      const { clientX, clientY } = e
      const { top, bottom, left, right } = this.DOM.getBoundingClientRect()

      this.setDragState(
        {
          isDraging: false,
          endX: clamp(left, right, clientX) - left,
          endY: clamp(top, bottom, clientY) - top,
        },
        () => this.props.onDragEnd(this.state)
      )

      window.removeEventListener('mouseup', this.onMouseUp)
      window.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = e => {
      e.stopPropagation()

      if (!this.state.isDraging) return

      const { clientX, clientY } = e
      const { top, bottom, left, right } = this.DOM.getBoundingClientRect()

      this.setDragState(
        {
          endX: clamp(left, right, clientX) - left,
          endY: clamp(top, bottom, clientY) - top,
        },
        () => this.props.onDraging(this.state)
      )
    }

    componentDidMount() {
      this.DOM = findDOMNode(this)
      this.DOM.addEventListener('mousedown', this.onMouseDown)
    }

    componentWillUnmount() {
      this.DOM.removeEventListener('mousedown', this.onMouseDown)
      window.removeEventListener('mouseup', this.onMouseUp)
      window.removeEventListener('mousemove', this.onMouseMove)
    }

    render() {
      const {
        onDragStart,
        onDraging,
        onDragEnd,
        ...otherProps,
      } = this.props

      return (
        createElement(BaseComponent, {
          setDragState: this.setDragState,
          ...this.state,
          ...otherProps,
        })
      )
    }
  }

export default dragable
