/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const Boom = require('@hapi/boom');


const error = (err) => {
  const customErrorObj = err;
  console.error(err);


  if (customErrorObj.constructor.name === 'MongooseError' || customErrorObj.constructor.name === 'MongoError' || customErrorObj.code > 500) { //  instanceof requires the import Mongoose lib
    customErrorObj.statusCode = 600;
    customErrorObj.message = 'Duplicate data error';
  }

  if (customErrorObj instanceof TypeError
    || customErrorObj instanceof ReferenceError
    || customErrorObj instanceof EvalError
    || customErrorObj instanceof RangeError
    || customErrorObj instanceof SyntaxError
    || customErrorObj instanceof TypeError
    || customErrorObj instanceof URIError) {
    customErrorObj.statusCode = 500;
  }

  let errObj = {};
  switch (customErrorObj.statusCode) {
    case 400:
      errObj = Boom.badRequest(customErrorObj);
      break;
    case 401:
      errObj = Boom.unauthorized(customErrorObj);
      break;
    case 403:
      errObj = Boom.forbidden(customErrorObj);
      break;
    case 404:
      errObj = Boom.notFound(customErrorObj);
      break;
    case 406:
      errObj = Boom.notAcceptable(customErrorObj);
      break;
    case 423:
      errObj = Boom.locked(customErrorObj);
      break;
    case 500:
      errObj = Boom.badImplementation(customErrorObj);
      break;
    default:
      errObj = new Boom.Boom(customErrorObj.message, { statusCode: customErrorObj.statusCode });
      break;
  }
  if (customErrorObj.statusCode === 500 || customErrorObj.statusCode === 600) {
    // sendEmail(emailOptions);
  }
  throw errObj;
};

const JoiFailAction = (request, reply, err) => {
  err.output.payload.message = err.details[0].message;
  delete err.output.payload.validation;
  return err;
};

module.exports = {
  error,
  JoiFailAction,
};
