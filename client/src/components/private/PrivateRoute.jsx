import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ authd, path, component }) {
  if (authd) return (<Route path={path} component={component}/>);
  return (<Redirect to='/admin/login'/>);
}
