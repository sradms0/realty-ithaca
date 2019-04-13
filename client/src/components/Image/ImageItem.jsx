import React, { Component } from 'react'
import { Button, Card, Image, Item, Modal } from 'semantic-ui-react'

export default class ImageItem extends Component {
  state = {
    active: false
  }

  componentWillMount() {
    const { listing } = this.props;
    if (listing && this.activeImage()) {
      this.setState({ active: true });
    }
  }

  onClick = e => {
    const { image, listingAdd, listingRemove, activeSync } = this.props;;
    console.log('activeSync:', activeSync);
    this.setState(
      prevState => ({ active: !prevState.active}), 
      () => {
        if (this.state.active) listingAdd(image);
        else listingRemove(image);
      }
    );
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

  activeImage() {
    const { image, activeImages } = this.props;
    return activeImages.indexOf(image._id) > -1;
  }

  render() {
    const { image, upload, listing, edit } = this.props;
    // return the preview of an pre-uploaded image and enable removal
    if (upload) {
      return (
        <Item>
          <Item.Image size='tiny' src={image.url} />
          <Item.Content verticalAlign='middle'>
            <Button 
              compact
              size='mini' 
              icon='minus'
              content='remove' 
              className='remove'
              onClick={() => edit.remove(image)}
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
        <Image src={image.url}/>
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
                <Image size='large' src={image.url} centered />
              </Modal.Content>
            </Modal>
            <Button 
              compact
              icon='delete'
              color='red'
              basic
              className='remove'
              onClick={() => edit.remove(image)}
            />
          </div>
        </Card.Content>
      </Card>
    );
  } 
} 
