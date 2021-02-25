function tibo(start, num) {
  if (num === 0) return console.log([]);
  booli = true;
  start.forEach((v) => {
    if (v < 0) booli = false;
  });
  if (booli === false) return console.log(false);
  let arr = [...start, ...Array(num - 2)];
  for (let i = 3; i < arr.length; i++)
    arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3];
  console.log(arr);
}
tibo([-1, 1, 1], 3);
