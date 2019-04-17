import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import AddressItem from './AddressItem';

export default class AddressList extends Component {
  state = {
    active: this.props.activeAddress,
    lastActive: null
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
          activeSync={activeSync} 
          activeAddress={active} 
          prevActiveAddress={lastActive}
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
