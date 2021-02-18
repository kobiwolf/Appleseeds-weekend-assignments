function shortest(string) {
  return string.split(' ').sort((b, a) => b.length - a.length)[0].length;
}
console.log(shortest('hi there i medioum'));
