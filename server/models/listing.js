'use strict';

const mongoose = require('mongoose');
const { Schema } =  mongoose;

//create listing schema
const ListingSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  address: {
    type: Schema.Types.ObjectId,
    ref: 'address',
    required: true,
    unique: true
  },

  sold: {
    type: Boolean,
    default: false,
    required: true
  },

  images: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'image'
    }]
  }
});

// export listing model
module.exports = mongoose.model('listing', ListingSchema);
