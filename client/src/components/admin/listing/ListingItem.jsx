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
    const { edit, listing } = this.props;
    if (className === 'edit') this.toggleEdit();
    else if (className === 'remove') edit.remove(listing);
  } 

  render() {
    const { edit, listing } = this.props;
    const { address, images } = listing;
    const { editToggled } = this.state;
    const addressString = `${address.street}, ${address.city} ${address.zip}`;
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
                      {addressString}
                      <div>{`images: ${images.length}`}</div>
                    </Header>
                    <Container>
                      <ListingUploader 
                        update={{ 
                          listing: listing, 
                          updateParentDisplay: edit.updateParentDisplay 
                        }}
                      />
                    </Container>
                  </span>
                ) : (
                  <span>
                    <List.Header>{addressString}</List.Header>
                    <List.Content>{`images: ${images.length}`}</List.Content>
                  </span>
                )
            }
          </List.Content>
      </List.Item>
    )
  }
}
