import React from 'react';
import { List } from 'semantic-ui-react';
import ListingItem from './ListingItem';

export default function ListingList({ config }) {
  const listingItems = () => (
    config.listings.map(listing => 
      (<ListingItem key={listing._id} listing={listing} config={config}/>
    ))
  );
  return ( 
    <List divided verticalAlign='middle'>
      {listingItems()}
    </List>
  );
}

