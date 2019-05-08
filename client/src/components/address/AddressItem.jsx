import React, { Component } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import AddressUploader from './AddressUploader';

export default class AddressItem extends Component {
  state = {
    editToggled: false,
    active: this.props.listing && this.activeAddress()
  }

  static getDerivedStateFromProps(props, state) {
    const {
      activeAddress,
      address,
      listing,
      lastAddressRemoved,
      resetLastAddressRemoved
    } = props;

    if (listing && lastAddressRemoved === address._id) {
      resetLastAddressRemoved();
      return ({ active: false });
    }
    return null;
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editToggled: !prevState.editToggled }));
  }

  onClick = (e, { className }) => {
    const { 
      edit,
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
      } else if (className === 'remove') {
        // delete from db  and from list if active
        edit.remove(address);
        removeInactiveAddress(address);
      } 
    } else if (className === 'remove') {
        edit.remove(address);
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
  }

  editButton = () => (
    <Button 
      onClick={this.toggleEdit} 
      color='teal' 
      icon='pencil'
    />
  )

  prevActiveAddress() {
    const { prevActiveAddress, address } = this.props;
    // check to see if there is an active address
    if (prevActiveAddress) {
      return prevActiveAddress._id === address._id;
    }
    return false;
  }

  activeAddress() {
    const { activeAddress, address } = this.props;
    // check to see if there is an active address
    if (activeAddress) {
      return activeAddress._id === address._id;
    }
    return false;
      
  }

  // if there is no active address, add +
  // otherwise if there is an active address, and this is the one, add +/-
  render() {
    const { active, editToggled } = this.state;
    const { edit, address, listing, preview } = this.props;
    const addressString = `${address.street}, ${address.city} ${address.zip}`;
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button.Group>
            {listing ? this.listingButton() : null}
            {!preview ? this.editButton() : null}
            <Button className='remove' onClick={this.onClick} basic color='red' icon='delete'/>
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
                  <AddressUploader 
                    listing={listing}
                    active={active}
                    update={{ 
                      updateParentDisplay: edit.updateParentDisplay, 
                      updateSiblingDisplay: edit.updateSiblingDisplay, 
                      address: address
                    }}
                  />
                </Container>
              </List.Content>
          ) : null
        }
      </List.Item>
    );
  }
}
