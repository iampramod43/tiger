/**
 * Created by Pramod on 07/05/22.
*/
const mongoose = require('mongoose');
const opts = require('./Opts');

const { Schema } = mongoose;
const branch = new Schema({
  name: { type: String, required: true, trim: true },
  short_name: { type: String, required: true, trim: true },
}, { timestamps: opts });
module.exports = mongoose.model('branch', branch);
