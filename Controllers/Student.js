/* eslint-disable no-underscore-dangle */
const ApplicationError = require('../Lib/ApplicationError');

const studentService = require('../Services/Student');

const signUp = async ({ payload }) => {
  const data = payload;
  const res = await studentService.add(data);
  return res;
};

const getStudents = async (query) => {
  // console.log('query>>>>',query);
  const criteria = query;
  console.log('criteria>>>>', criteria);
  const res = await studentService.get(criteria, {}, {});
  return res;
};

const updateMarks = async (payload) => {
  let iaExist = {};
  let endExist = {};
  if (payload.ia_totals) {
    iaExist = await studentService.getOne({ _id: payload._id, 'ia_totals.subject': { $in: [payload.ia_totals.subject] } });
    if (iaExist) throw new ApplicationError('Marks already entered', 400);
  }
  if (payload.end_totals) {
    endExist = await studentService.getOne({ _id: payload._id, 'end_totals.subject': { $in: [payload.end_totals.subject] } });
    if (endExist) throw new ApplicationError('Marks already entered', 400);
  }
  console.log(endExist);
  const data = {};
  if (payload.ia_totals) data.$push = { ia_totals: payload.ia_totals };
  if (payload.end_totals) data.$push = { end_totals: payload.end_totals };
  await studentService.updateOne({ _id: payload._id }, data);
  return null;
};


module.exports = {
  signUp,
  getStudents,
  updateMarks,
};
