import React, { Component } from 'react'
import { Button, Card, Image, Item, Modal } from 'semantic-ui-react'

export default class ImageItem extends Component {
  state = {
    active: this.props.config.view.listing && this.activeImage() ? true : false
  }

  // updating based on prospective image from listing 
  // uploader is removed from the previewed list
  static getDerivedStateFromProps(props, state) {
    const { config, image } = props;

    // if this image has been removed from the preview
    // list of listing, then deactivate the image here
    if (config.view.listing && config.lastImageRemoved === image._id) {
      config.resetLastImageRemoved();
      return ({ active: false });
    } else return null;
  }

  onClick = (e, { className }) => {
    const { config, image } = this.props;

    // base click on class of button
    if (config.view.listing) {
      if (className === 'add') {
        // prospective image added to a new listing
        this.setState(
          prevState => ({ active: !prevState.active}), 
          () => {
            if (this.state.active) config.shiftImage(image, 'add');
            else config.shiftImage(image, 'remove');
          }
        );
      } else if (className === 'browser-remove') {
        // delete from db 
        // if it is also active, current prospective image 
        // will be removed 
        config.remove(image);
        if (this.activeImage()) {
          config.shiftImage(image, 'remove');
        }
      } else if (className === 'preview-remove') {
        config.shiftImage(image, 'remove');
      }
      return;
    } 
    // image is viewed elsewhere 
    // (either previewed or in browser, without parent viewer)
    config.remove(image);
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
    const { config, image } = this.props;
    const idx = config.activeImages.map(i => i._id).indexOf(image._id);
    return idx > -1;
  }

  render() {
    const { config, image } = this.props;

    // return the preview of an pre-uploaded image and enable removal
    if (config.view.upload || config.view.preview) {
      return (
        <Item>
          <Item.Image size='tiny' src={image.url} />
          <Item.Content verticalAlign='middle'>
            <Button 
              compact
              size='mini' 
              icon='minus'
              content='remove' 
              className='preview-remove'
              onClick={this.onClick}
            />
          </Item.Content>
        </Item>
      );
    } 

    // return the uploaded view of an image
    // provide maximize and delete buttons
    const buttonCount = config.view.listing ? 'three' : 'two';
    return (
      <Card>
        <Image src={image.url}/>
        <Card.Content extra>
          <div className={`ui ${buttonCount} buttons`}>
            {config.view.listing ? this.listingButton() : null}
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
              className='browser-remove'
              onClick={this.onClick}
            />
          </div>
        </Card.Content>
      </Card>
    );
  } 
} 
