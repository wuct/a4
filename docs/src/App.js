import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import BarChartExample from './BarChartExample'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to A4</h2>
        </div>
        <p className="App-intro">
          <BarChartExample />
        </p>
      </div>
    )
  }
}

export default App
