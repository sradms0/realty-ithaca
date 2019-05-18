'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create addresss chema
const AddressSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  street: {
    type: String,
    required: [true, 'street required']
  },

  city: {
    type: String,
    required: [true, 'city required']
  },

  state: {
    type: String,
    default: 'ny',
    required: [true, 'state required']
  },

  zip: {
    type: Number,
    validate: {
      validator: z => /\b(\d{5})\b/.test(z),
      message: '5 digits required'
    },
    required: [true, 'zip required']
  },

  status: {
    type: Boolean,
    default: false
  }
});

// don't allow repeats
AddressSchema.index(
  {street: 1, city: 1, state: 1, zip: 1}, 
  {unique: true}
);

// define an address string
AddressSchema.virtual('string').get(function() {
  return `${this.street}, ${this.city} ${this.zip}`;
});

// allow for virtual to be returned in json
AddressSchema.set('toJSON', { virtuals: true })


// export address model
module.exports = mongoose.model('address', AddressSchema)
