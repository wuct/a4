import React, { createElement } from 'react'
import { findDOMNode } from 'react-dom'
import { isNil, any, clamp } from 'ramda'

const brushable = BaseComponent =>
  class extends React.Component {
    state = {
      isBrushing: false,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    }

    onMouseDown = ({ clientX, clientY }) => {
      const { top, left } = this.DOM.getBoundingClientRect()

      this.setState({
        isBrushing: true,
        startX: clientX - left,
        startY: clientY - top,
        endX: null,
        endY: null,
      })

      window.addEventListener('mouseup', this.onMouseUp)
      window.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseUp = ({ clientX, clientY }) => {
      const { top, bottom, left, right } = this.DOM.getBoundingClientRect()

      this.setState({
        isBrushing: false,
        endX: clamp(left, right, clientX) - left,
        endY: clamp(top, bottom, clientY) - top,
      })

      window.removeEventListener('mouseup', this.onMouseUp)
      window.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = ({ clientX, clientY }) => {
      if (!this.state.isBrushing) return

      const { top, bottom, left, right } = this.DOM.getBoundingClientRect()

      this.setState({
        endX: clamp(left, right, clientX) - left,
        endY: clamp(top, bottom, clientY) - top,
      })
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
      return (
        createElement(BaseComponent, {
          ...this.props,
          ...this.state,
        })
      )
    }
  }

export default brushable
