'use strict';

const controller = require('../controllers/listing');

module.exports = app => {
  app.route('/api/listing')
    .get(controller.readAllListings)
    .post(controller.createOneListing);

  app.route('/api/listing/:id')
    .get(controller.readOneListing)
    .put(controller.updateOneListing)
    .delete(controller.deleteOneListing);
}
