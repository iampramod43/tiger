/* eslint-disable max-len */

const TeacherUser = require('../Models/TeacherUser');

const add = async (objToSave, options) => new TeacherUser(objToSave).save(options);

const get = async (criteria, projection, options, populate = '') => TeacherUser.find(criteria, projection, options).populate(populate);

const getOne = async (criteria, projection, options, populate = '') => TeacherUser.findOne(criteria, projection, options).populate(populate);

const updateOne = async (criteria, dataToSet, options) => TeacherUser.findOneAndUpdate(criteria, dataToSet, options);

const updateMany = async (criteria, dataToSet, options) => TeacherUser.updateMany(criteria, dataToSet, options);

module.exports = {
  add,
  get,
  getOne,
  updateOne,
  updateMany,
};
