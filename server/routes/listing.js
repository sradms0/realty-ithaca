'use strict';

const controller = require('../controllers/listing');
const { auth } = require('../middleware/auth');

module.exports = app => {
  app.route('/api/listing')
    .get(controller.readAllListings)
    .post(auth, controller.createOneListing);

  app.route('/api/listing/:id')
    .get(controller.readOneListing)
    .put(auth, controller.updateOneListing)
    .delete(auth, controller.deleteOneListing);

  app.route('/api/listing/search/:query')
    .get(controller.readListingsBySearch);
}
