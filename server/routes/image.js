'use strict';

const controller = require('../controllers/image');
const { parser } = require('../server');
const { auth } = require('../middleware/auth');

module.exports = app => {
  app.route('/api/image')
    .get(auth, controller.readAllImages)
    .post([auth, parser.array('image')], controller.createImages)
    .delete(auth, controller.deleteAllImages);

  app.route('/api/image/:id')
    .get(auth, controller.readOneImage)
    .delete(auth, controller.deleteOneImage);

  app.route('/api/image/status/:status')
    .get(auth, controller.readImagesByStatus);
}
