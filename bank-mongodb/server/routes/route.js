const express = require('express');
const User = require('../model/user');

const {
  createUser,
  deleteUser,
  findUser,
  getData,
  isNum,
  transition,
  upDateCredit,
  moneyAction,
} = require('../utils/utils');

const route = new express.Router();
const endPoint = '/api/users';

// get all users
route.get(endPoint, async (req, res) => {
  try {
    const data = await getData();
    res.send(data);
  } catch (e) {
    res.status(200).send(e.message);
  }
});

// get users by filter
route.get(`${endPoint}/filter/`, (req, res) => {
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
route.get(`${endPoint}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await User.findById(id);
    answer ? res.send(answer) : res.status(404).send('user not found');
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// create user
route.post(endPoint, async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.send(`${JSON.stringify(user)} has successfully saved`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// transition
route.post(`${endPoint}/transfer/`, async (req, res) => {
  const { from, to, amount } = req.query;
  if (!from || !to || !amount)
    res.status(400).end('At least one of the queries is missing');
  try {
    const fromUser = await User.findById(from);
    const toUser = await User.findById(to);
    if (!fromUser || !toUser)
      res.status(404).end('at least one of the users are not exist');
    const money = isNum(amount);
    const transfer = await transition(fromUser, toUser, money);
    res.send(transfer);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// change user is active
route.post(`${endPoint}/active/:id`, (req, res) => {
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
route.put(`${endPoint}/:id`, async (req, res) => {
  const { id } = req.params;
  let { credit, amount } = req.query;
  credit = parseInt(credit);
  amount = parseInt(amount);
  let answer;
  try {
    if (credit && !amount) answer = await upDateCredit(id, credit);
    else if (!credit && amount) answer = await moneyAction(id, amount);
    answer
      ? res.send(answer)
      : res.status(400).send('you must put or valid amount or valid credit');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete user
route.delete(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  try {
    const answer = deleteUser(id);
    res.send(answer);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = route;
