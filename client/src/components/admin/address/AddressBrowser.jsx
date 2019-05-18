import React, { Component } from 'react';
import axios from 'axios';

import AddressList from './AddressList';

export default class AddressBrowser extends Component {
  state = {
    addresses: [],
    updateToggler: false
  }

  componentDidMount() {
    this.getAllAddresses();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update data from server there was an update (put)
    if (prevState.updateToggler  !== this.state.updateToggler) {
      this.getAllAddresses();
    }
  }

  getAllAddresses = async () => {
    try {
      const res = await axios.get('/api/address');
      this.setState(prevState => ({ addresses: res.data }))
    } catch (err) {
      console.log(err)
    }
  }

  deleteAddress = async address => {
    // get index of selected object with matching address id
    const { addresses } = this.state;
    const idx = addresses.map(addr => addr._id).indexOf(address._id);
    // remove from both db and state
    try {
      await axios.delete(`/api/address/${addresses[idx]._id}`);
      this.setState(prevState => ({ 
        addresses: [...prevState.addresses.slice(0, idx), ...prevState.addresses.slice(idx+1)] 
      }));
    } catch (err) {
        console.log(err);
    }
  }

  toggleUpdate = () => {
    this.setState(prevState => ({ updateToggler: !prevState.updateToggler }));
  }

  render() {
    const { addresses } = this.state;
    let { config } = this.props;
    // if browser has no parent, then create config
    // add to new/pre-existing config
    if (!config) config = {view: {address: true, update: true}};
    config.remove = this.deleteAddress;
    config.addresses = addresses;
    config.updateParentDisplay = this.toggleUpdate;

    return (
      <div>
        <AddressList 
          config={config}
        />
      </div>
    );
  }
}
