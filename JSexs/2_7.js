function myMath(operator, num1, num2) {
  return eval(`${num1}${operator}${num2}`);
}
console.log(myMath('*', 2, 3));
