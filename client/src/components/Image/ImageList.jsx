import React, { Component } from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default class ImageList extends Component {
  state = {
    active: []
  }

  addActiveItem = image => {
    console.log(image);
  }

  imageItems = () => {
    const { images, upload, listing, edit } = this.props;
    console.log(images);
    return (
      images.map((image, i) => (
         <ImageItem 
           image={image} 
           edit={edit}
           upload={upload}
           listing={listing}
           add={this.addActiveItem}
           key={i}
         />
      ))
    )
  }

  render() {
    const { upload } = this.props;
    // return a list according to view-type
    if (upload) return (<Item.Group divided>{this.imageItems()}</Item.Group>);
    return (<Card.Group itemsPerRow={4}>{this.imageItems()}</Card.Group>);
  }
}
