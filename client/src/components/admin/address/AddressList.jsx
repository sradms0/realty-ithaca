import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component {
  state = {
    // for listings, only one can be active
    active: this.props.config.addresses[0], 
  }

  addressItems = () => {
    const { 
      addresses, 
      lastAddressRemoved,
      resetLastAddressRemoved,
      addActiveAddress,
      removeInactiveAddress,
      activeAddress, 
      activeSync, 
      listing, 
      preview,
      edit 
    } = this.props;

    const { config } = this.props;
    const { active, lastActive } = this.state;

    return (
      config.addresses.map(address => (
        <AddressItem 
          config={config}
          address={address}
          key={address._id}
        />
      )
    ));
  }
  render() {
    const { addresses, edit } = this.props;
    return (<List divided verticalAlign='middle'>{this.addressItems()}</List>);
  }
}
