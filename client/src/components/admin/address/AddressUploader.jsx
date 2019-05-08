import React, { Component } from 'react';
import {  Button, Form, Header, Message, Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class AdddressUploader extends Component {
  state = {
    street: '',
    city: '',
    zip: '',

    addressString: '',
    success: false,
    error: false
  }

  componentDidMount() {
    const { update } = this.props;
    if (update) this.preFill();
  }

  updateState = (update=null) => {
    // if this is form is for updating, then 
    // populate holder variables 
    // and add address info
    let _street = '', _city = '', _zip = '';
    if (update) {
      _street = update.street;
      _city = update.city;
      _zip = update.zip;
    }

    const { street, city, zip } = this.state;
    this.setState({ 
      street: _street,
      city: _city,
      zip: _zip,

      addressString: `${street}, ${city} ${zip}`,
      success: true, 
      error: false
    });
  }

  // fill state with address data if this form is for updating
  preFill = () => {
    const { address } = this.props.update;
    this.setState({ 
      street: address.street,
      city: address.city,
      zip: address.zip
    });
  }

  // access state based on input name attr,
  // and set from its value
  onChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  // upload address to server
  onSubmit = async e => {
    e.preventDefault();
    const { street, city, zip } = this.state;
    const { active, update, listing } = this.props;

    try {
      // update existing address if this is an update
      // otherwise a new address is being added
      if (update) {
        const res = await axios.put(`/api/address/${update.address._id}`, { street, city, zip });
        // update state/form fields and parent component to show update
        this.updateState(res.data);
        update.updateParentDisplay();

        // if the update is on an active address listing uploader,
        //  then be sure to update that active address, too
        if (listing && active) {
          update.updateSiblingDisplay(res.data);
        }
        
      } else {
        await axios.post('/api/address', { street, city, zip });
        // clear state/form
        this.updateState();
      }
      console.log('success');
    } catch(err) {
      // clear success in case another address 
      // is added and causes errors; the previous
      // success message will be cleared this way
      this.setState({ 
        success: false,
        error: err.response.data.message 
      });
    }
  }

  render() {
    const { street, city, zip } = this.state;
    const { update } = this.props;
    return (
      <Form 
        error={this.state.error ? true : false} 
        success={this.state.success ? true :false} 
        onSubmit={this.onSubmit}
        ref='form'
      >
        <Message 
          error
          header='Oops'
          content={this.state.error}
        />
        <Message 
          success
          header={`address ${ update ? 'updated' : 'added' }`}
          content={this.state.addressString}
        />

        <Header as={`h${update ? 3 : 2}`}> 
          <Icon name='map signs'/>
          <Header.Content>{ `${update ? 'Update' : 'New'} Address`}</Header.Content>
        </Header>
        <Form.Field>
          <label htmlFor='street'>Street</label>
          <Form.Input 
            name='street' 
            id='street' 
            placeholder='Street'
            value={street}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor='city'>City</label>
          <Form.Input 
            name='city' 
            id='city' 
            placeholder='City' 
            value={city}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor='zip'>Zip</label>
          <Form.Input 
            name='zip' 
            id='zip' 
            placeholder='Zip' 
            value={zip}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button type='submit'>submit</Button>
      </Form>
    );
  }
}
