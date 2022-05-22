/* eslint-disable max-len */
const Joi = require('joi');
const resultController = require('../Controllers/Result');
const responseHandler = require('../Utils/ResponseHandler');
const Success = require('../Lib/SuccessResponse');

// Joi variables
// const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
// const objectIdArray = Joi.array().items(objectId).default([]);


module.exports = [
  {
    method: 'GET',
    path: '/v1/result',
    options: {
      handler: async (request) => {
        const { query } = request;
        return new Success(await resultController.getResult(query).catch(responseHandler.error));
      },
      description: 'Get Result',
      tags: ['Result', 'get', 'api'],
      validate: {
        query: {
          sem: Joi.number().required(),
          branch: Joi.string().required(),
          shift: Joi.string().required(),
          year: Joi.string().required(),
          month: Joi.string().required(),
          // limit: Joi.number().default(10),
          // skip: Joi.number().default(0),
        },
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
];
