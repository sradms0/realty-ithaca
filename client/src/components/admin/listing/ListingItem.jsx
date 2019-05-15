import React, { Component } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';

import ListingUploader from './ListingUploader';

export default class ListingItem extends Component {
  state = {
    editToggled: false,
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editToggled: !prevState.editToggled }));
  }

  onClick = (e, { className }) => {
    const { config, listing } = this.props;
    if (className === 'edit') this.toggleEdit();
    else if (className === 'remove') config.remove(listing);
  } 

  listingUpdate = () => {
    const { config, listing } = this.props;
    config.view = {listing: true, update: true}
    return (
      <ListingUploader 
        config={config}
        listing={listing}
      />
    );
  }

  render() {
    const { config, listing } = this.props;
    const { address, images } = listing;
    const { editToggled } = this.state;
    return (
      <List.Item>
        <List.Content floated='right'>
            <Button.Group>
              <Button className='edit' onClick={this.onClick} color='teal' icon='pencil'/>
              <Button className='remove' onClick={this.onClick} basic color='red' icon='delete'/>
            </Button.Group>
        </List.Content>
          <List.Content>
            {editToggled 
              ? (
                  <span>
                    <Header as='h4' color='teal' block>
                      {address.string}
                      <div>{`images: ${images.length}`}</div>
                    </Header>
                    <Container>
                      {this.listingUpdate()}
                    </Container>
                  </span>
                ) : (
                  <span>
                    <List.Header>{address.string}</List.Header>
                    <List.Content>{`images: ${images.length}`}</List.Content>
                  </span>
                )
            }
          </List.Content>
      </List.Item>
    )
  }
}
