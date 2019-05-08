import React from 'react';
import { Route } from 'react-router-dom';
 
import AddressUploader from './AddressUploader';
import AddressBrowser from './AddressBrowser';
import FeatureMenu from '../header/FeatureMenu';
 

export default function AddressRoutes({ match }) {
  return (
    <div>
      <Route render={() => (<FeatureMenu config={{ root: match.path, content: ['Browser', 'Uploader'] }} />)} />
      <Route path={ `${match.path}/uploader` } component={AddressUploader}/>
      <Route path={ `${match.path}/browser` } component={AddressBrowser}/>
    </div>
  );
}
