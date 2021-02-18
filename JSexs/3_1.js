function nd_year(p0, precent, aug, p) {
  let i = 0;
  for (i = 0; p0 < p; i++) p0 = p0 * (precent / 100 + 1) + aug;
  console.log(i);
}
nd_year(1500000, 2.5, 10000, 2000000);
