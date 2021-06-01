const textEle = document.querySelector("#text");
const scoreEle = document.querySelector("#score");
const wordEle = document.querySelector("#word");
const timeEle = document.querySelector("#time");
const endGameEle = document.querySelector("#end-game-container");
const settingBtn = document.querySelector(".setting");
const formContainer = document.querySelector(".form-container");
const diffcuitySelect = document.querySelector("#diffcuity");

// 单词数组
const words = [
  "ability",
  "between",
  "board",
  "century",
  "conference",
  "democratic",
  "economic",
  "environmental",
  "experience",
  "financial",
];

let score = 0; // 得分
let time = 10; // 时间
let randomWord; // 随机单词
let diffcuity = localStorage.getItem("diffcuity") || "medium";

// 显示玩家的选择的难度值
diffcuitySelect.value = localStorage.getItem("diffcuity") || "medium";

// 更新倒计时
const timeId = setInterval(updateTime, 1000);
// 自动聚焦到 单词输入款
text.focus();

// 获取随机单词
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// 更新单词到DOM
function updateWordDOM() {
  randomWord = getRandomWord();
  wordEle.innerHTML = randomWord;
}

// 更新得分
function updateScore() {
  score++;
  scoreEle.innerHTML = score;
}

// 更新时间
function updateTime() {
  time--;
  timeEle.innerHTML = time + "s";
  if (time <= 0) {
    clearInterval(timeId);
    gameOver();
  }
}

// 游戏结束
function gameOver() {
  endGameEle.innerHTML = `
  <h1>游戏结束</h1>
  <h3>你的最终得分为 ${score}</h3>
  <button onclick="location.reload()">重新开始</button>
  `;
  endGameEle.style.display = "flex";
}

updateWordDOM();

textEle.addEventListener("input", (e) => {
  let text = e.target.value.trim();
  if (text === randomWord) {
    updateWordDOM();
    updateScore();
    e.target.value = "";
    switch (diffcuity) {
      case "easy":
        time += 5;
        break;
      case "medium":
        time += 3;
        break;
      case "hard":
        time += 2;
        break;
      default:
        time += 3;
    }
    updateTime();
  }
});

diffcuitySelect.addEventListener("change", (e) => {
  // 本地存储 玩家选择的难度值
  localStorage.setItem("diffcuity", e.target.value);
});

// 显示难度设置界面
settingBtn.addEventListener("click", () => {
  formContainer.classList.toggle("show");
});
