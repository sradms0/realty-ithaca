import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component {
  state = {
    // for listings, only one can be active
    active: this.props.config.view.listing ? this.props.config.addresses[0] : null
  }

  addressItems = () => {
    const { config } = this.props;
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
