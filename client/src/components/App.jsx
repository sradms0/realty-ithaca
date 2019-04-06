import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

// nested routing components
import ImageRoutes from './Image/ImageRoutes';

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
          <Route path='/image' component={ImageRoutes} />
        </div>
      </BrowserRouter>
    );
  }
}
