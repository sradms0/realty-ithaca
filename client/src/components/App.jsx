import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// nested routing components
import ImageRoutes from './Image/ImageRoutes';
import AddressRoutes from './Address/AddressRoutes';
import ListingRoutes from './Listing/ListingRoutes';
//import PrivateRoutes from './Private/PrivateRoutes';
import PrivateRoute from './Private/PrivateRoute';

import Login from './Login/Login';
import NavigationMenu from './Header/NavigationMenu';

export default class App extends Component {
  state = {
    message: '',
    authd: false
  }

  componentDidMount() {
    this.checkStatus();
  }

  checkStatus = async () => {
    try {
      await axios.post('/api/user');
      this.authorize();
    } catch (err) {
      console.log(err)
    }

  }

  authorize = () => {
    console.log('here');
    this.setState(prevState => ({ authd: !prevState.authd }));
  }

  render() {
    const { authd } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          {authd ? (<Route render={props => <NavigationMenu {...props} authd={authd} authorize={this.authorize}/>}/>): null}
          <Switch>
            <PrivateRoute path='/admin/image'   authd={authd} component={ImageRoutes}/>
            <PrivateRoute path='/admin/address' authd={authd} component={AddressRoutes}/>
            <PrivateRoute path='/admin/listing' authd={authd} component={ListingRoutes}/>
            <Route 
              path='/admin/login' 
              render={() => (<Login authorize={this.authorize} authd={authd}/>)} 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
