function name1(name) {
  name = name.split(' ');
  console.log(`${name[0][0].toUpperCase()}.${name[1][0].toUpperCase()}`);
}
name1('kobi wolf');
