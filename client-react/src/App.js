import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    data: {}
  }

  getData = () => {
    axios.get('/api/genres').then(res => console.log(res.data))
  }

  render () {
    return (
      <div>
        <h1>Here is the first data</h1>
        <button onClick={this.getData}>Get that data</button>
      </div>
    )
  }
}

export default App
