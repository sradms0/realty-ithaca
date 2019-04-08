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
    console.log(this.state.addresses[idx]);
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
    console.log('update view should happen.....');
    this.setState(prevState => ({ updateToggler: !prevState.updateToggler }));
  }

  render() {
    console.log('rendered.....');
    const { inUpdate } = this.state;
    return (
      <div>
        <AddressList 
          addresses={this.state.addresses}
          edit={ {updateParentDisplay: this.toggleUpdate, remove: this.deleteAddress} }
        />
      </div>
    );
  }
}

