import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import NavigationMenu from '../Header/NavigationMenu';

export default function PrivateRoutes({ authorize, authd, config }) {
  if (authd)  {
    const privateRoutes = [(<Route key={'nav'} render={ props => (<NavigationMenu {...props} authorize={authorize}/>) } />)]
    config.forEach(i => privateRoutes.push(<Route key={i.path} path={i.path} component={i.component}/>));
    return privateRoutes;
  }
  return (<Redirect to='/admin/login'/>);
}
