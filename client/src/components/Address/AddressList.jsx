import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component{
  addressItems = () => {
    const { addresses, listing, edit } = this.props;
    return (
      addresses.map((address, i) => (
        <AddressItem 
          listing={listing} 
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
