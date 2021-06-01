# 记忆卡片制作

**需求**

- 1.卡片分为正面和背面，点击卡片实现旋转特效
- 2.所有卡片都叠在一起，点击前进后退按钮显示卡片
- 3.点击新卡片按钮，显示添加卡片表单，隐藏卡片内容
- 4.点击添加卡片按钮，添加新卡片并显示卡片界面，隐藏添加卡片界面
- 5.添加卡片
- 6.本地存储所有已经添加的卡片

## 需求一实现思路

_首先设置外部 Cards 容器样式_

```CSS
/* card样式 */
.cards {
  width: 500px;
  height: 300px;
  position: relative;
  max-width: 100%;
  perspective: 1000px;
}
/* Card样式 */
.card {
  /* 实现绝对定位这样就将所有的卡片叠在一起 */
  position: absolute;
  /* 将不是当前卡片的显示度设为0 */
  opacity: 0;
  font-size: 1.5em;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* 将不是当前卡片移到外部 */
  transform: translateX(50%) rotateY(-10deg);
  transition: transform 0.4s ease, opacity 0.4s ease;
}

/* 当前卡片 */
.card.active {
  opacity: 1;
  cursor: pointer;
  z-index: 10;
  transform: translateX(0%) rotateY(0deg);
}
```

_设置卡片样式_

```CSS
.inner-card {
  background-color: white;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  position: relative;
  /* 旋转特效需要3d效果 */
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}
.inner-card-front,
.inner-card-back {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  /* 将背面隐藏 */
  backface-visibility: hidden;
```

_设置旋转特效_

```CSS
/* 添加show-answer类 则显示背面卡片 */
.card.show-answer .inner-card {
  transform: rotateX(180deg);
}
.inner-card-front {
  transform: rotateX(0deg);
  z-index: 2;
}
.inner-card-back {
  transform: rotateX(180deg);
}
```

_通过 JS 控制旋转_

```javascript
function createCard(data, index = 0) {
  const card = document.createElement("div");
  // 注意没有active类
  card.classList.add("card");
  if (index === 0) {
    // 添加active类显示第一张卡片
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
  // 添加click事件，点击时切换show-answer类 实现旋转特效
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsEle.push(card);
  updateCurrentText();
  cardContainer.appendChild(card);
}
```

## 需求 2 实现思路

_.所有卡片都叠在一起，点击前进后退按钮显示卡片 实际上就是一个轮播图_

```CSS
/* 添加left类 则将当卡片移出 */
.card.left {
  transform: translateX(-50%) rotateY(10deg);
}
```

```javascript
let currentCard = 0;
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
```

## 需求 3、4 实现思路

_将 add-container 容器设置在卡片容器同一个位置，通过层级与透明度实现动态显示_

```CSS
/* 添加新卡片界面样式 */
.add-container {
  background-color: #f0f0f0;
  border-top: 2px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  opacity: 0;
  /* 默认放在底部 */
  z-index: -1;
}
/* 添加show方法则将层级放在顶部 */
.add-container.show {
  opacity: 1;
  z-index: 2;
}
.add-container h3 {
  margin: 10px 0;
}
.form-group label {
  display: block;
  margin: 20px 0 10px;
}
.form-group textarea {
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 16px;
  padding: 12px;
  min-width: 500px;
  max-width: 100%;
}
```

```javascript
showAddContainerBtn.addEventListener("click", () =>
  addContainer.classList.add("show")
);

hideAddContainerBtn.addEventListener("click", () =>
  addContainer.classList.remove("show")
);
```

## 需求 5 实现思路

_根据 cardsData 数组存放表单填写的内容，在更具 cardsData 数据更新 DOM_

```javascript
// 根据cards数组动态渲染DOM
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
// 更新卡片DOM
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
// 显示页码
function updateCurrentText() {
  currentEle.innerHTML = `
    ${currentCard + 1}/${cardsEle.length}
  `;
}
// 收集表单数据到cardsData中
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

addCardBtn.addEventListener("click", addCard);
createCards();
```

## 需求 6 实现思路

_利用 localstorage 存放 cardsData 数组_

```javascript
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
```

## 全部代码在文件中
