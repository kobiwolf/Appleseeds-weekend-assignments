const myChart = document.getElementById('myChart').getContext('2d');
const chart = new Chart(myChart, {
  type: 'line',
  data: {
    labels: ['a', 'c', 'b'],
    datasets: [
      {
        label: 'corona status',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
const urlCountry = 'https://restcountries.herokuapp.com/api/v1';
const urlCorona = 'http://corona-api.com/countries';
const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
const citiesFilter = [];
const get = (type) => document.querySelector(type);
const create = (type) => document.createElement(type);
const butAsia = get('.Asia');
const butAmericas = get('.Americas');
const butAfrica = get('.Africa');
const butEurope = get('.Europe');
const butWorld = get('.World');
const upperDiv = get('.upperDivBut');
const lowerDiv = get('.linksDiv');
const infoDiv = get('.info');
const totalCasesP = get('.totalCasesP');
const newCasessP = get('.newCasesP');
const totalDeathsP = get('.totalDeathsP');
const newDeathsP = get('.newDeathsP');
const totalRecoverP = get('.totalRecoverP');
const criticalP = get('.criticalP');
const body = get('body');
const chartDiv = get('.chartDiv');

safe();

async function safe() {
  await getAllCountries().catch(erorrHandle);
  await addCoronaInfoToCountries().catch(erorrHandle);
  const Asia = filterToRegion('Asia');
  const Europe = filterToRegion('Europe');
  const Africa = filterToRegion('Africa');
  const Americas = filterToRegion('Americas');
  const World = filterToRegion('');
  World.push(...filterToRegion('Oceania'));
  makeEvent(butAfrica, Africa);
  makeEvent(butAsia, Asia);
  makeEvent(butWorld, World);
  makeEvent(butEurope, Europe);
  makeEvent(butAmericas, Americas);
}
function erorrHandle(error) {
  console.log(`oops its been an error:${error}`);
}
async function getAllCountries() {
  let allcountry = await fetch(`${proxy}${urlCountry}`);
  allcountry = await allcountry.json();
  allcountry.forEach((country) => {
    const cityFilter = {
      name: country.name.common,
      code: country.cca2,
      region: country.region,
    };
    citiesFilter.push(cityFilter);
  });
}

async function addCoronaInfoToCountries() {
  let allcorona = await fetch(`${proxy}${urlCorona}`);
  allcorona = await allcorona.json();
  allcorona = allcorona.data;
  for (let i = 0; i < citiesFilter.length; i++) {
    if (citiesFilter[i].name === 'Kosovo') i++; //kosovo doesnt exsit in the corona api
    let cityCorona = allcorona.find(
      (city) => city.code === citiesFilter[i].code
    );
    const today = cityCorona.today;
    cityCorona = cityCorona.latest_data;
    citiesFilter[i].confirmed = cityCorona.confirmed;
    citiesFilter[i].deaths = cityCorona.deaths;
    citiesFilter[i].recovered = cityCorona.recovered;
    citiesFilter[i].critical = cityCorona.critical;
    citiesFilter[i].newDeath = today.deaths;
    citiesFilter[i].newConfirmed = today.confirmed;
  }
}
function filterToRegion(name) {
  return citiesFilter.filter((city) => city.region === name);
}
function makeEvent(but, regionArr) {
  but.addEventListener('click', (e) => {
    createButtons(regionArr);
    changeChart(regionArr);
    presnetCities(regionArr);
  });
}
function createButtons(regionArr) {
  upperDiv.innerHTML = '';
  createOneBut(regionArr, 'confirmed');
  createOneBut(regionArr, 'deaths');
  createOneBut(regionArr, 'recovered');
  createOneBut(regionArr, 'critical');
}
function createOneBut(regionArr, name) {
  const but = create('button');
  but.innerText = name;
  but.addEventListener('click', (e) => {
    chart.data.datasets[0].label = `${regionArr[0].region} ${name}`;
    changeChart(regionArr, name);
  });
  upperDiv.appendChild(but);
}

function changeChart(regionArr, parameter = 'confirmed') {
  chartDiv.classList.remove('hidden');
  infoDiv.classList.add('hidden');
  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  regionArr.forEach((country) => {
    chart.data.labels.push(country.name);
    chart.data.datasets[0].data.push(country[parameter]);
    chart.update();
  });
}

function presnetCities(region) {
  lowerDiv.innerHTML = '';
  region.forEach((city) => {
    const p = create('p');
    p.innerText = `${city.name},  `;
    p.addEventListener('click', () => {
      chartDiv.classList.add('hidden');
      totalCasesP.innerText = city.confirmed;
      newCasessP.innerText = city.newConfirmed;
      totalDeathsP.innerText = city.deaths;
      newDeathsP.innerText = city.newDeath;
      totalRecoverP.innerText = city.recovered;
      criticalP.innerText = city.critical;
      infoDiv.classList.remove('hidden');
    });
    lowerDiv.appendChild(p);
  });
}
