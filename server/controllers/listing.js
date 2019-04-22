'use strict';

const Listing = require('../models/listing');
const { asyncHandler, notFound } = require('./util/err');

// POST: create new listing
exports.createOneListing = asyncHandler(async (req, res, next) => {
  const newListing = await Listing.create(req.body);
  return res.status(201).json(newListing);
});

// GET: read listing by id
exports.readOneListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing
    .findOne({ _id: req.params.id })
    .populate('address')
    .populate('images');
  return res.json( notFound(listing, next) );
});

// GET: read all listings 
exports.readAllListings = asyncHandler(async (req, res, next) => {
  const listings = await Listing
    .find({})
    .populate('address')
    .populate('images');
  return res.json(listings);
});

// PUT: update listing by id
exports.updateOneListing = asyncHandler(async (req, res, next) => {
  // 'images' is an array; avoid overwriting (if req.body.images exists) by isolating it
  const { address, sold } = req.body;
  const updates = {};

  // check if address and sold (boolean) are undefined
  if (address) updates.address = address;
  if (sold !== undefined) updates.sold = sold;

  // set to an empty array if undefined, so no errors are thrown 
  let { images } = req.body;
  if (!images) images = [];

  // pass props and update
  const updatedListing  = await Listing.findOneAndUpdate(
    {_id: req.params.id}, 
    {$set:updates, $push:{'images': { $each: images }}}, 
    err => { if (err) return next(err) },
    {new: true}
  )
  .populate('address')
  .populate('images');
  return res.json( notFound(updatedListing, next) );
});

// DELETE: delete listing by id
exports.deleteOneListing = asyncHandler(async (req, res, next) => {
  const deletedListing = await Listing.findOneAndDelete({ _id: req.params.id });
  return res.json( notFound(deletedListing, next) );
});
