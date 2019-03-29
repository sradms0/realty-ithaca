'use strict';

const setErrStatus = err => {
  err.status = ({
    'ValidationError': 400,
    'MongoError': 409
  })[err.name];
}

// wrap async calls to aovid tedious try catching,
// and set error status based on the error
exports.asyncHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(err) {
      setErrStatus(err);
      return next(err);
    }
  }
}

// mongoose will return null if not found, not an error
// if doc not found, throw 404, otherwise return it for JSON parsing
exports.notFound = (ref, next) => {
  if (!ref) {
    const err = new Error('not found');
    err.status = 404;
    return next(err);
  }
  return ref;
}

