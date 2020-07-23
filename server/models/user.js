const mongoose = require('mongoose');

require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  company: {
    type: String,
    required: true,
    maxlength: 100,
  },
  pointsToGive: {
    type: Number,
    default: 100,
  },
  pointsToRedeem: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExp: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
