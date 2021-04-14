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
// const updateUser = (value, id) => {
//   const picked = findUser(id);
//   if (picked.id) {
//     picked.cash -= value;
//   }
// };

const findUser = (id) => {
  const data = getData();
  const picked = data.find((user) => user.id === id);
  if (picked) return picked;
  throw new Error('cannot find user');
};

const deleteUser = (id) => {
  const data = getData();
  const index = data.findIndex((user) => user.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    try {
      saveData(data);
    } catch (e) {
      throw new Error('can not save data...pls try again later');
    }
    return `user has removed `;
  }
  throw new Error('cannot find user');
};
const createUser = (value) => {
  const data = getData();
  data.push(value);
  saveData(data);
};
module.exports = { createUser, deleteUser, findUser, saveData, getData };
