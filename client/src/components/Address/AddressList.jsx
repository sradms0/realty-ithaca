import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component {
  state = {
    active: this.props.activeAddress
  }

  addActiveAddress = address => {
    this.setState({ active: address }, 
    () => this.props.activeSync(this.state.active));
  }

  removeInactiveAddress = () => {
    this.setState({ active: null }, 
    () => this.props.activeSync());
  }

  addressItems = () => {
    const { 
      addresses, 
      activeAddress, 
      activeSync, 
      listing, 
      edit 
    } = this.props;

    return (
      addresses.map((address, i) => (
        <AddressItem 
          listing={listing} 
          addActiveAddress={this.addActiveAddress}
          removeInactiveAddress={this.removeInactiveAddress}
          activeSync={activeSync} 
          activeAddress={activeAddress} 
          edit={edit} 
          address={address} 
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
