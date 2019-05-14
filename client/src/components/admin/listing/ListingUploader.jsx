import React, { Component } from 'react';
import { Button, Container, Form, Header, Message, Icon } from 'semantic-ui-react';
import axios from 'axios';

import AddressBrowser from '../address/AddressBrowser';
import AddressUploader from '../address/AddressUploader';
import AddressList from '../address/AddressList';
import ImageBrowser from '../image/ImageBrowser';
import ImageUploader from '../image/ImageUploader';
import ImageList from '../image/ImageList';

export default class ListingUploader extends Component {
  state = {
    address: null,
    newImages: [],
    currentImages: [],
    deleteImages: [],

    // use for updating children to inactive 
    // if removed from sibling list previewer
    lastAddressRemoved: null,
    lastImageRemoved: null,

    addressBrowserToggled: false,
    addressUploaderToggled: false,
    imageBrowserToggled: false,
    imageUploaderToggled: false,

    addressEdited: false,

    addressString: '',
    success: false,
    error: false
  }

  componentDidMount() {
    const { update } = this.props;
    if (update) this.preFill();
  }

  // fill state with listing data if this form is for updating
  preFill = () => {
    const { listing: {address, images} } = this.props.update;
    this.setState({ 
      address: address,
      currentImages: images
    });
  }

  addAddress = address => {
    const { lastAddress } = this.state;
    const newState = {address: address};
    if (this.state.address) {
      newState.lastAddressRemoved = this.state.address._id
    }
    this.setState(newState);
  }

  shiftImage = (image,  verb) => {
    const { currentImages, deleteImages, newImages } = this.state;
    const { _id } = image;
    const key = image.status ? 'currentImages' : 'newImages';
    const selected = this.state[key];

    let update;
    let idx;

    if (verb) {
      if (verb === 'add') {
        // if image was current, then move it back to curentImages
        // otherwise it is a new image
        update = { [key]: [...selected, image] };
        if (key === 'currentImages') {
          idx = deleteImages.map(image => image._id).indexOf(_id);
          update.deleteImages = [
            ...deleteImages.slice(0,idx), 
            ...deleteImages.slice(idx+1) 
          ];
        }

      } else if (verb === 'remove') {
        // remove from selected (current or new) image list
        idx = selected.map(image => image._id).indexOf(_id);
        update = {
          [key]: [ 
            ...selected.slice(0,idx), 
            ...selected.slice(idx+1) 
          ],
          lastImageRemoved: _id
        }
        // if image was current, then move it to deleteImages
        // otherwise this was a new image
        if (key === 'currentImages') {
          update.deleteImages = [
            ...deleteImages,
            selected[idx]
          ];
        }
      }
      this.setState(update);
    }
  }

  concatActiveImages = () => {
    const { newImages, currentImages } = this.state;
    return [...newImages, ...currentImages];
  }

  removeAddress = () => {
    const { address } = this.state;
    if (address) {
      this.setState(prevState => ({ 
          address: null,  
          lastAddressRemoved: prevState.address._id
        })
      );
    }
  }

  resetLastImageRemoved = () => {
    this.setState({ lastImageRemoved: null });
  }

  resetLastAddressRemoved = () => {
    this.setState({ lastAddressRemoved: null });
  }

  updateAddress = (address) => {
    this.setState({ address: address })
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
    const { imageBrowserToggled, address, currentImages, newImages } = this.state;
    if (imageBrowserToggled) {
      return (
        <ImageBrowser 
          config={{
            view: {listing: true, image: true},
            resetLastImageRemoved: this.resetLastImageRemoved,
            activeImages: this.concatActiveImages(),
            shiftImage: this.shiftImage,
            lastImageRemoved: this.state.lastImageRemoved
          }}
        />
      );
    }
    if (this.state.addressBrowserToggled) {
      return (
        <AddressBrowser 
          config={{
            view: {listing: true, update: true},
            activeAddress: this.state.address,
            addActiveAddress: this.addAddress,
            removeInactiveAddress: this.removeAddress,
            activeSync: this.updateActiveAddress 
          }}
          lastAddressRemoved={this.state.lastAddressRemoved}
          resetLastAddressRemoved={this.resetLastAddressRemoved}
          updateSiblingDisplay={this.updateAddress}
        />
      );
    }
    if (this.state.imageUploaderToggled)    return (<ImageUploader />);
    if (this.state.addressUploaderToggled)  return (<AddressUploader />);
    return null;
  }

