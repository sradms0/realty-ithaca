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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update data from server there was an update (put)
    if (prevState.updateToggler  !== this.state.updateToggler) {
      this.getAllListings();
    }
  }

  getAllListings = async () => {
    try {
      const res = await axios.get('/api/listing');
      this.setState({ listings: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  toggleUpdate = () => {
    this.setState(prevState => ({ updateToggler: !prevState.updateToggler }));
  }

  render() {
    const { listings } = this.state;
    return (
      <div>
        <ListingList 
          listings={listings}
          edit={{ 
            updateParentDisplay: this.toggleUpdate, 
            remove: this.deleteListing 
          }}
        />
      </div>
    )
  }
}
