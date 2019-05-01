'use strict';

const controller = require('../controllers/auth');

module.exports = app => {
  app.route('/api/auth')
    .post(controller.login);
}

