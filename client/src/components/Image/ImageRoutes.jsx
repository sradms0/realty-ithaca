import React from 'react';
import { Route } from 'react-router-dom';

import ImageUploader from './ImageUploader';
import ImageBrowser from './ImageBrowser';
import FeatureMenu from '../Header/FeatureMenu';

export default function ImageRoutes({ match }) {
  return (
    <div>
      <Route render={() => (<FeatureMenu config={{ root: match.path, content: ['Browser', 'Uploader'] }} />)} />
      <Route path={ `${match.path}/uploader` } component={ImageUploader} />
      <Route path={ `${match.path}/browser` } component={ImageBrowser} />
    </div>
  );
}
