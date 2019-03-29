# Realty Ithaca
Realty Ithaca is built for real estate advertising within the Finger Lakes region of New York State.<br>
Currently, this application only has its API for use.

## Built With
* [Mongoose](https://mongoosejs.com)
* [Express](https://expressjs.com)

## Prerequisites
Be sure to have the following installed on your machine
* [Node.js](https://nodejs.org)
* [npm](https://www.npmjs.com)
* [MongoDB](https://www.mongodb.com)

For testing this API, a REST client can be used with the provided `/server/realty-ithaca_requests.json` file (this will need editing: ids, etc.)
* [Jnsomnia](https://insomnia.rest)

### Installation
1. Create a free [Cloudinary](https://cloudinary.com) account and get an API key to store images
2. Clone this repo
```sh
git clone git@github.com:sradms0/realty-ithaca.git
```

3. Install npm packages
```sh
npm install
```

4. Create a .env file in the `/server` directory, and fill in empty variables:
```sh
# /server/.env

CLOUD_NAME="ENTER YOUR CLOUD NAME"
API_KEY="ENTER YOUR API KEY"
API_SECRET="ENTER YOUR API SECRET"

DB="mongodb://localhost:27017/realty-ithaca"
```

## Run
Start the server from root:
```
npm start
```
