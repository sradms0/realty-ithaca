import React, { Component } from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default class ImageList extends Component {
  state = {
    active: this.props.activeImages
  }

  addActiveItem = image => {
    this.setState(
      prevState => ({
        active: [ ...prevState.active, image ]
      }), () => this.props.activeSync(this.state.active));
  }

  removeInactiveItem = ({ _id }) => {
    const { active } = this.state;
    const idx = active.map(image => image._id).indexOf(_id);

    this.setState(prevState => ({
      active: [ 
        ...prevState.active.slice(0,idx), 
        ...prevState.active.slice(idx+1) 
      ]
    }), () => this.props.activeSync(this.state.active));
  }

  imageItems = () => {
    const { 
      images, 
      upload, 
      preview, 
      listing, 
      activeSync, 
      activeImages, 
      edit 
    } = this.props;
    return (
      images.map(image => (
         <ImageItem 
           image={image} 
           edit={edit}
           upload={upload}
           preview={preview}
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
    const { upload, preview } = this.props;
    // return a list according to view-type
    if (upload || preview) return (<Item.Group divided>{this.imageItems()}</Item.Group>);
    return (<Card.Group itemsPerRow={4}>{this.imageItems()}</Card.Group>);
  }
}
