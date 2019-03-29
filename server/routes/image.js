'use strict';

const controller = require('../controllers/image');
const { parser } = require('../server');

module.exports = app => {
  app.route('/api/image')
    .get(controller.readAllImages)
    .post(parser.array('image'), controller.createImages)
    .delete(controller.deleteAllImages);

  app.route('/api/image/:id')
    .get(controller.readOneImage)
    .delete(controller.deleteOneImage);
}
