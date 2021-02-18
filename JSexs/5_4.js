function wired(string) {
  console.log(
    string
      .split(' ')
      .map((v) => {
        v = v.split('');
        for (let i = 0; i < v.length; i += 2) v[i] = v[i].toUpperCase();
        return v.join('');
      })
      .join(' ')
  );
}
wired('Weird string case');
