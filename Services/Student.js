/* eslint-disable max-len */

const Student = require('../Models/Student');

const add = async (objToSave, options) => new Student(objToSave).save(options);

const get = async (criteria, projection, options, populate = '') => Student.find(criteria, projection, options).populate(populate);

const getOne = async (criteria, projection, options, populate = '') => Student.findOne(criteria, projection, options).populate(populate);

const updateOne = async (criteria, dataToSet, options) => Student.findOneAndUpdate(criteria, dataToSet, options);

const updateMany = async (criteria, dataToSet, options) => Student.updateMany(criteria, dataToSet, options);

module.exports = {
  add,
  get,
  getOne,
  updateOne,
  updateMany,
};