  updateState = (update=null) => {
    // if this is form is for updating, then 
    // populate holder variables 
    // and add listing info
    let _address = null, _currentImages = [];
    if (update) {
      _address = update.address;
      _currentImages = update.images;
    }
    const { address: {street, city, zip} } = this.state;
    this.setState({ 
      address: _address,
      newImages: [],
      currentImages: _currentImages,

      lastAddressRemoved: null,
      lastImageRemoved: null,

      addressBrowserToggled: false,
      addressUploaderToggled: false,
      imageBrowserToggled: false,
      imageUploaderToggled: false,

      addressEdited: false,

      addressString: `${street}, ${city} ${zip}`,
      success: true,
      error: false
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    const filterIds = child => child.map(i => i._id);
    const { address, newImages, currentImages, deleteImages } = this.state;
    const { update } = this.props;

    // prepare image ids to send to server
    const images = {newImages: filterIds(newImages)} ;

    try {
      // update existing listing if this is an update
      // otherwise a new listing is being added
      if (update) {
        // add deleteImages ids to image obj for updating
        images.deleteImages = filterIds(deleteImages);
        const res = await axios.put(`/api/listing/${update.listing._id}`, { address, images });
        // update state/form fields and parent component to show update
        this.updateState(res.data);
        update.updateParentDisplay();
      } else {
        await axios.post('/api/listing', { address, images: newImages });
        // clear state
        this.updateState();
      }
      console.log('success');
    } catch (err) {
      // clear success in case another listing 
      // is added and causes errors; the previous
      // success message will be cleared this way
      console.log(err);
      this.setState({ 
        success: false,
        error: err.response.data.message 
      });
    }
  }

  render() {
    const { update } = this.props;
    const { address, newImages, currentImages } = this.state;
    return ( 
      <span>
        <Form 
          error={this.state.error ? true : false} 
          success={this.state.success} 
          onSubmit={this.onSubmit}
        >
          <Message 
            error
            header='Oops'
            content={this.state.error}
          />
          <Message 
            success
            header={`listing ${ update ? 'updated' : 'added' }`}
            content={this.state.addressString}
          />
          <Header as={`h${update ? 3 : 2}`}> 
            <Icon name='home'/>
            <Header.Content>{ `${update ? 'Update' : 'New'} Listing`}</Header.Content>
          </Header>

          <Form.Field>
            <label htmlFor='address'>Address</label>
            <AddressList 
              config={{
                view:{listing: true, preview: true},
                addresses: address ? [address] : [],
                remove: this.removeAddress,
              }}
            />
            <Button.Group>
              <Button type='button' id='addressBrowser' color='teal' compact onClick={this.togglerSwitch} icon='search' content='Browse' />
              <Button type='button' id='addressUploader' color='green' compact onClick={this.togglerSwitch} icon='plus' content='New' />
            </Button.Group>
          </Form.Field>

          <Form.Field>
            <label htmlFor='newImages'>Images</label>
            <ImageList 
              config={{
                view:{listing: true, preview: true},
                update: update ? true : false,
                activeImages: this.concatActiveImages(),
                images: this.concatActiveImages(),
                shiftImage: this.shiftImage
              }}
            />
            <Button.Group>
              <Button type='button' id='imageBrowser' color='teal' compact onClick={this.togglerSwitch} icon='search' content='Browse' />
              <Button type='button' id='imageUploader' color='green' compact onClick={this.togglerSwitch} icon='plus' content='New' />
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
