/**
 * Created by Pramod on 07/05/22.
*/
const mongoose = require('mongoose');
const opts = require('./Opts');

const { Schema } = mongoose;
const student = new Schema({
  name: { type: String, required: true, trim: true },
  mobile: {
    type: String, trim: true, index: true,
  },
  email_id: {
    type: String, trim: true, index: { unique: true, sparse: true },
  },
  father_name: { type: String, trim: true },
  mother_name: { type: String, trim: true },
  address: { type: String, trim: true },
  sem: { type: Number },
  branch: { type: String, trim: true },
  year: { type: String, required: true },
  dob: { type: Date },
  ia_marks: [{ ia1: { type: Number } }, { ia2: { type: Number } },
    { ia3: { type: Number } }, { ia4: { type: Number } }],
  ia_totals: [
    { subject: { type: Schema.Types.ObjectId, ref: 'subject' }, marks: String },
  ],
  end_totals: [
    { subject: { type: Schema.Types.ObjectId, ref: 'subject' }, marks: String },
  ],
  ia_percentage: { type: Number, default: 0 },
  sgpa: { type: Number, default: 0 },
  cgpa: { type: Number, default: 0 },
  grade: { type: String, default: '' },
  reg_no: {
    type: String, required: true, trim: true, index: true,
  },
  photo: { type: String, default: '' },
  month: { type: String },
  shift: { type: String, default: '' },

}, { timestamps: opts });

student.index({ reg_no: 1, name: 1 });
module.exports = mongoose.model('student', student);
