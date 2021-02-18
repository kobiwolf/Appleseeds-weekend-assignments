function fibo(num) {
  let arr = [1, 1, ...Array(num - 2)];
  for (let i = 2; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  console.log(arr);
}
fibo(5);
