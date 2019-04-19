import React, { Component } from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default class ImageList extends Component {
  state = {
    toggle: false
  }

  toggleRefresh = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  }

  imageItems = () => {
    const { 
      images, 
      upload, 
      preview, 
      listing, 
      activeImages, 
      lastImageRemoved,
      resetLastImageRemoved,
      addActiveImage,
      removeInactiveImage,
      edit 
    } = this.props;
    return (
      images.map(image => (
         <ImageItem 
           image={image} 
           edit={edit}
           upload={upload}
           preview={preview}
           resetLastImageRemoved={resetLastImageRemoved}
           lastImageRemoved={lastImageRemoved}
           listing={listing}
           addActiveImage={addActiveImage}
           removeInactiveImage={removeInactiveImage}
           activeImages={activeImages}
           toggleRefresh={this.toggleRefresh}
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
