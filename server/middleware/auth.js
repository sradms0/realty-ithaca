'use strict';

const jwt       = require('jsonwebtoken');
const dotenv    = require('dotenv').config({ path: '../' });

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check for a token
  if (!token) {
    const err = new Error('Access denied');
    err.status = 401;
    return next(err);
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    // add user from payload
    req.user = decoded;
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }
}
