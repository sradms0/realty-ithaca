import React, { Component } from 'react'
import { Button, Card, Image, Item, Modal } from 'semantic-ui-react'

export default class ImageItem extends Component {
  state = {
    active: (this.props.listing && this.activeImage()) ? true : false
  }

  // updating based on prospective image from listing 
  // uploader is removed from the previewed list
  static getDerivedStateFromProps(props, state) {
    const { 
      image,
      listing,
      lastImageRemoved, 
      resetLastImageRemoved,
      removeInactiveImage
    } = props;

    // if this image has been removed from the preview
    // list of listing, then deactivate the image here
    if (listing && lastImageRemoved === image._id) {
      resetLastImageRemoved();
      return ({ active: false });
    } else return null;
  }

  onClick = (e, { className }) => {
    const { 
      image, 
      edit,
      upload,
      listing, 
      addActiveImage,
      removeInactiveImage
    } = this.props;

    // base click on class of button
    if (listing) {
      if (className === 'add') {
        // prospective image added to a new listing
        this.setState(
          prevState => ({ active: !prevState.active}), 
          () => {
            if (this.state.active) {
              image.isNew = true;
              addActiveImage(image);
            }
            else {
              image.isNew = false;
              removeInactiveImage(image);
            }
          }
        );
      } else if (className === 'remove') {
        
        // delete from db 
        // if it is also active, current prospective image 
        // will be removed 
        edit.remove(image);
        if (this.activeImage()) {
          removeInactiveImage(image);
        }
      }
      // image is viewed elsewhere and is being deleted from db
    } else if (className === 'remove') 
        edit.remove(image);
  }

  listingButton = () => {
    const { active } = this.state;
    return (
      <Button 
        className='add'
        toggle 
        active={active} 
        onClick={this.onClick}
        icon={active ? 'minus' : 'plus'}
      />
    )
  };

  activeImage() {
    const { image, activeImages, update } = this.props;
    const idx = activeImages.map(i => i._id).indexOf(image._id);
    return idx > -1;
  }

  render() {
    const { image, upload, preview, listing, edit, update } = this.props;
    image.isCurrent = update && !image.isNew ? true : false;
    image.isNew = !image.isCurrent;

    // return the preview of an pre-uploaded image and enable removal
    if (upload || preview) {
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
              onClick={this.onClick}
            />
          </div>
        </Card.Content>
      </Card>
    );
  } 
} 
