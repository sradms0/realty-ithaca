import React from 'react'
import { Divider, Image } from 'semantic-ui-react'
import ImageItem from './ImageItem';

export default function ImageList({ srcs, size, div=null, edit=null }) {
  const imageItems = srcs.map((src, i) => (
    <ImageItem 
      src={src} 
      size={size} 
      div={div}
      edit={edit}

      key={i}
    />
  ));
  return (<div>{imageItems}</div>);
}
