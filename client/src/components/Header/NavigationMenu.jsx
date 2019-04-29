import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavigationMenu() {
  return (
    <Menu icon='labeled'>
      <Menu.Item as={ NavLink } to={'/listing/browser'}>
        <Icon name='home' />
        Listing
      </Menu.Item>

      <Menu.Item as={ NavLink } to={'/address/browser'}>
        <Icon name='map signs' />
        Address
      </Menu.Item>

      <Menu.Item as={ NavLink } to={'/image/browser'}>
        <Icon name='images' />
        Image
      </Menu.Item>
    </Menu>
  )
}
