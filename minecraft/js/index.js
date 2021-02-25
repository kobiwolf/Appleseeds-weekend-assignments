let startBut = document.querySelector('.start');
let firstPage = document.querySelector('.firstpage');
function startGame() {
  firstPage.style.opacity = '0';
}
startBut.addEventListener('click', startGame);
