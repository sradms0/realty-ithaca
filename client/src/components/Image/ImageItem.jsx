import React from 'react'
import { Button, Card, Image, Item } from 'semantic-ui-react'

export default function ImageItem({ src, upload, edit=null }) {
  // return the preview of an pre-uploaded image and enable removal
  if (upload) {
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

  // return the uploaded view of an image
  // provide maximize and delete buttons
  return (
    <Card>
      <Image src={src}/>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button 
            compact
            icon='window maximize'
            color='teal'
            basic
            className='view'
            onClick={() => console.log(src)}
          />
          <Button 
            compact
            icon='delete'
            color='red'
            basic
            className='remove'
            onClick={() => edit.remove(src)}
          />
        </div>
      </Card.Content>
    </Card>
  );
} 
