let startBut = document.querySelector('.start');
let firstPage = document.querySelector('.firstpage');
let game = document.querySelector('.game');
let restartBut = document.querySelector('.restartBut');
function startOver() {
  console.log('hi');
  location.reload();
}
function startGame() {
  firstPage.style.visibility = 'hidden';
  game.style.opacity = '1';
}
startBut.addEventListener('click', startGame);
restartBut.addEventListener('click', startOver);
