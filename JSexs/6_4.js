function countABC(string) {
  return string.split('').reduce((obj, value) => {
    obj[value] ? obj[value]++ : (obj[value] = 1);
    return obj;
  }, {});
}
function isogram(string) {
  let arr = Object.values(countABC(string));
  return arr.find((v) => v > 1) ? false : true;
}
console.log(isogram('"moOse'));
