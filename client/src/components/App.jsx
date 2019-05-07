import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// nested routing components
import ImageRoutes from './Image/ImageRoutes';
import AddressRoutes from './Address/AddressRoutes';
import ListingRoutes from './Listing/ListingRoutes';
import PrivateRoute from './Private/PrivateRoute';

import Login from './Login/Login';
import NavigationMenu from './Header/NavigationMenu';

export default class App extends Component {
  state = {
    message: '',
    authd: null
  }

  componentDidMount() {
    this.resolveAuthStatus();
  }

  checkStatus = async () => {
    try {
      await axios.post('/api/user');
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  resolveAuthStatus = async () => {
    const status = await this.checkStatus();
    this.authorizer(status);
  }

  authorizer = status => {
    this.setState({ authd: status });
  }

  render() {
    const { authd } = this.state;
    if (authd === null) return <div>Loading...</div>;
    return (
      <BrowserRouter>
        <div className="App">
          <Route 
            render={props => (
              <NavigationMenu {...props} 
                authd={authd} 
                resolveAuthStatus={this.resolveAuthStatus} 
                authorizer={this.authorizer}
              />
            )}
          />

          <Switch>
            <PrivateRoute path='/admin/image'   authd={authd} component={ImageRoutes}/>
            <PrivateRoute path='/admin/address' authd={authd} component={AddressRoutes}/>
            <PrivateRoute path='/admin/listing' authd={authd} component={ListingRoutes}/>
            <Route 
              path='/admin/login' 
              render={() => (<Login authorizer={this.authorizer} authd={authd}/>)} 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
