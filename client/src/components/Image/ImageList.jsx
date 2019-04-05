import React from 'react'
import { Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default function ImageList({ srcs, size, edit=null }) {
  const imageItems = srcs.map((src, i) => (
    <ImageItem 
      src={src} 
      size={size} 
      edit={edit}

      key={i}
    />
  ));
  return (<Item.Group divided>{imageItems}</Item.Group>);
}
