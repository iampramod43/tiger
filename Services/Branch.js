/* eslint-disable max-len */

const Branch = require('../Models/Branch');

const add = async (objToSave, options) => new Branch(objToSave).save(options);

const get = async (criteria, projection, options, populate = '') => Branch.find(criteria, projection, options).populate(populate);

const getOne = async (criteria, projection, options, populate = '') => Branch.findOne(criteria, projection, options).populate(populate);

const updateOne = async (criteria, dataToSet, options) => Branch.findOneAndUpdate(criteria, dataToSet, options);

const updateMany = async (criteria, dataToSet, options) => Branch.updateMany(criteria, dataToSet, options);

module.exports = {
  add,
  get,
  getOne,
  updateOne,
  updateMany,
};
