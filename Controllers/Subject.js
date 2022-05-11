const mongoose = require('mongoose');
const subjectService = require('../Services/Subject');

const get = async (query) => {
  const { sem, branch } = query;

  const subjects = await subjectService.get({ sem, branch }, {}, {});
  return subjects;
};

module.exports = {
  get,
};
