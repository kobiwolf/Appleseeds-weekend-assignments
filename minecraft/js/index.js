// elements
let startBut = document.querySelector('.start');
let firstPage = document.querySelector('.firstpage');
let game = document.querySelector('.game');
let restartBut = document.querySelector('.restartBut');
let world = document.querySelector('.world');
// functions
function startOver() {
  console.log('hi');
  location.reload();
}
function startGame() {
  firstPage.style.visibility = 'hidden';
  game.style.opacity = '1';
}
function makeWidth(width) {
  world.style.width = `${width}px`;
}
function makeTree(div) {
  let row = div.data - row;
  console.log(row);
}
// Events
startBut.addEventListener('click', startGame);
restartBut.addEventListener('click', startOver);

function makeMap(num) {
  let cubeW = Math.floor(world.scrollWidth / num);
  let cubeH = Math.floor(world.scrollHeight / num);
  world.style.gridTemplateColumns = `repeat(${cubeW},1fr)`;
  world.style.gridTemplateRows = `repeat(${cubeH},1fr)`;
  for (let row = 1; row <= cubeH; row++) {
    for (let col = 1; col <= cubeW; col++) {
      let currentRow = cubeH - row;
      let currentCol = cubeW - col;
      let div = document.createElement('div');
      div.dataset.row = `${row}`;
      div.dataset.col = `${col}`;
      world.appendChild(div);
      if (currentRow === 5 && currentCol % 5 === 0) {
        //    makeTree(div);
      } else if (currentRow === 4) {
        div.classList.add('topland');
      } else if (currentRow < 4) {
        div.classList.add('dirt');
      } else {
        div.classList.add('sky');
      }
    }
  }
}
makeMap(30);
