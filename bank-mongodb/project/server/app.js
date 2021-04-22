require('./db/server.js');
const express = require('express');
const cors = require('cors');
const path = require('path');
const route = require('./routes/route');

const app = express();
const pathToClientBuild = path.join(__dirname, '../client/build');
const port = process.env.PORT || 3001;
app.use(express.static(pathToClientBuild));
app.use(express.json());
app.use(cors());
app.use(route);
console.log(global.appRoot);
app.listen(port, () => {
  console.log(`we are line on ${port}`);
});
