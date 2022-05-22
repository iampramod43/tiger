/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const Glue = require('@hapi/glue');

const mongodb = require('./Config/Mongodb'); // mongodb configuration
const responseHandler = require('./Utils/ResponseHandler');
const manifest = require('./Config/Manifest');
const Routes = require('./Routes');

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, {});
    mongodb();
    require('./Models');

    server.realm.modifiers.route.prefix = '/api/tiger';
    server.validator(Joi);
    server.route(Routes);

    server.events.on('response', (request) => {
      const ip = request.headers['x-real-ip'] || request.info.remoteAddress;
      console.log(ip, request.path);
    });
    await server.start();
    return server;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  responseHandler.error(err);
  process.exit(1);
});

startServer()
  .then(server => console.log(`Server listening on ${server.info.uri}`))
  .catch((err) => {
    console.error('Server error ', err);
    process.exit(1);
  });
