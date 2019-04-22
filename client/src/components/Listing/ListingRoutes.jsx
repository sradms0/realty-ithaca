import React from 'react';
import { Route } from 'react-router-dom';

import ListingUploader from './ListingUploader';
import ListingBrowser from './ListingBrowser';
 
export default function ListingRoutes({ match }) {
  return (
    <div>
      <Route path={ `${match.path}/uploader` } component={ListingUploader}/>
      <Route path={ `${match.path}/browser` } component={ListingBrowser}/>
    </div>
  );
}
