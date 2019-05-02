'use strict';

// load modules
const express           = require('express');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const morgan            = require('morgan');
const mongoose          = require('mongoose');
const cloudinary        = require('cloudinary');
const multer            = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
//const session           = require('express-session');
const path              = require('path');
const dotenv            = require('dotenv');

// load local environment variables
dotenv.config();

// create app and set up port
const app = express();
const port = process.env.PORT || 5000;

// serve static files from react app
app.use(express.static(path.join(__dirname, '../client/build')));

// replace deprecated mongoose promise with nodes
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// connect to db
mongoose.connect(process.env.MONGODB_URI || process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('connected to realty-ithaca database'))
  .catch(err => console.log(err));


// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// cloudinaryStorage, multer configuration
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});
exports.parser = multer({ storage: storage });

// deal with possible CORS issues if accessed from different domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());

// log and parse request body to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


//test route
app.get('/api', (req, res) => res.json({ message: `${new Date()}: ping successful` }));
app.get('/', (req, res) => res.redirect('/api'));

const authRoutes    = require('./routes/auth')    (app);
const imageRoutes   = require('./routes/image')   (app);
const addressRoutes = require('./routes/address') (app);
const listingRoutes = require('./routes/listing') (app);

// check if running in production
if (process.env.NODE_ENV === 'production') {
  // send react's index.html file if no request matches
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

// send 404 if no route is matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Does Not Exist'
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
  next();
});

// start server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

