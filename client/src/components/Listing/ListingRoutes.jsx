import React from 'react';
import { Route } from 'react-router-dom';

import ListingUploader from './ListingUploader';
import ListingBrowser from './ListingBrowser';
import FeatureMenu from '../Header/FeatureMenu';
 
export default function ListingRoutes({ match }) {
  return (
    <div>
      <Route render={() => (<FeatureMenu config={{ root: match.path, content: ['Browser', 'Uploader'] }} />)} />
      <Route path={ `${match.path}/uploader` } component={ListingUploader}/>
      <Route path={ `${match.path}/browser` } component={ListingBrowser}/>
    </div>
  );
}
