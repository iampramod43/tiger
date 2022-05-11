/* eslint-disable max-len */
const Joi = require('joi');
const branchController = require('../Controllers/Branch');
const responseHandler = require('../Utils/ResponseHandler');
const Success = require('../Lib/SuccessResponse');

// Joi variables
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const objectIdArray = Joi.array().items(objectId).default([]);


module.exports = [
  {
    method: 'GET',
    path: '/v1/branch/get_all',
    options: {
      handler: async () => new Success(await branchController.getAll().catch(responseHandler.error)),
      description: 'Get students',
      tags: ['students', 'get', 'api'],
      validate: {
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
];
