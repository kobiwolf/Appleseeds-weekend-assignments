// elements
let startBut = document.querySelector('.start');
let firstPage = document.querySelector('.firstpage');
let game = document.querySelector('.game');
let restartBut = document.querySelector('.restartBut');
let world = document.querySelector('.world');

// functions
function startOver() {
  location.reload();
}
function startGame() {
  firstPage.style.visibility = 'hidden';
  game.style.opacity = '1';
}
function makeWidth(width) {
  world.style.width = `${width}px`;
}
function getByRowCol(row, col) {
  return document.querySelector(`[data-row='${row}'][data-col='${col}']`);
}
function loopsForFuncs(row, col, height, width, type, optional = 0) {
  for (let i = row; i <= row + height; i++) {
    for (let j = col - width; j <= col + optional; j++) {
      let div = getByRowCol(i, j);
      div.classList.add(`${type}`);
    }
  }
}
function makeTree(row, col) {
  let i;
  for (i = row; i <= row + 3; i++) {
    let div = getByRowCol(i, col);
    div.classList.add('wood');
  }
  loopsForFuncs(i, col, 3, 1, 'leaves', 1);
}

function makeStone(row, col) {
  loopsForFuncs(row, col, 1, 1, 'stone');
}
function makeHouse(row, col) {
  loopsForFuncs(row, col, 2, 1, 'bracet');
}
function makeFire(row, col) {
  loopsForFuncs(row, col, 2, 1, 'fire');
}
function makeSky(div) {
  div.classList.add('sky');
}
function makeDirt(div) {
  div.classList.add('dirt');
}
function makeTopLand(div) {
  div.classList.add('topland');
}
function checkIfExsitAndPush(div, arr) {
  div && arr.push(div);
}
function checkIfReachable(div) {
  let row = parseInt(div.dataset.row);
  let col = parseInt(div.dataset.col);
  let around = [];
  checkIfExsitAndPush(getByRowCol(row, col - 1), around);
  checkIfExsitAndPush(getByRowCol(row, col + 1), around);
  checkIfExsitAndPush(getByRowCol(row + 1, col), around);
  checkIfExsitAndPush(getByRowCol(row - 1, col), around);
  let booli = false;
  around.forEach((v) => {
    v.className === 'sky' && (booli = true);
  });
  return booli;
}
function makeMap(num) {
  let cubeW = Math.floor(world.scrollWidth / num);
  let cubeH = Math.floor(world.scrollHeight / num);
  world.style.gridTemplateColumns = `repeat(${cubeW},1fr)`;
  world.style.gridTemplateRows = `repeat(${cubeH},1fr)`;
  for (let row = cubeH; row >= 1; row--) {
    for (let col = 1; col <= cubeW; col++) {
      let div = document.createElement('div');
      div.classList.add('click');
      div.style.backgroundSize = '100% 100%';
      div.dataset.row = `${row}`;
      div.dataset.col = `${col}`;
      world.appendChild(div);
      if (row === 5) {
        if (col % 20 === 0) makeTree(row, col);
        else if (col % 13 === 0) makeStone(row, col);
        else if (col === 8 || col === 33) makeHouse(row, col);
        else if (col === 17) makeFire(row, col);
        else makeSky(div);
      } else {
        if (row === 4) makeTopLand(div);
        else if (row < 4) makeDirt(div);
        else makeSky(div);
      }
    }
  }
}
function toolOrResouce(current, div) {
  if (!current) {
    current = 5;
    console.log(current);
    return false;
  } else if (current.parentElement.classList[0] !== 'world') {
    return false;
  } else return true;
}
function divClick(e) {
  console.log(current);
  let div = e.target;
  console.log(div);
  let resource = toolOrResouce(current, div);
  console.log(resource);
  if (!resource) return;
  checkIfReachable(div);
  console.log('good');
}
// Events
startBut.addEventListener('click', startGame);
restartBut.addEventListener('click', startOver);

let current;
makeMap(30);
let map = document.querySelectorAll('.click');
map.forEach((div) => {
  div.addEventListener('click', divClick);
});
