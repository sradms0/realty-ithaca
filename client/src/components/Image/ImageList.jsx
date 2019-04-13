import React, { Component } from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default class ImageList extends Component {
  state = {
    active: []
  }

  // update active list when image 
  // browser is closed out if in listing
  componentWillMount() {
    const { listing, activeImages } = this.props;
    if (listing) this.setState({ active: [...activeImages] });
  }

  addActiveItem = ({ _id }) => {
    this.setState(
      prevState => ({
        active: [ ...prevState.active, _id ]
      }), () => this.props.activeSync(this.state.active));
  }

  removeInactiveItem = ({ _id }) => {
    const { active } = this.state;
    const idx = active.indexOf(_id);

    this.setState(prevState => ({
      active: [ 
        ...prevState.active.slice(0,idx), 
        ...prevState.active.slice(idx+1) 
      ]
    }), () => this.props.activeSync(this.state.active));
  }

  imageItems = () => {
    const { images, upload, listing, activeSync, activeImages, edit } = this.props;
    return (
      images.map(image => (
         <ImageItem 
           image={image} 
           edit={edit}
           upload={upload}
           listing={listing}
           listingAdd={this.addActiveItem}
           listingRemove={this.removeInactiveItem}
           activeSync={activeSync}
           activeImages={activeImages}
           key={image._id}
         />
      ))
    );
  }

  render() {
    const { upload } = this.props;
    // return a list according to view-type
    if (upload) return (<Item.Group divided>{this.imageItems()}</Item.Group>);
    return (<Card.Group itemsPerRow={4}>{this.imageItems()}</Card.Group>);
  }
}
