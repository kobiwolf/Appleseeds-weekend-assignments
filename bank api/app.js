const express = require('express');
const endPoint = '/api/users';
const {
  createUser,
  deleteUser,
  findUser,
  saveData,
  getData,
} = require('./utis');
const app = express();

app.use(express.json());
app.set('port', process.env.port || 3000);

app.get(endPoint, (req, res) => {
  try {
    const data = getData();
    res.send(data);
  } catch (e) {
    res.send(e.message);
  }
});
app.get(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  try {
    const answer = findUser(id);
    res.send(answer);
  } catch (e) {
    res.send(e.message);
  }
});
app.post(endPoint, (req, res) => {
  try {
    createUser(req.body);
    res.send(`${JSON.stringify(req.body)} has successfully updated`);
  } catch (e) {
    res.send(e.message);
  }
});
app.post(`${endPoint}/transfer`, (req, res) => {});
app.delete(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  try {
    const answer = deleteUser(id);
    res.send(answer);
  } catch (e) {
    res.send(e.message);
  }
});

app.listen(app.get('port'), (server) => {
  console.info(`Server listen on port ${app.get('port')}`);
});
