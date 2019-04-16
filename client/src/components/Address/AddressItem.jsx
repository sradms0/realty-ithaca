import React, { Component } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import AddressUploader from './AddressUploader';

export default class AddressItem extends Component {
  state = {
    editToggled: false,
    active: (this.props.listing && this.activeAddress()) ? true : false
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editToggled: !prevState.editToggled }));
  }

  onClick = (e, { className }) => {
    const { 
      listing,
      address,
      addActiveAddress,
      removeInactiveAddress
    } = this.props;

    // base click on class of button
    if (listing) {
      if (className === 'add') {
        // prospective image added to a new listing
        this.setState(
          prevState => ({ active: !prevState.active}), 
          () => {
            if (this.state.active) addActiveAddress(address);
            else removeInactiveAddress();
          }
        );
      }
    }
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

  activeAddress() {
    const { activeAddress, address } = this.props;
    // check to see if there is an active address
    if (activeAddress) {
      return activeAddress._id === address._id;
    }
    return false;
      
  }

  render() {
    const { editToggled } = this.state;
    const { edit, address, listing } = this.props;
    const addressString = `${address.street}, ${address.city} ${address.zip}`;
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
