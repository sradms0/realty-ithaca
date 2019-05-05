'use strict';

const controller = require('../controllers/user');
const { auth } = require('../middleware/auth');

module.exports = app => {
  app.route('/api/auth')
    .get(auth, controller.user)
    .post(controller.login);
}

