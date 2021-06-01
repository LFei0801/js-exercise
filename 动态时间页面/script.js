const time = document.querySelector("#time");
const greeding = document.querySelector("#greeding");
const nameEle = document.querySelector("#name");
const planEle = document.querySelector("#plan");

// 设置时间
function showTime() {
  let date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    minutes
  )}<span>:</span>${addZero(seconds)}`;
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return n < 10 ? "0" + n : n;
}

// 设置时间及问候语
function setBgGreet() {
  let hour = new Date().getHours();
  if (hour < 12) {
    document.body.style.background =
      "url('img/moring.jpg') no-repeat center center/cover";
    greeding.innerText = "上午好,";
  } else if (hour === 12) {
    document.body.style.background =
      "url('img/noon.jpg') no-repeat center center/cover";
    greeding.innerText = "中午好,";
  } else if (hour >= 12 && hour <= 18) {
    document.body.style.background =
      "url('img/afternoon.jpg') no-repeat center center/cover";
    greeding.innerText = "下午好,";
  } else {
    document.body.style.background =
      "url('img/night.jpg') no-repeat center center/cover";
    greeding.innerText = "晚上好,";
  }
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.keyCode === 13 || e.which === 13) {
      localStorage.setItem("name", e.target.innerText);
      nameEle.blur();
    } else {
      localStorage.setItem("name", e.target.innerText);
    }
  }
}

function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    nameEle.innerText = "???";
  } else {
    nameEle.innerText = localStorage.getItem("name");
  }
}

function setPlan(e) {
  if (e.type === "keypress") {
    if (e.keyCode === 13 || e.which === 13) {
      localStorage.setItem("plan", e.target.innerText);
      planEle.blur();
    } else {
      localStorage.setItem("plan", e.target.innerText);
    }
  }
}

function getPlan() {
  if (
    localStorage.getItem("plan") === null ||
    localStorage.getItem("plan") === ""
  ) {
    planEle.innerText = "???";
  } else {
    planEle.innerText = localStorage.getItem("plan");
  }
}

showTime();
setBgGreet();
getName();
getPlan();

// 监听事件
nameEle.addEventListener("keypress", setName);
nameEle.addEventListener("blur", setName);
planEle.addEventListener("keypress", setPlan);
planEle.addEventListener("blur", setPlan);
