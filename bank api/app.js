const express = require('express');
const endPoint = '/api/users';
const {
  createUser,
  deleteUser,
  findUser,
  getData,
  isNum,
  transition,
  upDateCredit,
  moneyAction,
  updateUser,
} = require('./utis');

const app = express();
app.use(express.json());
app.set('port', process.env.port || 3000);

// get all users
app.get(endPoint, (req, res) => {
  try {
    const data = getData();
    res.send(data);
  } catch (e) {
    res.status(200).send(e.message);
  }
});

// get users by filter
app.get(`${endPoint}/filter/`, (req, res) => {
  let { amount } = req.query;
  if (!amount && amount !== 0)
    res.status(404).send('no filter params as been given');
  try {
    amount = isNum(amount);
    const data = getData();
    const filteredData = data.filter(
      (user) => user.isActive === 'true' && user.money === amount
    );
    filteredData.length
      ? res.send(filteredData)
      : res.send('can not find any users matching your filter ');
  } catch (e) {
    res.send(e.message);
  }
});
// get one user
app.get(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  try {
    const answer = findUser(id);
    res.send(answer);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// create user
app.post(endPoint, (req, res) => {
  try {
    createUser(req.body);
    res.send(`${JSON.stringify(req.body)} has successfully saved`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// transition
app.post(`${endPoint}/transfer/`, (req, res) => {
  const { from, to, amount } = req.query;
  if (!from || !to || !amount)
    res.status(400).send('At least one of the queries is missing');
  else {
    try {
      const fromUser = findUser(from);
      const toUser = findUser(to);
      const money = isNum(amount);
      const transfer = transition(fromUser, toUser, money);
      res.send(transfer);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
});
// change user is active
app.post(`${endPoint}/active/:id`, (req, res) => {
  const { id } = req.params;
  const picked = getData().find((user) => user.id == id);
  if (picked) {
    picked.isActive = 'true';
    console.log(picked);
    updateUser(picked, id);
    res.send(`user num:${picked.id} has been actived`);
  } else res.status(400).send('can not find user');
});
// user credit and money change
app.put(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  let { credit, amount } = req.query;
  credit = parseInt(credit);
  amount = parseInt(amount);
  let answer;
  try {
    if (credit && !amount) answer = upDateCredit(id, credit);
    else if (!credit && amount) answer = moneyAction(id, amount);
    answer
      ? res.send(answer)
      : res.status(400).send('you must put or valid amount or valid credit');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete user
app.delete(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  try {
    const answer = deleteUser(id);
    res.send(answer);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.listen(app.get('port'), (server) => {
  console.info(`Server listen on port ${app.get('port')}`);
});
