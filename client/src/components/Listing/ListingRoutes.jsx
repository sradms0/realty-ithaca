import React from 'react';
import { Route } from 'react-router-dom';

import ListingUploader from './ListingUploader';
 
export default function ListingRoutes({ match }) {
  return (
    <div>
      <Route path={ `${match.path}/uploader` } component={ListingUploader}/>
    </div>
  );
}
