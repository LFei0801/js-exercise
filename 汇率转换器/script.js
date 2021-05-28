const currency_one = document.querySelector("#currency-one");
const currency_two = document.querySelector("#currency-two");
const amount_one = document.querySelector("#amount-one");
const amount_two = document.querySelector("#amount-two");
const rate = document.querySelector("#rate");
const swap = document.querySelector("#swap");

const caculate = async () => {
  const currencyoneValue = currency_one.value;
  const currencytwoValue = currency_two.value;

  // 获取数据
  let res = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${currencyoneValue}`
  );
  let data = await res.json();
  let currencyRate = data.rates[currencytwoValue];

  rate.innerHTML = `1 ${currencyoneValue} = ${currencyRate} ${currencytwoValue}`;
  amount_two.value = amount_one.value * currencyRate;
};

// 设置初始值
caculate();

currency_one.addEventListener("change", caculate);
currency_two.addEventListener("change", caculate);
amount_one.addEventListener("input", caculate);
amount_two.addEventListener("input", caculate);

swap.addEventListener("click", () => {
  // 扩展运算发交换两个值
  [currency_one.value, currency_two.value] = [
    currency_two.value,
    currency_one.value,
  ];
  caculate();
});
