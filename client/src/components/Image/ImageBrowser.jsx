import React, { Component } from 'react';
import axios from 'axios';

import ImageList from './ImageList';

export default class ImageBrowser extends Component {
  state = {
    images: []
  }

  componentDidMount() {
    this.getAllImages();
  }

  getAllImages = async () => {
    try {
      const res = await axios.get('/api/image')
      this.setState(prevState => ({ images: [...prevState.images, ...res.data] }));
    } catch (err) {
      console.log(err);
    }
  }

  deleteImage = async ({ url }) => {
    // get index of selected object with matching url
    const { images } = this.state;
    const idx = images.map(image => image.url).indexOf(url);

    // remove from both db and state
    try {
      const res = await axios.delete(`/api/image/${images[idx]._id}`);
      this.setState(prevState => ({ 
        images: [...prevState.images.slice(0, idx), ...prevState.images.slice(idx+1)] 
      }));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { listing, activeImages, activeSync } = this.props;
    const { images } = this.state;
    return (
      <ImageList 
        images={images} 
        edit={ {remove: this.deleteImage} }
        upload={false}
        listing={ listing ? true : false }
        activeImages={activeImages}
        activeSync={activeSync}
      />
    );
  }
}
