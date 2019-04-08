import React, { Component } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import AddressUploader from './AddressUploader';

export default class AddressItem extends Component {
  state = { editToggled: false }

  toggleEdit = () => {
    this.setState(prevState => ({ editToggled: !prevState.editToggled }));
  }

  render() {
    const { editToggled } = this.state;
    const { edit, address } = this.props;
    const addressString = `${address.street}, ${address.city} ${address.zip}`;
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button.Group>
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
