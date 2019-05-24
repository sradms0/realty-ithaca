'use strict';

const Address  = require('../models/address');
const { asyncHandler, notFound } = require('./util/err');

const config = req => {
  console.log(req.body);
  const { 
    params: {query, status}, 
    body: {activeAddress} 
  } = req;

  const re = new RegExp(query, 'i');
  const regs = [
    {street: re},
    {city: re},
    {state: re},
    {zip: re}
  ];

  const $or = [...regs];
  const statusExists = () => status !== undefined;
  let config = {};

  if (query) {
    // update listing: search addrs, and still allow active addr search
    if (activeAddress && statusExists()) {
      config.$or = [
        {$and: [ {status}, {$or} ]},
        {$and: [ {_id: activeAddress}, {$or} ]}
      ];
    } 

    // new listings: search only available addrs
    else if (statusExists()) config.$and = [ {status}, {$or} ];

    // searching all (w/o listing parent)
    else config.$or = $or;

    // update listing: show all avail addrs, but show active addr
  } else if (activeAddress && statusExists()) config.$or = [ {status}, {_id: activeAddress} ]

  // new listing: showing all available addrs
  else if (statusExists()) config.status = status;
  console.log(config);
  return config;
}

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
  const addresses = await Address.find( config(req) )
  return res.json(addresses);
});

// GET: read addresses by status
exports.readAddressesByStatus = asyncHandler(async (req, res, next) => {
  const addresses = await Address.find( config(req) );
  return res.json(addresses);
});

// GET: read addresses by searching street/city/state/zip
exports.readAddressesBySearch = asyncHandler(async (req, res, next) => {
  const addresses =  await Address.find( config(req) );
  return res.json( notFound(addresses, next) );
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

