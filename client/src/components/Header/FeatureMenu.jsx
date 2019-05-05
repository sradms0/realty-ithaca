import React from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function FeatureMenu({ config }) {
  // dynamically create a sub menu containing features from config 
  // -the content for each button will be the same as the nested route
  const { content, root } = config;
  console.log('root: ', root);
  const menuItems = () => content.map(i => (
    <Menu.Item key={i} as={ NavLink } to={`${root}/${i.toLowerCase()}`} content={i}/>
  ));
  return (
    <Menu secondary>
        {menuItems()}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
  )
}


