import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import NavigationMenu from '../Header/NavigationMenu';

export default function PrivateRoutes({ authd, config }) {
  if (authd)  {
    const privateRoutes = [(<Route key={'nav'} component={NavigationMenu} />)]
    config.forEach(i => privateRoutes.push(<Route key={i.path} path={i.path} component={i.component}/>));
    return privateRoutes;
  }
  return (<Redirect to='/login'/>);
}
