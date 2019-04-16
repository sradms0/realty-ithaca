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

    lastImageRemoved: null,

    addressBrowserToggled: false,
    addressUploaderToggled: false,
    imageBrowserToggled: false,
    imageUploaderToggled: false,

    success: false,
    error: false
  }

  resetLastImageRemoved = () => {
    this.setState({ lastImageRemoved: null });
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
          resetLastImageRemoved={this.resetLastImageRemoved}
          listing={true} 
          activeSync={this.updateActiveImageIds} 
          activeImages={selectedImages}
          lastImageRemoved={this.state.lastImageRemoved}
        />
      );
    }
    if (this.state.addressBrowserToggled) {
      return (
        <AddressBrowser listing={true}/>
      );
    }
    if (this.state.imageUploaderToggled)    return (<ImageUploader />);
    if (this.state.addressUploaderToggled)  return (<AddressUploader />);
    return null;
  }

  updateActiveImageIds = ids => {
    this.setState({ selectedImages: [...ids] });
  }

  removeSelectedImage = ({ _id }) => {
    const { selectedImages } = this.state;
    const idx = selectedImages.map(i => i._id).indexOf(_id);
    this.setState(prevState => ({
      selectedImages: [
        ...prevState.selectedImages.slice(0,idx),
        ...prevState.selectedImages.slice(idx+1)
      ],
      lastImageRemoved: _id
    }))
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
            <ImageList preview images={selectedImages} edit={ {remove: this.removeSelectedImage} }/>
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
