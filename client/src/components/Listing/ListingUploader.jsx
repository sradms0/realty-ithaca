import React, { Component } from 'react';
import { Button, Container, Form, Header, Message, Icon } from 'semantic-ui-react';
import axios from 'axios';

import AddressBrowser from '../Address/AddressBrowser';
import AddressUploader from '../Address/AddressUploader';
import AddressList from '../Address/AddressList';
import ImageBrowser from '../Image/ImageBrowser';
import ImageUploader from '../Image/ImageUploader';
import ImageList from '../Image/ImageList';

export default class ListingUploader extends Component {
  state = {
    address: null,
    images: [],

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
      images: images
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

  addImage = image => {
    this.setState(prevState => ({
      images: [ 
        ...prevState.images, image 
      ]})
    );
  }

  removeImage = ({ _id }) => {
    const { images } = this.state;
    const idx = images.map(image => image._id).indexOf(_id);

    this.setState(prevState => ({
        images: [ 
          ...prevState.images.slice(0,idx), 
          ...prevState.images.slice(idx+1) 
        ], 
        lastImageRemoved: _id
      })
    );
  }

  removeAddress = () => {
    this.setState(prevState => ({ 
        address: null,  
        lastAddressRemoved: prevState.address._id
      })
    );
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
    const { imageBrowserToggled, address, images } = this.state;
    if (imageBrowserToggled) {
      return (
        <ImageBrowser 
          resetLastImageRemoved={this.resetLastImageRemoved}
          listing={true} 
          activeSync={this.updateActiveImages} 
          activeImages={images}
          addActiveImage={this.addImage}
          removeInactiveImage={this.removeImage}
          lastImageRemoved={this.state.lastImageRemoved}
        />
      );
    }
    if (this.state.addressBrowserToggled) {
      return (
        <AddressBrowser 
          addActiveAddress={this.addAddress}
          removeInactiveAddress={this.removeAddress}
          activeAddress={this.state.address}
          activeSync={this.updateActiveAddress} 
          listing={true}
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
    let _address = null, _images = [];
    if (update) {
      _address = update.address;
      _images = update.images;
    }
    const { address: {street, city, zip} } = this.state;
    this.setState({ 
      address: _address,
      images: _images,

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
    const { address, images } = this.state;
    const { update } = this.props;

    try {
      // update existing listing if this is an update
      // otherwise a new listing is being added
      if (update) {
        const res = await axios.put(`/api/listing/${update.listing._id}`, { address, images });
        // update state/form fields and parent component to show update
        this.updateState(res.data);
        update.updateParentDisplay();
        // update parentDisplay....
      } else {
        await axios.post('/api/listing', { address, images });
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
    const { address, images } = this.state;
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
            <AddressList preview addresses={address ? [address] : []} edit={ {remove: this.removeAddress} }/>
            <Button.Group>
              <Button type='button' id='addressBrowser' color='teal' compact onClick={this.togglerSwitch} icon='search' content='Browse' />
              <Button type='button' id='addressUploader' color='green' compact onClick={this.togglerSwitch} icon='plus' content='New' />
            </Button.Group>
          </Form.Field>

          <Form.Field>
            <label htmlFor='images'>Images</label>
            <ImageList preview images={images} edit={ {remove: this.removeImage} }/>
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
