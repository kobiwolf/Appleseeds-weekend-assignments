const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    validate(value) {
      if (/\d/.test(value)) throw new Error("name mustn't have digits");
    },
  },
  phone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value, 'he-IL'))
        throw new Error('not a valid phone number');
    },
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('not a valid email');
    },
  },
  cash: {
    type: Number,
    required: true,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = User;
