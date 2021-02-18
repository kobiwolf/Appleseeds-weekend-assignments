function acuum(string) {
  return string
    .split('')
    .map((v, i) => (v = v.toUpperCase() + v.toLowerCase().repeat(i)))
    .join('-');
}
console.log(acuum('abcd'));
