/* eslint-disable max-len */
const Joi = require('joi');
const student = require('../Controllers/Student');
const responseHandler = require('../Utils/ResponseHandler');
const Success = require('../Lib/SuccessResponse');

// Joi variables
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
// const objectIdArray = Joi.array().items(objectId).default([]);


module.exports = [
  {
    method: 'GET',
    path: '/v1/students',
    options: {
      handler: async (request) => {
        const { query } = request;
        return new Success(await student.getStudents(query).catch(responseHandler.error));
      },
      description: 'Get students',
      tags: ['students', 'get', 'api'],
      validate: {
        query: {
          sem: Joi.number().required(),
          branch: Joi.string().required(),
          shift: Joi.string().required(),
          year: Joi.string().required(),
        },
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
  {
    method: 'GET',
    path: '/v1/student',
    options: {
      handler: async (request) => {
        const { query } = request;
        return new Success(await student.getStudent(query).catch(responseHandler.error));
      },
      description: 'Get student',
      tags: ['student', 'get', 'api'],
      validate: {
        query: {
          reg_no: Joi.string().required(),
          year: Joi.string().required(),
        },
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
  {
    method: 'POST',
    path: '/v1/student/register',
    options: {
      handler: async request => new Success(await student.signUp(request).catch(responseHandler.error)),
      description: 'add new student user',
      tags: ['student', 'add', 'api'],

      validate: {
        payload: Joi.object().keys({
          name: Joi.string().required(),
          mobile: Joi.string().required(),
          email_id: Joi.string().required(),
          father_name: Joi.string().required(),
          mother_name: Joi.string().required(),
          address: Joi.string().required(),
          sem: Joi.number().required(),
          branch: Joi.string().required(),
          year: Joi.number().required(),
          dob: Joi.date().required(),
          reg_no: Joi.string().required(),
          month: Joi.string().required(),
        }),
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
  {
    method: 'POST',
    path: '/v1/student/update_marks',
    options: {
      handler: async (request) => {
        const { payload } = request;
        await student.updateMarks(payload).catch(responseHandler.error);
        return new Success();
      },
      description: 'update marks of student',
      tags: ['student', 'update marks', 'api'],
      validate: {
        payload: Joi.object().keys({
          _id: objectId.required(),
          reg_no: Joi.string().required(),
          ia_totals: Joi.object().keys({
            subject: objectId.required(),
            marks: Joi.string().required(),
          }),
          end_totals: Joi.object().keys({
            subject: objectId.required(),
            marks: Joi.string().required(),
          }),
        }),
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
  {
    method: 'POST',
    path: '/v1/student/update_student',
    options: {
      handler: async (request) => {
        const { payload } = request;
        await student.updateStudent(payload).catch(responseHandler.error);
        return new Success();
      },
      description: 'update marks of student',
      tags: ['student', 'update marks', 'api'],
      validate: {
        payload: {
          _id: objectId.required(),
          iaMarks: Joi.array().items(Joi.object().keys({
            subject: objectId.required(),
            marks: Joi.string().required(),
          })),
          endMarks: Joi.array().items(Joi.object().keys({
            subject: objectId.required(),
            marks: Joi.string().required(),
          })),
        },
        failAction: responseHandler.JoiFailAction,
      },
    },
  },
];
