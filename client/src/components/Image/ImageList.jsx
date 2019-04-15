import React, { Component } from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default class ImageList extends Component {
  state = {
    active: this.props.activeImages,
    toggle: false
  }

  toggleRefresh = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  }

  addActiveImage = image => {
    this.setState(
      prevState => ({
        active: [ ...prevState.active, image ]
      }), () => this.props.activeSync(this.state.active));
  }

  removeInactiveImage = ({ _id }) => {
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
      lastImageRemoved,
      resetLastImageRemoved,
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
           addActiveImage={this.addActiveImage}
           removeInactiveImage={this.removeInactiveImage}
           activeSync={activeSync}
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
