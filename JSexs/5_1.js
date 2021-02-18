function trimm(string) {
  return string
    .split('')
    .slice(1, string.length - 1)
    .join('');
}
console.log(trimm('1hello1'));
