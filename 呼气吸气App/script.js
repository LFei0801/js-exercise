const container = document.querySelector("#container");
const text = document.querySelector("#text");

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.innerText = "吸气";
  container.className = "container grow";
  setTimeout(() => {
    text.innerText = "保持";
    setTimeout(() => {
      text.innerText = "吐气";
      container.className = "container shrink";
    }, holdTime);
  }, breathTime);
}

setInterval(breathAnimation, totalTime);

breathAnimation();
