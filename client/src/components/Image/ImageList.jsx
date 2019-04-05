import React from 'react'
import { Card, Item, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default function ImageList({ srcs, upload, edit=null }) {
  const imageItems = srcs.map((src, i) => (
    <ImageItem 
      src={src} 
      edit={edit}
      upload={upload}
      key={i}
    />
  ));

  // return a list according to view-type
  if (upload) return (<Item.Group divided>{imageItems}</Item.Group>);
  return (<Card.Group itemsPerRow={4}>{imageItems}</Card.Group>);
}
