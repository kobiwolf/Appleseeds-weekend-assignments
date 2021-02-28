// elements
let startBut = document.querySelector('.start');
let firstPage = document.querySelector('.firstpage');
let game = document.querySelector('.game');
let restartBut = document.querySelector('.restartBut');
let world = document.querySelector('.world');
let exit = document.querySelector('.exit');

// state
let tools = {
  axe: ['wood', 'leaves'],
  pickaxe: ['stone'],
  water: ['fire'],
  shovel: ['dirt', 'topland'],
  sword: ['death'],
  hammer: ['bracet'],
};

// functions
function startOver() {
  makeMap(4, 44, 25);
}
function startGame() {
  firstPage.style.visibility = 'hidden';
  game.style.opacity = '1';
}
function closePage() {
  window.close();
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
      div.classList.remove('sky');
    }
  }
}
function makeTree(row, col) {
  let i;
  for (i = row; i <= row + 3; i++) {
    let div = getByRowCol(i, col);
    div.classList.add('wood');
    div.classList.remove('sky');
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

function makeSpecial(div, string) {
  div.classList.add(string);
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
    v.className.includes('sky') && (booli = true);
  });
  return booli;
}
function makeMap(landRows, width = 44, heigth = 25) {
  const cubeW = width;
  const cubeH = heigth;
  world.style.gridTemplateColumns = `repeat(${cubeW},1fr)`;
  world.style.gridTemplateRows = `repeat(${cubeH},1fr)`;
  for (let row = cubeH; row >= 1; row--) {
    for (let col = 1; col <= cubeW; col++) {
      let div = document.createElement('div');
      div.classList.add('click');
      div.dataset.row = `${row}`;
      div.dataset.col = `${col}`;
      world.appendChild(div);
      if (
        (row === 15 && col === 20) ||
        (row === 13 && col === 17) ||
        (row === 19 && col === 2) ||
        (row === 15 && col === 4) ||
        (row === 20 && col === 24)
      )
        makeSpecial(div, 'death');
      if (row === landRows + 1) {
        if (col % 20 === 0) makeTree(row, col);
        else if (col % 13 === 0) makeStone(row, col);
        else if (col === 8 || col === 33) makeHouse(row, col);
        else if (col === 17) makeFire(row, col);
        else makeSpecial(div, 'sky');
      } else {
        if (row === landRows) makeSpecial(div, 'topland');
        else if (row < landRows) makeSpecial(div, 'dirt');
        else makeSpecial(div, 'sky');
      }
    }
  }
}
function ifToolOrResourcedPressed(div) {
  if (div.parentElement.parentElement.classList[0] === 'navbar') {
    before.classList.remove('currentTool');
    div.classList.add('currentTool');
    before = div;
    return true;
  } else return false;
}
function checkBefore() {
  if (before.parentElement.classList[0] === 'left-nav') return 'tool';
  return 'resource';
}
function checkToolFit(tool, div) {
  toolType = tool.classList[0];
  landType = div.classList[1];
  if (tools[toolType].includes(landType)) {
    div.classList.add('sky');
    div.classList.remove(`${landType}`);
    let resourceP = document.querySelector(`[class='${landType} click']`)
      .firstElementChild;
    resourceP.innerHTML = parseInt(resourceP.innerText) + 1;
  } else if (landType !== 'sky') {
    showErorr(tool);
  }
}

function showErorr(div) {
  div.classList.add('worngTool');
  setTimeout(() => div.classList.remove('worngTool'), 400);
}
function checkIfExistAndReplace(before, div) {
  let resourceP = before.firstElementChild;
  if (parseInt(resourceP.innerText) > 0 && div.classList[1] === 'sky') {
    resourceP.innerText = parseInt(resourceP.innerText) - 1;
    div.classList.remove(`${div.classList[1]}`);
    div.classList.add(`${before.classList[0]}`);
  } else if (div.classList[1] !== 'sky' && parseInt(resourceP.innerText) > 0)
    showErorr(before);
  else showErorr(resourceP);
}
function divClick(e) {
  let div = e.target;
  if (!before) {
    before = div;
    return;
  }
  if (ifToolOrResourcedPressed(div) || !checkIfReachable(div)) return;
  if (before.classList[1] !== 'click') return;
  if (checkBefore() === 'tool') {
    checkToolFit(before, div);
  } else checkIfExistAndReplace(before, div);
}
// Events
startBut.addEventListener('click', startGame);
restartBut.addEventListener('click', startOver);
exit.addEventListener('click', closePage);

let before;
if (world.scrollWidth < 400) {
  alert('for best game experience you sholud rotate the phone and reload');
  makeMap(10, 30, 25);
} else makeMap(4, 44, 25);
let map = document.querySelectorAll('.click');
map.forEach((div) => {
  div.addEventListener('click', (e) => {
    divClick(e, before);
  });
});
