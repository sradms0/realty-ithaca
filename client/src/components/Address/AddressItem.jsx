import React from 'react';
import { Button, List } from 'semantic-ui-react';

export default function AddressItem({ address, remove }) {
  return (
    <List.Item>
      <List.Content floated='right'>
        <Button.Group>
          <Button basic color='teal' icon='pencil'/>
          <Button onClick={() => remove(address)} basic color='red' icon='delete'/>
        </Button.Group>
      </List.Content>
      <List.Content>
        { `${address.street} ${address.city} ${address.zip}` }
      </List.Content>
    </List.Item>
  );
}
