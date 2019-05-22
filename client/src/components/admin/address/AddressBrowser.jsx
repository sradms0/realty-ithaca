import React, { Component } from 'react';
import { Button, Grid, Form } from 'semantic-ui-react';
import axios from 'axios';

import AddressList from './AddressList';

export default class AddressBrowser extends Component {
  state = {
    addresses: [],
    query: '',
    searchStatusToggled: false, // avoids extra api calls
    updateToggler: false
  }

  componentDidMount() {
    this.getAddresses();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update data from server there was an update (put)
    if (prevState.updateToggler  !== this.state.updateToggler) {
      this.getAddresses();
    }
  }

  getAddresses = async () => {
    // get images based on parent view
    const { config } = this.props;
    const newListing = config && 
      config.view && 
      config.view.listing && 
      !config.view.update;
    let res;
    try {
      // viewing addresses for a new listing
      if (newListing) {
        res = await axios.get('/api/address/status/false');
        // show all addresses for listing update or browser w/o parent view
      } else {
        res = await axios.get('/api/address');
      }
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

  toggleSearchStatus = () => {
    this.setState(prevState => ({ searchStatusToggled: !prevState.searchStatusToggled }));
  }

  onChange = (e, { value }) => { 
    // save prevState to compare to curr query
    let _prevState;
    this.setState(
      prevState => {
        _prevState = prevState;
        return { query: value };
      }, 
      // restore whole list if query is empty, 
      // only when prev query and prev search
      () => {
        const { query, searchStatusToggled } = this.state;
        const refresh = 
          searchStatusToggled &&
          _prevState.query.trim().length > 0 && 
          !query.trim().length;

        // reset list and search status if needed
        if (refresh) {
          this.toggleSearchStatus();
          this.getAddresses();
        }
      } 
    );
  }

  onSubmit = async e => {
    const { query } = this.state;
    this.toggleSearchStatus();
    e.preventDefault();

    try {
      const res = await axios.post(`/api/address/search/${query}`);
      this.setState({ addresses: res.data });
      console.log('success');
    } catch(err) {
      console.log(err);
    }
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
        <Grid>
          <Grid.Column width={6}>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <Form.Input 
                  action={<Button icon='search'/>}
                  placeholder='Search...' 
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form>
        </Grid.Column>
        </Grid>
        <AddressList config={config}/>
      </div>
    );
  }
}

