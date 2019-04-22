import React from 'react';
import { List } from 'semantic-ui-react';
import ListingItem from './ListingItem';

export default function ListingList({ edit, listings }) {
  const listingItems = () => (
    listings.map(listing => 
      (<ListingItem listing={listing} edit={edit}/>
    ))
  );
  return ( 
    <List divided verticalAlign='middle'>
      {listingItems()}
    </List>
  );
}

