const balance = document.querySelector("#balance");
const text = document.querySelector("#text");
const list = document.querySelector("#list");
const amount = document.querySelector("#amount");
const amountForm = document.querySelector("#form");
const moeny_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

init();

// 初始化应用
function init() {
  updateAmountListDOM(transactions);
  updateValue();
}

// 添加交易
function addAmount(e) {
  e.preventDefault();
  const name = text.value.trim();
  const price = amount.value.trim();
  if (name === "" || price === "") {
    alert("交易名称或交易金额不能为空");
    return;
  }
  let transaction = {
    id: Math.floor(Math.random() * 100000),
    name: name,
    price: parseInt(price),
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateAmountListDOM();
  updateValue();
  text.value = "";
  amount.value = "";
}

// 更新历史记录
function updateAmountListDOM(proviteData = transactions) {
  if (!proviteData.length) {
    list.innerHTML = "";
  } else {
    list.innerHTML = proviteData
      .map((amount) => {
        return `<li class="${amount.price < 0 ? "minus" : "plus"}">
      ${amount.name} <span>$${
          amount.price
        }</span><button class="delete-btn" onclick=deleteAmount(${
          amount.id
        })>x</button>
    </li>`;
      })
      .join("");
  }
}

function updateValue() {
  // 更新余额
  let wealth = transactions
    .reduce((accu, item) => (accu += item.price), 0)
    .toFixed(2);
  balance.innerText = `$${wealth}`;

  // 更新收入
  let incomeArr = transactions.filter((item) => item.price > 0);
  let income = incomeArr
    .reduce((accu, item) => (accu += item.price), 0)
    .toFixed(2);
  moeny_plus.innerText = `+$${income}`;

  // 更新支出
  let expense = transactions
    .filter((item) => item.price < 0)
    .reduce((accu, item) => (accu += item.price), 0)
    .toFixed(2);
  money_minus.innerText = `$${expense}`;
}

// 删除交易记录
function deleteAmount(id) {
  transactions = transactions.filter((amount) => amount.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  init();
}

amountForm.addEventListener("submit", addAmount);
