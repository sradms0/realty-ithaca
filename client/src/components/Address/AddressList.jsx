import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component {
  state = {
    active: this.props.addresses[0],
    lastActive: null // needed to allow only one address to be active
  }

  resetTest = () => {
    this.setState({ active: null, lastActive: null });
  }

  addActiveAddress = address => {
    this.setState(prevState => ({
        active: address, 
        lastActive: prevState.active
      }),
      () => this.props.activeSync(this.state.active));
  }

  removeInactiveAddress = () => {
    this.setState({ active: null }, 
    () => this.props.activeSync());
  }

  addressItems = () => {
    const { 
      addresses, 
      lastAddressRemoved,
      resetLastAddressRemoved,
      activeAddress, 
      activeSync, 
      listing, 
      preview,
      edit 
    } = this.props;

    const { active, lastActive } = this.state;

    return (
      addresses.map((address, i) => (
        <AddressItem 
          listing={listing} 
          preview={preview}
          addActiveAddress={this.addActiveAddress}
          removeInactiveAddress={this.removeInactiveAddress}
          lastAddressRemoved={lastAddressRemoved}
          resetLastAddressRemoved={resetLastAddressRemoved}
          activeSync={activeSync} 
          activeAddress={active} 
          prevActiveAddress={lastActive}
          edit={edit} 
          address={address} 
          resetTest={this.resetTest}
          key={i}
        />
      )
    ));
  }
  render() {
    const { addresses, edit } = this.props;
    return (<List divided verticalAlign='middle'>{this.addressItems()}</List>);
  }
}
