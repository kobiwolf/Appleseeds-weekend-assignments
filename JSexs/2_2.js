function binaryToNum(arr) {
  arr = String.fromCharCode(parseInt(arr.join(''), 2));
  console.log(arr);
}
binaryToNum([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0]);
binaryToNum([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0]);
