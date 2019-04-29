import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

// nested routing components
import ImageRoutes from './Image/ImageRoutes';
import AddressRoutes from './Address/AddressRoutes';
import ListingRoutes from './Listing/ListingRoutes';

import NavigationMenu from './Header/NavigationMenu';

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
          <NavigationMenu />
          <Route path='/image' component={ImageRoutes} />
          <Route path='/address' component={AddressRoutes} />
          <Route path='/listing' component={ListingRoutes} />
        </div>
      </BrowserRouter>
    );
  }
}
