'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

//create image schema
const ImageSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  id: {
    type: String,
    required: true
  },

  url: {
    type: String,
    require: true
  },

  status: {
    type: Boolean,
    default: false
  }
});

// export image model
module.exports = mongoose.model('image', ImageSchema);
