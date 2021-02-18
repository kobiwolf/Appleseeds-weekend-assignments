function shortest(string) {
  return string.split(' ').sort((b, a) => a.length - b.length)[0].length;
}
console.log(shortest('hi there i medioum'));
