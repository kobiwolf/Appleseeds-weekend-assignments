function filter1(arr) {
  let arrfilter = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] > 1 && arrfilter.push(arr[i]);
  }
  return arrfilter;
}
console.log(filter1([1, 2, 3, 2, 4, 1]));

function forEach1(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i]++;
  }
}
console.log(forEach1([1, 2, 3]));

function map(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i]++;
  }
  return arr;
}
