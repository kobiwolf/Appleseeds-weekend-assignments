const mongoose = require('mongoose');

const Transfer = mongoose.model('transfer', {
  fromId: {
    required: true,
    type: String,
  },
  toId: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});
module.exports = Transfer;
