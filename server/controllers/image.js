'use strict';

const cloudinary = require('cloudinary');
const Image  = require('../models/image');
const { asyncHandler, notFound } = require('./util/err');

// POST: handle new image upload
exports.createImages = asyncHandler(async (req, res, next) => {
  // init image props
  const { files } = req;
  const images = files.map(file => ({ url: file.url, id: file.public_id }));
  // save image info to db
  const newImages = await Image.create(images)
  return res.location('/').status(201).json(newImages);
});

// GET: read image by id
exports.readOneImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findOne({ _id: req.params.id });
  return res.json( notFound(image, next) );
});

// GET: read all images
exports.readAllImages = asyncHandler(async (req, res, next) => {
  const images = await Image.find({});
  return res.json(images);
});

// GET: read images by status
exports.readImagesByStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.params;
  const images = await Image.find({ status });
  return res.json(images);
});

// DELETE: delete image by id
exports.deleteOneImage = asyncHandler(async (req, res, next) => {
  // delete image from db and cloudinary (file)
  const deletedImage = await Image.findOneAndDelete({ _id: req.params.id });
  await cloudinary.uploader.destroy(deletedImage.id);
  return res.json( notFound(deletedImage, next) );
});

//FOR TESTING
// DELETE: delete all images by id - for testing purposes
exports.deleteAllImages = asyncHandler(async (req, res, next) => {
  // delete all images from db and cloudinary (files)
  await Image.remove({});
  await cloudinary.api.delete_all_resources();
  return res.end();
});
