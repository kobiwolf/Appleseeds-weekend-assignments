function unique(arr) {
  arr = arr.sort((b, a) => b - a);
  return arr[0] !== arr[1] ? arr[0] : arr[arr.length - 1];
}
console.log(unique([1, 0.5, 1, 1, 1, 1]));
