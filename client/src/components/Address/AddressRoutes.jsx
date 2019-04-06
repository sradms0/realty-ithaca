import React from 'react';
import { Route } from 'react-router-dom';
 
import AddressUploader from './AddressUploader';

export default function AddressRoutes({ match }) {
  return (
    <div>
      <Route path={ `${match.path}/uploader` } component={AddressUploader}/>
    </div>
  );
}
