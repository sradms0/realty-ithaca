import React from 'react'
import { Button, Divider, Image } from 'semantic-ui-react'

export default function ImageItem({ src, size, div=null, edit=null }) {
  return (
    <span>
      <Image src={src} size={size}/>
      {edit 
        ? (
          <Button 
            compact
            size='mini' 
            icon='minus'
            content='remove' 
            className='remove'
            onClick={() => edit.remove(src)}
          />
        ) 
        : null
      }
      {div ? (<Divider />) : null}
    </span>
  );
} 
