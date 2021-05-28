# fetch 基础知识

- 基本语法： let promise = fetch(url, [options])
- url —— 要访问的 URL
- options —— 可选参数：method，header 等。
- 没有 options，那就是一个简单的 GET 请求，下载 url 的内容。
- 第一阶段，当服务器发送了响应头（response header),fetch 返回的 promise 就使用内建 Response class 对象来对响应头进行解析
- 第二阶段，为了获取 response body，我们需要使用一个其他的方法调用。
- 在 nodejs 中还没有支持 fetch 需要是要 node-fetch 包来使用
- 响应的属性：

  - response.status —— response 的 HTTP 状态码，
  - response.ok —— HTTP 状态码为 200-299，则为 true。
  - response.headers —— 类似于 Map 的带有 HTTP header 的对象。

- 获取 response body 的方法：
  - response.text() —— 读取 response，并以文本形式返回 response，
  - response.json() —— 将 response 解析为 JSON 对象形式，
  - response.formData() —— 以 FormData 对象的形式返回 response，
  - response.blob() —— 以 Blob（具有类型的二进制数据）形式返回 response，
  - response.arrayBuffer() —— 以 ArrayBuffer（低级别的二进制数据）形式返回 response

```javascript
// 设置初始值
caculate();
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
```
