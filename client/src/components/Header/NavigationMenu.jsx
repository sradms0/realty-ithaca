import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavigationMenu({ match, location, authd, authorizer, resolveAuthStatus }) {
  // pass to isActive NavLink prop to stay active for nested menus
  const isActive = name => {
    const regExp = new RegExp(name);
    return regExp.test(location.pathname);
  }
  
  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
      authorizer(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Menu icon='labeled'>
      <Menu.Item as={ NavLink } to={'/admin/app/listing/browser'} onClick={resolveAuthStatus} isActive={() => isActive('listing')}>
        <Icon name='home' />
        Listing
      </Menu.Item>

    <Menu.Item as={ NavLink } to={'/admin/app/address/browser'} onClick={resolveAuthStatus} isActive={() => isActive('address')}>
        <Icon name='map signs' />
        Address
      </Menu.Item>

    <Menu.Item as={ NavLink } to={'/admin/app/image/browser'}  onClick={resolveAuthStatus} isActive={() => isActive('image')}>
        <Icon name='images' />
        Image
      </Menu.Item>

      <Menu.Item as={ NavLink } to={'/admin/login'} onClick={logout} position='right'>
        <Icon name='log out' />
        Logout
      </Menu.Item>
    </Menu>
  )
}
