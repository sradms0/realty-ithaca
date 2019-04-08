import React from 'react';
import { Route } from 'react-router-dom';
 
import AddressUploader from './AddressUploader';
import AddressBrowser from './AddressBrowser';

export default function AddressRoutes({ match }) {
  return (
    <div>
      <Route path={ `${match.path}/uploader` } component={AddressUploader}/>
      <Route path={ `${match.path}/browser` } component={AddressBrowser}/>
    </div>
  );
}