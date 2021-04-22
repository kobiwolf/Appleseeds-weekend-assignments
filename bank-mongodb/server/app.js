require('./db/server.js');
const express = require('express');
const cors = require('cors');
const route = require('./routes/route');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(route);

app.listen(port, () => {
  console.log(`we are line on ${port}`);
});
