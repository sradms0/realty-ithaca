'use strict';

const controller = require('../controllers/address');

module.exports = app => {
  app.route('/api/address')
    .get(controller.readAllAddresses)
    .post(controller.createOneAddress);

  app.route('/api/address/:id')
    .get(controller.readOneAddress)
    .put(controller.updateOneAddress)
    .delete(controller.deleteOneAddress);
}
