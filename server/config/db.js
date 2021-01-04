const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    // mongoose.set('useFindAndModify', false);

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('connected to MongoDB');
  } catch (err) {
    console.error(err.message);

    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

// const config = require('config');
// const db = config.get('./default.json/mongoURI');
