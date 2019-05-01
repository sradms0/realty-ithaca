'user strict';
const User = require('../models/user');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    User.authenticate(email, password, (err, user) => {
      if (err || !user) return next(err);
      return res.json(user);
    });
  } else {
    const err = new Error('Email and password required');
    err.status = 401;
    return next(err);
  }
};
