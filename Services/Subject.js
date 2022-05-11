/* eslint-disable max-len */

const Subject = require('../Models/Subject');

const add = async (objToSave, options) => new Subject(objToSave).save(options);

const get = async (criteria, projection, options, populate = '') => Subject.find(criteria, projection, options).populate(populate);

const getOne = async (criteria, projection, options, populate = '') => Subject.findOne(criteria, projection, options).populate(populate);

const updateOne = async (criteria, dataToSet, options) => Subject.findOneAndUpdate(criteria, dataToSet, options);

const updateMany = async (criteria, dataToSet, options) => Subject.updateMany(criteria, dataToSet, options);

module.exports = {
  add,
  get,
  getOne,
  updateOne,
  updateMany,
};
