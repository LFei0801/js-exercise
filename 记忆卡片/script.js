const cardContainer = document.querySelector("#cards-container");
const currentEle = document.querySelector("#current");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const showAddContainerBtn = document.querySelector("#show");
const hideAddContainerBtn = document.querySelector("#hide");
const addContainer = document.querySelector("#add-container");
const addCardBtn = document.querySelector("#add-card");
const questionInput = document.querySelector("#question");
const answerInput = document.querySelector("#answer");
const clearBtn = document.querySelector("#clear");

const cardsData = getCardsData();

// 读取本地存储数据
function getCardsData() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}

// 进行本地存储
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

const cardsEle = [];
let currentCard = 0;

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index = 0) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsEle.push(card);
  updateCurrentText();
  cardContainer.appendChild(card);
}

function updateCurrentText() {
  currentEle.innerHTML = `
    ${currentCard + 1}/${cardsEle.length}
  `;
}

function addCard() {
  const question = questionInput.value;
  const answer = answerInput.value;
  if (question && answer) {
    const newCard = { question, answer };
    cardsData.push(newCard);
    createCard(newCard);
    setCardsData(cardsData);
  }
  addContainer.classList.remove("show");
  console.log(cardsData);
}

nextBtn.addEventListener("click", () => {
  cardsEle[currentCard].className = "card left";
  currentCard++;
  if (currentCard > cardsEle.length - 1) {
    currentCard = cardsEle.length - 1;
  }
  cardsEle[currentCard].className = "card active";
  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEle[currentCard].className = "card right";
  currentCard--;
  if (currentCard < 0) {
    currentCard = 0;
  }
  cardsEle[currentCard].className = "card active";
  updateCurrentText();
});

showAddContainerBtn.addEventListener("click", () =>
  addContainer.classList.add("show")
);

hideAddContainerBtn.addEventListener("click", () =>
  addContainer.classList.remove("show")
);

clearBtn.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  localStorage.clear();
  window.location.reload();
});

addCardBtn.addEventListener("click", addCard);

createCards();
