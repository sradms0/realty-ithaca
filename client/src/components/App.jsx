import React, { Component } from 'react';
import AdminApp from './admin/AdminApp';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/admin' component={AdminApp}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
