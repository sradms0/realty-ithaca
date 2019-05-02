'use strict';

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const dotenv    = require('dotenv').config({ path: '../' });

const { Schema } = mongoose;

// create user schema
const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  email: {
    type:     String,
    trim:     true,
    unique:   [true, 'This email already exists'],
    required: [true, 'An email address is required'],
    validate: {
      validator:  email => /\S+@\S+\.\S+/.test(email),
      message:    props => `${props.value} invalid email.`
    }
  },

  password: {
    type:     String,
    required: [true, 'A password is required']
  },
});

// authenticate input against db document
UserSchema.statics.authenticate = async function(email, password, callback) {
  const invalidCredentials = () => {
    const error = new Error('Invalid user or password');
    error.status = 401;
    return error;
  };

  try {
    // check if a user was found
    const user = await this.findOne({ email: email });
    if (!user) return callback( invalidCredentials() );

    // check if the user entered a valid password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return callback( invalidCredentials() );

    // credentials are correct, assign a token and return with user
    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET,
      { expiresIn: 3600 }
    )
    return callback(null, { email: user.email, token });

  } catch (err) {
    return callback(err);
  }
}

// hash password before saving to db
UserSchema.pre('save', function(next) {
  const user = this;
  // only if password is created/modified
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

// create export and user model
module.exports = mongoose.model('user', UserSchema);
