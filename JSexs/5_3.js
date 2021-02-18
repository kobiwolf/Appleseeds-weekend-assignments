function toCamelCase(string) {
  string = string.includes('-') ? string.split('-') : string.split('_');
  for (let i = 1; i < string.length; i++) {
    string[i] = string[i].split('');
    string[i][0] = string[i][0].toUpperCase();
    string[i] = string[i].join('');
  }
  console.log(string.join(''));
}
toCamelCase('the_stealth_warrior');
