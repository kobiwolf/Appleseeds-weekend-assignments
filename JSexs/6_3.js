function countABC(string) {
  return string.split('').reduce((obj, value) => {
    obj[value.toLowerCase()]
      ? obj[value.toLowerCase()]++
      : (obj[value.toLowerCase()] = 1);
    return obj;
  }, {});
}
function organize(s1, s2) {
  let letter1 = Object.keys(countABC(s1));
  let letter2 = Object.keys(countABC(s2));
  let alllettrs = [...letter1, ...letter2];
  alllettrs = alllettrs.join('');
  alllettrs = Object.keys(countABC(alllettrs));
  console.log(alllettrs.sort().join(''));
}
organize('xyaabbbccccdefww', 'xxxxyyyyabklmopq');
