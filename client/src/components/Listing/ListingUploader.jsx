import React, { Component } from 'react';
import { Button, Container, Form, Header, Message, Icon } from 'semantic-ui-react';
import axios from 'axios';

import AddressBrowser from '../Address/AddressBrowser';
import AddressUploader from '../Address/AddressUploader';
import ImageBrowser from '../Image/ImageBrowser';
import ImageUploader from '../Image/ImageUploader';
import ImageList from '../Image/ImageList';

export default class ListingUploader extends Component {
  state = {
    address: '',
    selectedImages: [],

    addressBrowserToggled: false,
    addressUploaderToggled: false,
    imageBrowserToggled: false,
    imageUploaderToggled: false,

    success: false,
    error: false
  }

  togglerSwitch = (e, { id }) => {
    const selected = id+'Toggled';

    // re-create/set non-selected togglers to false
    const togglers = Object.keys(this.state)
      .filter(i => (!i.includes(id) && i.includes('Toggled')))
      .map(i => ({ [i]: false }));

    // add selected toggler with opp of prev state
    togglers.unshift({ [selected]: !this.state[ [selected] ] });

    // combine objs into one to set new state
    const newState = togglers.reduce((acc, curr) => {
      let key = Object.keys(curr);
      acc[key] = curr[key];
      return acc;
    }, {});

    this.setState(newState);
  }

  // return current image feature (browser, uploader) 
  feature = () => {
    const { imageBrowserToggled, selectedImages } = this.state;
    if (imageBrowserToggled) {
      return (
        <ImageBrowser 
          listing={true} 
          activeSync={this.updateActiveImageIds} 
          activeImages={selectedImages}
        />
      );
    }
    if (this.state.imageUploaderToggled)    return (<ImageUploader />);
    if (this.state.addressBrowserToggled)   return (<AddressBrowser />);
    if (this.state.addressUploaderToggled)  return (<AddressUploader />);
    return null;
  }

  updateActiveImageIds = ids => {
    this.setState({ selectedImages: [...ids] });
  }

  // in testing....
  images = () => {
    return this.state.selectedImages.map((i, key) => (<span key={key}>${i._id} </span>));
  }

  onSubmit = e => console.log(e, 'testing...');

  render() {
    const { update } = this.props;
    const { selectedImages } = this.state;
    return ( 
      <span>
        <Form 
          onSubmit={this.onSubmit}
        >
          <Header as={`h${update ? 3 : 2}`}> 
            <Icon name='home'/>
            <Header.Content>{ `${update ? 'Update' : 'New'} Listing`}</Header.Content>
          </Header>

          <Form.Field>
            <label htmlFor='address'>Address</label>
            <Button.Group>
              <Button id='addressBrowser' color='teal' compact onClick={this.togglerSwitch} icon='search' content='Browse' />
              <Button id='addressUploader' color='green' compact onClick={this.togglerSwitch} icon='plus' content='New' />
            </Button.Group>
          </Form.Field>

          <Form.Field>
            <label htmlFor='images'>Images</label>
            <ImageList preview images={selectedImages}/>
            <Button.Group>
              <Button id='imageBrowser' color='teal' compact onClick={this.togglerSwitch} icon='search' content='Browse' />
              <Button id='imageUploader' color='green' compact onClick={this.togglerSwitch} icon='plus' content='New' />
            </Button.Group>
          </Form.Field>
          <Button type='submit'>submit</Button>
        </Form>

        <Container>
          { this.feature() }
        </Container>
      </span>
    );
  }
}
