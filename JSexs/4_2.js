function tibo(num) {
  let arr = [1, 1, 1, ...Array(num - 2)];
  for (let i = 3; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3];
  }
  console.log(arr);
}
tibo(8);
