const User = require('../model/user');
const Transfer = require('../model/Transfer');

const getData = async (amount = null) => {
  const data = amount ? await User.find({ cash: amount }) : await User.find({});
  return data;
};
const findUser = async (id) => {
  const user = User.findById(id);
  if (user?.isActive === 'false') throw new Error('this user is not active');
  if (user) return user;
  throw new Error('cannot find user');
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (user) return 'user has removed';
  throw new Error('can not find user');
};
const createUser = async (value) => {
  try {
    const user = new User(value);
    await user.save();
    return user;
  } catch (error) {
    return error;
  }
};
const isNum = (value) => {
  const money = parseInt(value);
  if (money) return money;
  throw new Error('amount must be a number');
};

const upDateCredit = async (id, credit) => {
  credit = parseInt(credit);
  if (credit < 0) throw new Error('need to put valid credit');
  try {
    const user = await User.findByIdAndUpdate(id, { credit });
    if (user) return 'credit has been updated';
    throw new Error('user not found');
  } catch (e) {
    throw new Error(e);
  }
};
const transition = async (from, to, money) => {
  if (money < 0) throw new Error('amount must be a positive num');
  if (from.money - money < from.credit)
    throw new Error(
      `can not transfer from ${from._id}-doesn't have enough money`
    );
  try {
    await deposit(to.id, money);
    await draw(from.id, money);
    return 'the transfer has been completed';
  } catch (e) {
    throw new Error(e.message);
  }
};
const deposit = async (id, cash) => {
  try {
    const user = await User.findByIdAndUpdate(id, { $inc: { cash } });
    if (user) return `user num:${id}, just got deposit ${cash}$`;
    throw new Error('user not found');
  } catch (e) {
    return e;
  }
};
const draw = async (id, cash) => {
  try {
    let user = await User.findById(id);
    if (!user) throw new Error('user not found');
    if (user.cash + cash < user.credit)
      throw new Error('can not draw more money,your credit is too small');
    user = await User.findByIdAndUpdate(id, { $inc: { cash } }, { new: true });
    return `draw has been successful,your money:${user.cash}`;
  } catch (e) {
    throw new Error(e);
  }
};
const moneyAction = async (id, amount) => {
  try {
    const answer =
      amount >= 0 ? await deposit(id, amount) : await draw(id, amount);
    return answer;
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports = {
  createUser,
  deleteUser,
  findUser,
  getData,
  isNum,
  transition,
  upDateCredit,
  moneyAction,
};
