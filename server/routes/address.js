'use strict';

const controller = require('../controllers/address');
const { auth } = require('../middleware/auth');

module.exports = app => {
  app.route('/api/address')
    .get(auth, controller.readAllAddresses)
    .post(auth, controller.createOneAddress);

  app.route('/api/address/:id')
    .get(auth, controller.readOneAddress)
    .put(auth, controller.updateOneAddress)
    .delete(auth, controller.deleteOneAddress);

  app.route('/api/address/status/:status')
    .post(auth, controller.readAddressesByStatus);

  app.route('/api/address/status/:status/search/:query')
    .post(auth, controller.readAddressesBySearch);

  app.route('/api/address/search/:query')
    .post(auth, controller.readAddressesBySearch);
}
