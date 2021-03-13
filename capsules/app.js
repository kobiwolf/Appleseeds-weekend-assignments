const getEl = (type) => document.querySelector(type);
const createEl = (type) => document.createElement(type);
const infoDiv = getEl('.container');
const headersDiv = getEl('.container_Heads');
const dataUrl = 'https://apple-seeds.herokuapp.com/api/users/';
const searchArea = getEl('#search');
const select = getEl('select');
let allData = [];
// localStorage.clear();
let myStorage = window.localStorage;
console.log(myStorage);

if (myStorage.length) {
  allData = myStorage.data;
  allData = JSON.parse(allData);
}
safeRun();

async function safeRun() {
  if (!myStorage.length) {
    await fetchData().catch(handleError);
  }
  displayData();
}
// the fetching area
async function fetchData() {
  let data = await fetch(`${dataUrl}`);
  data = await data.json();
  for (let i = 0; i < data.length; i++) {
    let extraInfo = await fetch(`${dataUrl}${data[i].id}`);
    extraInfo = await extraInfo.json();
    data[i].age = extraInfo.age;
    data[i].city = extraInfo.city;
    data[i].gender = extraInfo.gender;
    data[i].hobby = extraInfo.hobby;
    data[i].delete = 'S';
    data[i].edit = 'S';
    allData.push(data[i]);
  }
  console.log(allData);
  myStorage.setItem('data', JSON.stringify(allData));
}
function handleError(error) {
  console.log(`you have a error:${error}`);
}

// the display area
function displayData() {
  displayTableHeads();
  displayStudents();
}
function displayTableHeads() {
  const arrOfHeads = Object.keys(allData[0]);
  const line = createEl('div');
  line.classList.add('info');
  for (head of arrOfHeads) {
    const header = createEl('div');
    header.classList.add('bold');
    header.innerText = head;
    header.addEventListener('click', (e) => {
      sortEvent(e.target);
    });
    line.appendChild(header);
  }
  headersDiv.appendChild(line);
}
function sortEvent(header) {
  infoDiv.innerHTML = '';
  if (!header.classList[1]) {
    allData.sort((b, a) =>
      b[header.innerText]
        .toString()
        .localeCompare(a[header.innerText], undefined, { numeric: true })
    );
    // the next 2 lines is to restart the sort arrange
    const headers = document.querySelectorAll('.up');
    headers.forEach((title) => title.classList.remove('up'));
    header.classList.add('up');
  } else {
    allData.sort((a, b) =>
      b[header.innerText]
        .toString()
        .localeCompare(a[header.innerText], undefined, { numeric: true })
    );
    header.classList.remove('up');
  }
  displayStudents();
}
function displayStudents() {
  allData.forEach((student) => {
    makeStudentLine(student);
  });
}
function makeStudentLine(student) {
  const studentValue = Object.entries(student);
  const line = createEl('div');
  line.classList.add('info');
  line.id = studentValue[0][1];
  studentValue.forEach((data) => {
    const cube = createEl('div');
    line.appendChild(cube);
    const dataName = data[0];
    cube.dataset[dataName] = student.id;
    if (data[0] === 'delete') makeDeleteButs(line, cube);
    else if (data[0] === 'edit') makeEditButs(line, cube);
    else {
      const p = createEl('p');
      p.innerText = data[1];
      const input = createEl('input');
      input.classList.add('hidden');
      cube.appendChild(p);
      cube.appendChild(input);
    }
  });
  infoDiv.appendChild(line);
}
function makeDeleteButs(line, cube) {
  const butDelete = createEl('button');
  butDelete.innerText = 'Delete';
  cube.appendChild(butDelete);
  butDelete.addEventListener('click', () => line.remove());
  const cancelBut = createEl('button');
  cancelBut.classList.add('hidden');
  cancelBut.innerText = 'Cancel';
  cancelBut.addEventListener('click', () => cancelEvent(catchLineCubes(line)));
  cube.appendChild(cancelBut);
}
function makeEditButs(line, cube) {
  const butEdit = createEl('button');
  butEdit.innerText = 'edit';
  cube.appendChild(butEdit);
  butEdit.addEventListener('click', () => editEvent(line));
  const saveBut = createEl('button');
  saveBut.classList.add('hidden');
  saveBut.innerText = 'Save';
  cube.appendChild(saveBut);
  saveBut.addEventListener('click', () => saveEvent(catchLineCubes(line)));
}
function editEvent(line) {
  let lineCubes = catchLineCubes(line);
  changeTheLineValuesToInput(lineCubes.divs);
  toggleDisplayOfChildren(lineCubes.buttons);
}
function catchLineCubes(line) {
  const fName = getEl(`[data-first-name='${line.id}']`);
  const LName = getEl(`[data-last-name='${line.id}']`);
  const capsule = getEl(`[data-capsule='${line.id}']`);
  const age = getEl(`[data-age='${line.id}']`);
  const city = getEl(`[data-city='${line.id}']`);
  const gender = getEl(`[data-gender='${line.id}']`);
  const hobby = getEl(`[data-hobby='${line.id}']`);
  const deleteDiv = getEl(`[data-delete='${line.id}']`);
  const editDiv = getEl(`[data-edit='${line.id}']`);
  return {
    divs: {
      fName,
      LName,
      capsule,
      age,
      city,
      gender,
      hobby,
    },
    buttons: {
      deleteDiv,
      editDiv,
    },
  };
}
function changeTheLineValuesToInput(cubes) {
  let elements = Object.values(cubes);
  elements.forEach((el) => {
    const p = el.firstElementChild;
    const input = el.lastElementChild;
    p.classList.add('hidden');
    input.classList.remove('hidden');
    input.value = p.innerText;
  });
}
function cancelEvent(cubes) {
  toggleDisplayOfChildren(cubes.divs);
  toggleDisplayOfChildren(cubes.buttons);
}
function saveEvent(cubes) {
  toggleDisplayOfChildren(cubes.buttons);
  let divs = Object.values(cubes.divs);
  divs.forEach((div) => {
    const p = div.firstElementChild;
    const input = div.lastElementChild;
    p.classList.remove('hidden');
    input.classList.add('hidden');
    p.innerText = input.value;
  });
}
function toggleDisplayOfChildren(obj) {
  let arrOfElements = Object.values(obj);
  arrOfElements.forEach((el) => {
    const first = el.firstElementChild;
    const second = el.lastElementChild;
    if (first.classList[0]) {
      first.classList.remove('hidden');
      second.classList.add('hidden');
    } else {
      first.classList.add('hidden');
      second.classList.remove('hidden');
    }
  });
}
searchArea.addEventListener('input', () => {
  infoDiv.innerHTML = '';
  allData.forEach((student) => {
    if (student[select.value].toString().includes(`${searchArea.value}`)) {
      makeStudentLine(student);
    }
  });
});
