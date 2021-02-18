function countDupli(string) {
  let obj = countABC(string);
  let arr = Object.values(obj);
  arr.reduce((total, value) => value > 1 ? total++ : total, 0)
    ? console.log('no characters repeats more than once')
    : console.log(arr[0]);
}
function countABC(string) {
  return string.split('').reduce((obj, value) => {
    obj[value.toLowerCase()]
      ? obj[value.toLowerCase()]++
      : (obj[value.toLowerCase()] = 1);
    return obj;
  }, {});
}
countDupli('hilLh');
