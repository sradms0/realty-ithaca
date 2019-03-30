import React, { Component } from 'react';
import axios from 'axios';

import ImageUpload from './Image/ImageUpload';

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
        <ImageUpload />
      </div>
    );
  }
}
