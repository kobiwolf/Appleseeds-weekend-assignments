const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bank-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
