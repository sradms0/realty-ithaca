import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component {
  state = {
    // for listings, only one can be active
    active: this.props.addresses[0], 
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

    const { active, lastActive } = this.state;

    return (
      addresses.map(address => (
        <AddressItem 
          listing={listing} 
          preview={preview}
          addActiveAddress={addActiveAddress}
          removeInactiveAddress={removeInactiveAddress}
          lastAddressRemoved={lastAddressRemoved}
          resetLastAddressRemoved={resetLastAddressRemoved}
          activeSync={activeSync} 
          prevActiveAddress={lastActive}
          edit={edit} 
          address={address} 
          activeAddress={activeAddress}
          resetTest={this.resetTest}
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
