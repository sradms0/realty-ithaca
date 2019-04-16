import React, { Component } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import AddressUploader from './AddressUploader';

export default class AddressItem extends Component {
  state = {
    editToggled: false,
    active: false
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editToggled: !prevState.editToggled }));
  }

  onClick = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  }

  listingButton = () => {
    const { active } = this.state;
    return (
      <Button 
        className='add'
        toggle 
        active={active} 
        onClick={this.onClick}
        icon={active ? 'minus' : 'plus'}
      />
    )
  };

  render() {
    const { editToggled } = this.state;
    const { edit, address, listing } = this.props;
    const addressString = `${address.street}, ${address.city} ${address.zip}`;
    const buttonCount = listing ? 'three' : 'two';
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button.Group>
            {this.listingButton()}
            <Button onClick={this.toggleEdit} color='teal' icon='pencil'/>
            <Button onClick={() => edit.remove(address)} basic color='red' icon='delete'/>
          </Button.Group>
        </List.Content>
        <List.Content>
          {editToggled 
            ? (
              <Header as='h4' color='red' block>{addressString}</Header>
            ) : addressString
          }
        </List.Content>
        {editToggled
          ? (
              <List.Content>
                <Container>
                  <AddressUploader update={ { updateParentDisplay: edit.updateParentDisplay, address: address} }/>
                </Container>
              </List.Content>
          ) : null
        }
      </List.Item>
    );
  }
}
