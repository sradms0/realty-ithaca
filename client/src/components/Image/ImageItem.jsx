import React, { Component } from 'react'
import { Button, Card, Image, Item, Modal } from 'semantic-ui-react'

export default class ImageItem extends Component {
  state = {
    active: false
  }

  onClick = e => {
    const { src } = this.props;
    this.props.add(src);
    this.setState(prevState => ({
      active: !prevState.active
    }));
  }

  listingButton = () => {
    const { active } = this.state;
    return (
      <Button 
        toggle 
        active={active} 
        onClick={this.onClick}
        icon={active ? 'minus' : 'plus'}
      />
    )
  };


  render() {
    const { src, upload, listing, edit } = this.props;
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
    const buttonCount = listing ? 'three' : 'two';
    return (
      <Card>
        <Image src={src}/>
        <Card.Content extra>
          <div className={`ui ${buttonCount} buttons`}>
            {listing ? this.listingButton() : null}
            {/* show large view of image */}
            <Modal 
              trigger={
                <Button 
                  compact
                  icon='window maximize'
                  color='teal'
                  basic
                  className='view'
                />
              } 
            >
              <Modal.Content image>
                <Image size='large' src={src} centered />
              </Modal.Content>
            </Modal>
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
} 
