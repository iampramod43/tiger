/* eslint-disable no-underscore-dangle */
const studentService = require('../Services/Student');

const signUp = async ({ payload }) => {
  const data = payload;
  const res = await studentService.add(data);
  return res;
};

const getStudents = async ({ sem, branch }) => {
  // console.log('query>>>>',query);
  const criteria = {
    sem,
    branch,
  };
  console.log('criteria>>>>', criteria);
  const res = await studentService.get(criteria, {}, {});
  return res;
};

const updateMarks = async (payload) => {
  console.log("payload", payload);
  const data = {
    ia_totals: payload.ia_totals,
    end_totals: payload.end_totals,
  };
  const res = await studentService.updateOne({ _id: payload._id }, data);
  return null;
};


module.exports = {
  signUp,
  getStudents,
  updateMarks,
};
