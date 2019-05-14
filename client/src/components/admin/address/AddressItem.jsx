import React, { Component } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import AddressUploader from './AddressUploader';

export default class AddressItem extends Component {
  state = {
    editToggled: false,
    active: this.props.config.view.listing && this.activeAddress()
  }

  static getDerivedStateFromProps(props, state) {
    const { address, config } = props;

    if (config.view.listing && config.lastAddressRemoved === address._id) {
      config.resetLastAddressRemoved();
      return ({ active: false });
    }
    return null;
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editToggled: !prevState.editToggled }));
  }

  onClick = (e, { className }) => {
    const { config, address } = this.props;

    // base click on class of button
    if (config.view.listing) {
      if (className === 'add') {
        // prospective image added to a new listing
        this.setState(
          prevState => ({ active: !prevState.active}), 
          () => {
            if (this.state.active) config.addActiveAddress(address);
            else config.removeInactiveAddress();
          }
        );
      } else if (className === 'remove') {
        // delete from db  and from list if active
        config.remove(address);
        config.removeInactiveAddress(address);
      } 
    } else if (className === 'remove') {
        config.remove(address);
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

  addressUpdate = () => {
    const { address, config } = this.props;
    const { active } = this.state;
    config.update = true;
    return (
      <AddressUploader 
        config={config}
        address={address}
        active={active}
      />
    );
  }

  prevActiveAddress() {
    const { config, address } = this.props;
    // check to see if there is an active address
    if (config.prevActiveAddress) {
      return config.prevActiveAddress._id === address._id;
    }
    return false;
  }

  activeAddress() {
    const { config, address } = this.props;
    // check to see if there is an active address
    if (config.activeAddress) {
      return config.activeAddress._id === address._id;
    }
    return false;
      
  }

  // if there is no active address, add +
  // otherwise if there is an active address, and this is the one, add +/-
  render() {
    const { active, editToggled } = this.state;
    const { config, address } = this.props;
    const addressString = `${address.street}, ${address.city} ${address.zip}`;
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button.Group>
            {config.view.listing && !config.view.preview ? this.listingButton() : null}
            {!config.view.preview ? this.editButton() : null}
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
                  {this.addressUpdate()}
                </Container>
              </List.Content>
          ) : null
        }
      </List.Item>
    );
  }
}
