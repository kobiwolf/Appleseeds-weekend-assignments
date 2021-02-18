function findCentury(year) {
  year = year
    .toString()
    .split('')
    .map((v) => parseInt(v));
  return year[year.length - 1] === 0
    ? [year[0], year[1]].join('')
    : [year[0], (year[1] += 1)].join('');
}
console.log(findCentury(2001));
