/**
 * Created by Pramod on 07/05/22.
*/
const mongoose = require('mongoose');
const opts = require('./Opts');

const { Schema } = mongoose;

const teacherUser = new Schema({

  name: { type: String, required: true, trim: true },
  mobile: {
    type: String, required: true, trim: true, index: true,
  },
  email_id: {
    type: String, required: true, trim: true, index: { unique: true, sparse: true },
  },
  password: { type: String }, // bcrypt hash
}, { timestamps: opts });

teacherUser.index({ email_id: 1 });
module.exports = mongoose.model('teacher_user', teacherUser);
