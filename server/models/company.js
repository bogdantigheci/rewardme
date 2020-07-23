const mongoose = require('mongoose');
const validator = require('validator');

require('dotenv').config();

const companySchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  employees: {
    type: Array,
    default: [],
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = { Company };
