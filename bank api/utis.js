const e = require('express');
const fs = require('fs');
const pathData = './users.json';

const getData = () => {
  const data = fs.readFileSync(pathData).toString();
  return JSON.parse(data);
};
const saveData = (value) => {
  const string = JSON.stringify(value);
  fs.readFile(pathData, (err, data) => {
    if (data) {
      fs.writeFile(pathData, string, (error) => {
        if (error)
          throw new Error('did not manage to save the data...try again later');
      });
    } else {
      throw new Error('did not manage to find the data,try again later  ');
    }
  });
};
const updateUser = (value, id) => {
  const data = getData();
  const index = data.findIndex((user) => user.id === id);
  if (index !== -1) {
    data[index] = value;
    saveData(data);
    return 'user has update';
  } else {
    throw new Error('cannot find user');
  }
};

const findUser = (id) => {
  const data = getData();
  const picked = data.find((user) => user.id === id);
  if (picked?.isActive === 'false') throw new Error('this user is not active');
  if (picked) return picked;
  throw new Error('cannot find user');
};

const deleteUser = (id) => {
  const data = getData();
  const index = data.findIndex((user) => user.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    saveData(data);
    return 'user has removed';
  }
  throw new Error('can not find user');
};
const createUser = (value) => {
  const data = getData();
  data.push(value);
  saveData(data);
};
const isNum = (value) => {
  const money = parseInt(value);
  if (money) return money;
  throw new Error('amount must be a number');
};

const upDateCredit = (id, credit) => {
  credit = parseInt(credit);
  if (credit < 0) throw new Error('need to put valid credit');
  try {
    const user = findUser(id);
    user.credit = credit;
    updateUser(user, id);
    return 'credit has been updated';
  } catch (e) {
    return e.message;
  }
};
const transition = (from, to, money) => {
  if (money < 0) throw new Error('amount must be a positive num');
  if (from.money - money < from.credit)
    throw new Error(
      `can not transfer from ${from.id}-doesn't have enough money`
    );
  try {
    deposit(to.id, money);
    draw(from.id, money);
    return 'the transfer has been completed';
  } catch (e) {
    return e;
  }
};
const deposit = (id, amount) => {
  try {
    const user = findUser(id);
    user.money += amount;
    updateUser(user, id);
    return `user num:${id}, just got deposit ${amount}$`;
  } catch (e) {
    return e;
  }
};
const draw = (id, amount) => {
  try {
    const user = findUser(id);
    user.money += amount;
    if (user.money < user.credit)
      return new Error('can not draw more money,your credit is too small');
    updateUser(user, id);
    return `draw has been successful,your money:${user.money}`;
  } catch (e) {
    return e;
  }
};
const moneyAction = (id, amount) => {
  const answer = amount >= 0 ? deposit(id, amount) : draw(id, amount);
  if (answer.message) throw new Error(answer);
  return answer;
};
module.exports = {
  createUser,
  deleteUser,
  findUser,
  saveData,
  getData,
  isNum,
  transition,
  upDateCredit,
  updateUser,
  moneyAction,
};
