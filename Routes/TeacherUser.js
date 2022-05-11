/* eslint-disable max-len */
const Joi = require('joi');
const teacherUser = require('../Controllers/TeacherUser');
const responseHandler = require('../Utils/ResponseHandler');
const Success = require('../Lib/SuccessResponse');

// Joi variables
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const objectIdArray = Joi.array().items(objectId).default([]);

module.exports = [
  {
    method: 'POST',
    path: '/v1/teacher_user/signin',
    options: {
      handler: async request => new Success(await teacherUser.signIn(request).catch(responseHandler.error)),
      description: 'teacherUser Sign in',
      tags: ['teacher user', 'signin', 'api'],
      validate: {
        payload: {
          email_id: Joi.string().lowercase().email().required(),
          password: Joi.string().min(8).required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/v1/teacher_user/add',
    options: {
      handler: async request => new Success(await teacherUser.signUp(request).catch(responseHandler.error)),
      description: 'add new teacher user',
      tags: ['teacher user', 'add', 'api'],

      validate: {
        payload: Joi.object().keys({
          user_name: Joi.string().required(),
          email_id: Joi.string().lowercase().email().required(),
          mobile: Joi.string().required(),
          password: Joi.string().optional(),
        }),
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
  {
    method: 'PUT',
    path: '/v1/teacher_user/sign_out',
    options: {
      handler: async (request, h) => {
        const { userData } = h.request.auth.artifacts;
        await teacherUser.signOut(request.query, userData).catch(responseHandler.error);
        return new Success();
      },
      description: 'teacher user sign out',
      tags: ['teacher user', 'sign out', 'api'],

      validate: {
        query: {
          from: Joi.string().required().valid('mobile', 'web', 'all'),
        },
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
];
