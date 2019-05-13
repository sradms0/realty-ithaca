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
    const { config } = this.props;
    return (
      config.images.map((image, i) => (
        <ImageItem 
          config={config}
          image={image}
          toggleRefresh={this.toggleRefresh}
          key={image._id ? image._id+i : image.url+i}
        />
      ))
    );
  }

  render() {
    const { config } = this.props;
    // return a list according to view-type
    if (config.view.upload || config.view.preview) return (<Item.Group divided>{this.imageItems()}</Item.Group>);
    else if (config.view.image) return (<Card.Group itemsPerRow={4}>{this.imageItems()}</Card.Group>);
  }
}
