const mongoose = require('mongoose');

const connectDb = mongoose.connect(
  process.env.MONGO_URI ||
    'mongodb+srv://gaurbhaiya:gaur@gaur.ewadmvd.mongodb.net/BordertaxGaur',
);

module.exports = connectDb;
