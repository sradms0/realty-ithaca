import React, { Component } from 'react';
import axios from 'axios';

import ListingList from './ListingList';

export default class ListingBrowser extends Component {
  state = {
    listings: [],
    updateToggler: false
  }

  componentDidMount() {
    this.getAllListings();
  }

  getAllListings = async () => {
    try {
      const res = await axios.get('/api/listing');
      this.setState({ listings: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { listings } = this.state;
    return (
      <div>
        <ListingList 
          listings={listings}
          edit={{ remove: this.deleteListing }}
        />
      </div>
    )
  }
}
