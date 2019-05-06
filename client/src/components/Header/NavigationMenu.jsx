import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavigationMenu({ match, location }) {
  // pass to isActive NavLink prop to stay active for nested menus
  const isActive = name => {
    const regExp = new RegExp(name);
    return regExp.test(location.pathname);
  }
  
  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
      console.log('logged out');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Menu icon='labeled'>
      <Menu.Item as={ NavLink } to={'/admin/listing/browser'} isActive={() => isActive('listing')}>
        <Icon name='home' />
        Listing
      </Menu.Item>

      <Menu.Item as={ NavLink } to={'/admin/address/browser'} isActive={() => isActive('address')}>
        <Icon name='map signs' />
        Address
      </Menu.Item>

      <Menu.Item as={ NavLink } to={'/admin/image/browser'} isActive={() => isActive('image')}>
        <Icon name='images' />
        Image
      </Menu.Item>

      <Menu.Item as={ NavLink } to={'/admin/login'} onClick={logout} position='right'>
        <Icon name='logout' />
        Logout
      </Menu.Item>
    </Menu>
  )
}
