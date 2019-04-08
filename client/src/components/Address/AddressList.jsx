import React from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default function AddressList({ addresses, edit }) {
  const addressItems = addresses.map((address, i) => (
    <AddressItem edit={edit} address={address} key={i}/>
  ));
    return (<List divided verticalAlign='middle'>{addressItems}</List>);
}
