import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavigationMenu({ match, location }) {
  // pass to isActive NavLink prop to stay active for nested menus
  const isActive = name => {
    const regExp = new RegExp(name);
    return regExp.test(location.pathname);
  }

  return (
    <Menu icon='labeled'>
      <Menu.Item as={ NavLink } to={'/listing/browser'} isActive={() => isActive('listing')}>
        <Icon name='home' />
        Listing
      </Menu.Item>

    <Menu.Item as={ NavLink } to={'/address/browser'} isActive={() => isActive('address')}>
        <Icon name='map signs' />
        Address
      </Menu.Item>

    <Menu.Item as={ NavLink } to={'/image/browser'} isActive={() => isActive('image')}>
        <Icon name='images' />
        Image
      </Menu.Item>
    </Menu>
  )
}
