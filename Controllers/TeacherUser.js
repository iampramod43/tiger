/* eslint-disable max-len */
const ApplicationError = require('../Lib/ApplicationError');
const Success = require('../Lib/SuccessResponse');
const teacherUserService = require('../Services/TeacherUser');

const signUp = async ({ payload }) => {
  // log request
  const data = {
    name: payload.user_name,
    email_id: payload.email_id,
    mobile: payload.mobile,
    password: payload.password,
  };
    // check if user already exists in db and throw ApplicationError
  const user = await teacherUserService.getOne({ email_id: data.email_id });
  if (user) {
    throw new ApplicationError('User already exists', 409);
  }
  const result = await teacherUserService.add(data);
  if (!result) throw new ApplicationError('User not added', 400);
  return new Success();
};

const signIn = async ({ payload }) => {
  const data = {
    email_id: payload.email_id,
    password: payload.password,
  };
  console.log(data);
  const user = await teacherUserService.getOne({ email_id: data.email_id, password: data.password });
  if (!user) {
    throw new ApplicationError('User not found', 404);
  }
  if (user.password !== data.password) {
    throw new ApplicationError('Invalid password', 401);
  }
  console.log(user);
  return new Success(user);
};

module.exports = {
  signUp,
  signIn,
};
