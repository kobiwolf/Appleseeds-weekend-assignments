function sumLowest(arr) {
  arr.sort((b, a) => b - a);
  return arr[0] + arr[1];
}
console.log(sumLowest([1, 4, 6, 8, 9]));
