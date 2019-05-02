'use strict';

const controller = require('../controllers/auth');
const { auth } = require('../middleware/auth');

module.exports = app => {
  app.route('/api/auth')
    .get(auth, controller.user)
    .post(controller.login);
}

