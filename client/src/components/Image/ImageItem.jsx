import React from 'react'
import { Button, Item } from 'semantic-ui-react'

export default function ImageItem({ src, edit }) {
  return (
    <Item>
      <Item.Image size='tiny' src={src} />
      <Item.Content verticalAlign='middle'>
        <Button 
          compact
          size='mini' 
          icon='minus'
          content='remove' 
          className='remove'
          onClick={() => edit.remove(src)}
        />
      </Item.Content>
    </Item>
  );
} 
