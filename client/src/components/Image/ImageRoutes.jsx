import React from 'react';
import { Route } from 'react-router-dom';

import ImageUploader from './ImageUploader';
import ImageBrowser from './ImageBrowser';

export default function ImageRoutes({ match }) {
  return (
    <div>
      <Route path={ `${match.path}/uploader` } component={ImageUploader} />
      <Route path={ `${match.path}/browser` } component={ImageBrowser} />
    </div>
  );
}
