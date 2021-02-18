function bus(arr) {
  let passangers = 0;
  arr.forEach((element) => {
    passangers = passangers - element[1] + element[0];
  });
  console.log(passangers);
}
bus([
  [2, 0],
  [4, 1],
  [4, 6],
  [5, 1],
]);
