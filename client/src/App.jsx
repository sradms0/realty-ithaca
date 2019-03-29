import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
    this.ping();
  }

  ping = async () => {
    const res = await axios.get('/api');
    this.setState({ message: res.data.message });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.message}</p>
          <button onClick={this.ping}>ping</button>
        </header>
      </div>
    );
  }
}
