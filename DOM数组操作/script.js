const main = document.querySelector("#main");
const doubleBtn = document.querySelector("#double");
const addUserBtn = document.querySelector("#add-user");
const sortBtn = document.querySelector("#sort");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

const url = "https://randomuser.me/api";
let users = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch(url);
  const data = await res.json();
  const newUser = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    wealth: Math.floor(Math.random() * 100000),
  };
  addUser(newUser);
}

function addUser(user) {
  users.push(user);
  updateDOM();
}

function doubleUseWeath() {
  users.map((user) => ({ ...user, wealth: (user.wealth *= 2) }));
  updateDOM();
}

function updateDOM(provideData = users) {
  //  清空Main div
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  provideData.forEach((user) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${user.name}</strong> ${user.wealth}`;
    div.className = "person";
    main.append(div);
  });
}

function sortUsers() {
  users.sort((a, b) => b.wealth - a.wealth);
  updateDOM();
}

function showMillionaires() {
  const millionaires = users.filter((user) => user.wealth >= 1000000);
  updateDOM(millionaires);
}

function calculateWealth() {
  const wealth = users.reduce((acc, user) => (acc += user.wealth), 0);
  const wealthEle = document.createElement("div");
  wealthEle.innerHTML = `<h3>Total Wealth <strong>${wealth}</strong></h3>`;
  main.appendChild(wealthEle);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleUseWeath);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
sortBtn.addEventListener("click", sortUsers);
