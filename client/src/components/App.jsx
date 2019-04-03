import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import ImageUploader from './Image/ImageUploader';
import ImageBrowser from './Image/ImageBrowser';

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
      <BrowserRouter>
        <div className="App">

          <Route path='/image-uploader' component={ImageUploader} />
          <Route path='/image-browser' component={ImageBrowser} />

        </div>
      </BrowserRouter>
    );
  }
}
