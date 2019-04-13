import React, { Component } from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default class ImageList extends Component {
  state = {
    active: []
  }

  addActiveItem = ({ _id }) => {
    this.setState(prevState => ({
      active: [ ...prevState.active, _id ]
    }));
  }

  removeInactiveItem = ({ _id }) => {
    const { active } = this.state;
    const idx = active.indexOf(_id);

    this.setState(prevState => ({
      active: [ 
        ...prevState.active.slice(0,idx), 
        ...prevState.active.slice(idx+1) 
      ]
    }));
  }

  imageItems = () => {
    const { images, upload, listing, edit } = this.props;
    return (
      images.map((image, i) => (
         <ImageItem 
           image={image} 
           edit={edit}
           upload={upload}
           listing={listing}
           listingAdd={this.addActiveItem}
           listingRemove={this.removeInactiveItem}
           key={i}
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
