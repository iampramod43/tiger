/**
 * Created by Pramod on 07/05/22.
*/
const mongoose = require('mongoose');
const opts = require('./Opts');

const { Schema } = mongoose;
const subject = new Schema({
  branch: { type: Schema.Types.ObjectId, ref: 'branch' },
  sem: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true },
  credits: { type: Number },
  max_cie_marks: { type: Number },
  max_see_marks: { type: Number },
  min_see_marks: { type: Number },
  min_cie_marks: { type: Number },
}, { timestamps: opts });

module.exports = mongoose.model('subject', subject);
