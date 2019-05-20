'use strict';

const Listing = require('../models/listing');
const Address = require('../models/address');
const Image = require('../models/image');
const { asyncHandler, notFound } = require('./util/err');

const setAddressStatus = asyncHandler(async (status, id) => {
  await Address.update({ '_id': id }, { status });
});

const setImageStatus = asyncHandler(async (status, ids) => {
  await Image.update(
    { '_id': {$in: ids} },
    { status: status },
    { multi: true }
  );
});

// POST: create new listing
exports.createOneListing = asyncHandler(async (req, res, next) => {
  const newListing = await Listing.create(req.body);
  // address and image(s) belong to a listing now
  setImageStatus(true, req.body.images);
  setAddressStatus(true, req.body.address);
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

// GET: read listings by searching 
exports.readListingsBySearch = asyncHandler(async (req, res, next) => {
  // the only solution i am able to use..
  const { query } = req.params;
  const re = new RegExp(query, 'i');
  let listings =  await Listing.find().populate('address');
  listings = listings.filter(i => {
    const { address: {street, city, state, zip} } = i;
    if (re.test(street) || 
        re.test(city)   || 
        re.test(state)  || 
        re.test(zip)
    ) return i;
  });
  return res.json(listings);
});

// PUT: update listing by id
exports.updateOneListing = asyncHandler(async (req, res, next) => {
  // 'images' is an array; avoid overwriting (if req.body.images exists) by isolating it
  const { address, sold } = req.body;
  const updates = {};

  // check if address and sold (boolean) are undefined
  if (address) {
    // handle address change: set status of past address and new address 
    const listing = await Listing.findOne({ _id: req.params.id });
    setAddressStatus(false, listing.address);
    setAddressStatus(true, address);
    updates.address = address;
  } 
  if (sold !== undefined) updates.sold = sold;

  // set image children to empty arrays if image is undefined, so no errors are thrown 
  let { images } = req.body;
  let newImages = null;
  let deleteImages = null;

  if (!images) {
    newImages = [];
    deleteImages = [];
  } else {
    newImages = images.newImages;
    deleteImages = images.deleteImages;
    setImageStatus(true, newImages);
    setImageStatus(false, deleteImages);
  }

  // * pass props and update *//
  //   cant push and pull on same path in same operation, 
  //   so separate queries have to be performed...
  await Listing.findOneAndUpdate(
    {_id: req.params.id}, 
    {$set:updates, $push:{'images': { $each: newImages }}}
  )
  const updatedListing = await Listing.findOneAndUpdate(
    {_id: req.params.id}, 
    {$pull:{'images': {$in: deleteImages}}},
    {new: true}
  )
  .populate('address')
  .populate('images');

  return res.json( notFound(updatedListing, next) );
});

// DELETE: delete listing by id
exports.deleteOneListing = asyncHandler(async (req, res, next) => {
  const deletedListing = await Listing.findOneAndDelete({ _id: req.params.id });
  // images no longer belong to a listing
  setAddressStatus(false, deletedListing.address);
  setImageStatus(false, deletedListing.images);
  return res.json( notFound(deletedListing, next) );
});
