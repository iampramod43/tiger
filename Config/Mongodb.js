/* eslint-disable no-console */
const mongoose = require('mongoose');
const Bluebird = require('bluebird');

const MongoDBUrl = process.env.MONGO_URI || 'mongodb+srv://tiger:pr%40mod0514@cluster0.sqemz.mongodb.net/Cluster0?retryWrites=true&w=majority';

module.exports = () => {
  const mongooseOptions = {
    promiseLibrary: Bluebird,
    useNewUrlParser: true,
    config: {
      autoIndex: true,
    },
  };

  mongoose.Promise = mongooseOptions.promiseLibrary;
  mongoose.connect(MongoDBUrl, mongooseOptions).then(() => {
    console.log('info', 'connected to Mongodb');
  }).catch((error) => {
    console.log('info', `error connecting to db: ${error}`);
  });

  const db = mongoose.connection;

  db.on('error', (err) => {
    if (err.message.code === 'ETIMEDOUT') {
      console.log(err);
      mongoose.connect(MongoDBUrl, mongooseOptions);
    }
  });
};
