/* eslint-disable max-len */
const Joi = require('joi');
const subjectController = require('../Controllers/Subject');
const responseHandler = require('../Utils/ResponseHandler');
const Success = require('../Lib/SuccessResponse');

// Joi variables
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const objectIdArray = Joi.array().items(objectId).default([]);


module.exports = [
  {
    method: 'GET',
    path: '/v1/subjects',
    options: {
      handler: async (request) => {
        const { query } = request;
        return new Success(await subjectController.get(query).catch(responseHandler.error));
      },
      description: 'Get Subjects',
      tags: ['Subjects', 'get', 'api'],
      validate: {
        query: {
          sem: Joi.number().required(),
          branch: objectId.required(),
        },
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
];
