import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// nested routing components
import ImageRoutes from './Image/ImageRoutes';
import AddressRoutes from './Address/AddressRoutes';
import ListingRoutes from './Listing/ListingRoutes';
import PrivateRoutes from './Private/PrivateRoutes';

import Login from './Login/Login';
import NavigationMenu from './Header/NavigationMenu';

export default class App extends Component {
  state = {
    message: '',
    authd: false
  }

  componentDidMount() {
    this.ping();
  }

  ping = async () => {
    const res = await axios.get('/api');
    this.setState({ message: res.data.message });
  }

  authorize = () => {
    this.setState({ authd: true });
  }

  render() {
    const { authd } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route 
              path='/admin/login' 
              render={() => (<Login authorize={this.authorize} />)} 
            />

            <PrivateRoutes 
              authd={authd} 
              config={[
                  {path: '/admin/image', component: ImageRoutes}, 
                  {path: '/admin/address', component: AddressRoutes}, 
                  {path: '/admin/listing', component: ListingRoutes}
                ]} 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
