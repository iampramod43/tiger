const HapiSwagger = require('hapi-swagger');
const os = require('os');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const apiVersion = require('hapi-api-version');
const Pack = require('../package.json');

const swaggerOptions = {
  basePath: '/api/tiger/',
  jsonPath: '/tiger/swagger.json',
  host: os.type() === 'Linux' ? os.hostname() : 'localhost:4500',
  schemes: ['http', 'https'],
  pathPrefixSize: 2,
  documentationPath: '/tiger',
  swaggerUIPath: '/docstiger/',
  info: {
    title: 'tiger API Documentation',
    version: Pack.version,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Autigerization',
      in: 'header',
      'x-keyPrefix': 'Bearer ',
    },
  },
};

const apiVersionOptions = {
  validVersions: [1],
  defaultVersion: 1,
  vendorName: 'tigerApi',
  basePath: '/api/tiger/',
};

const goodOptions = {
  ops: {
    interval: 1000,
  },
  reporters: {
    myConsoleReporter: [{
      module: '@hapi/good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*' }],
    }, {
      module: '@hapi/good-console',
    }, 'stdout'],
  },
};

module.exports = {
  server: {
    host: 'localhost',
    port: process.env.PORT || 4500,
    routes: { cors: true },
  },
  register: {
    plugins: [
      Inert, Vision, Blipp,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
      {
        plugin: Good,
        options: goodOptions,
      },
      {
        plugin: apiVersion,
        options: apiVersionOptions,
      },
    ],
  },
};
