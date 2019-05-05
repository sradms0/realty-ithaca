'use strict';

const controller = require('../controllers/user');
const { auth } = require('../middleware/auth');

module.exports = app => {
  app.route('/api/user')
    .post(auth, controller.user)

  app.route('/api/user/login')
    .post(controller.login);

  app.route('/api/user/logout')
    .post(controller.logout);
}

