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

  deleteImage = async ({ _id }) => {
    // get index of selected object with matching url
    const { images } = this.state;
    const idx = images.map(image => image._id).indexOf(_id);

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
    const { images } = this.state;
    let { config } = this.props;

    // if browser has no parent, then create config
    // add to new/pre-existing config
    if (!config) config = {view: {image: true}};
    config.remove = this.deleteImage;
    config.images = images;

    return (<ImageList config={config}/>);
  }
}
