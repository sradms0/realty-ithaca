'use strict';

const Address  = require('../models/address');
const { asyncHandler, notFound } = require('./util/err');

// create a new address
exports.createOneAddress = asyncHandler(async (req, res, next) => {
  // save address from body to db
  const newAddress = await Address.create(req.body);
  return res.location('/').status(201).json(newAddress);
});

// GET: read address by id
exports.readOneAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOne({ _id: req.params.id });
  return res.json( notFound(address, next) );
});

// GET: read all addresses
exports.readAllAddresses = asyncHandler(async (req, res, next) => {
  const addresses = await Address.find({})
  return res.json(addresses);
});

// PUT: update address by id
exports.updateOneAddress = asyncHandler(async (req, res, next) => {
  const updatedAddress = await Address.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
  return res.json( notFound(updatedAddress, next) );
});

// DELETE: delete address by id
exports.deleteOneAddress = asyncHandler(async (req, res, next) => {
  const deletedAddress = await Address.findOneAndDelete({_id: req.params.id})
  return res.json( notFound(deletedAddress, next) );
});

