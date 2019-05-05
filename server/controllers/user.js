'user strict';
const User              = require('../models/user');
const jwt               = require('jsonwebtoken');
const dotenv            = require('dotenv').config({ path: '../' });
const { asyncHandler }  = require('./util/err');


exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    User.authenticate(email, password, (err, user) => {
      if (err || !user) return next(err);

      // credentials are correct, assign a token and return with user
      const { _id, email } = user;
      const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET,
        { expiresIn: 3600 }
      )
      // assign jwt to cookie, and return email
      res.cookie('jwt', token, { httpOnly: true });
      return res.json({ email });
    });
  } else {
    const err = new Error('Email and password required');
    err.status = 401;
    return next(err);
  }
};

exports.user = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id })
    .select('-password');
  return res.json(user);
});
