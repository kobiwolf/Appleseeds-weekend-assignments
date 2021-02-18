function cover(string) {
  string = string.toString().split('');
  for (let i = string.length - 5; i >= 0; i--) {
    string[i] = '#';
  }
  console.log(string.join(''));
}
cover(1132456);
