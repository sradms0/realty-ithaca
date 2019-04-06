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

  onChange = (e, { name, value }) => {
    // access state based on input name attr,
    // and set from its value
    this.setState({ [name]: value })
  }

  // upload address to server
  onSubmit = async e => {
    e.preventDefault();
    let { street, city, zip } = this.state;

    try {
      await axios.post('/api/address', { street, city, zip });
      // clear submitted data, but leave address string
      // for last successful added address
      this.setState({ 
        street: '',
        city: '',
        zip: '',

        addressString: `${street}, ${city} ${zip}`,
        success: true, 
        error: false

      });
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
    let { street, city, zip } = this.state;
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
          header='address added'
          content={this.state.addressString}
        />

        <Header as='h2'> 
          <Icon name='map signs'/>
          <Header.Content>Address</Header.Content>
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
