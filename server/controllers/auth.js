'user strict';
const User = require('../models/user');
const { asyncHandler } = require('./util/err');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    User.authenticate(email, password, (err, user) => {
      if (err || !user) return next(err);
      const { token } = user;
      // assign jwt to cookie
      res.cookie('jwt', token, { httpOnly: true, secure: true });
      return res.json({ email });
    });
  } else {
    const err = new Error('Email and password required');
    err.status = 401;
    return next(err);
  }
};

exports.user = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findOne({ _id: req.user._id })
    .select('-password');
  console.log(user);
  return res.json(user);
})
