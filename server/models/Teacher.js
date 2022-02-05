const { Schema, model } = require('mongoose');

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
});

const Teacher = model('Teacher', teacherSchema);

module.exports = Teacher;
