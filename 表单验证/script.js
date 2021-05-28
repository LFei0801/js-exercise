const form = document.querySelector("form");
const inputArr = document.querySelectorAll("input");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
  small.style.visibility = "visible";
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  const small = formControl.querySelector("small");
  small.style.visibility = "hidden";
}

function checkEmailFormat(email) {
  const regexp = /^[A-Z0-9]+([_.][A-Z0-9]+)*@([A-Z0-9\-]+\.)+[A-Z]{2,6}$/i;
  return regexp.test(String(email));
}

function checkPassword(password, confirmPassword) {
  return password.value.trim() === confirmPassword.value.trim();
}

function checkLength(input) {
  return input.value.trim().length >= 3 && input.value.trim().length <= 8;
}

function checkRequired(inputArr) {
  inputArr.forEach((item) => {
    if (item.value.trim() === "") {
      showError(item, `${getKeyWords(item)}为必填项`);
    } else {
      showSuccess(item);
    }
  });
}

function getKeyWords(input) {
  return input.placeholder.slice(3);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 检验必填项表单是否都有数据
  checkRequired(inputArr);

  // 检验除了email外各项长度是否符合标准
  const notEmailInputs = [...inputArr].filter((item) => item.id !== "email");
  notEmailInputs.forEach((input) => {
    if (!checkLength(input) && input.value.trim() !== "") {
      showError(input, `${getKeyWords(input)}长度大于3位小于8位`);
    }
  });

  // 检验Email格式是否准确
  const email = [...inputArr].filter((item) => item.id === "email");
  if (!checkEmailFormat(email[0].value) && email[0].value.trim() !== "") {
    showError(email[0], "邮箱格式错误！");
  }

  // 检验密码是否一致
  const passwords = [...inputArr].filter(
    (item) => item.id === "password" || item.id === "confirmPassword"
  );
  if (
    !checkPassword(passwords[0], passwords[1]) &&
    passwords[0].value.trim() !== "" &&
    passwords[1].value.trim() !== ""
  ) {
    showError(passwords[0], "两次密码不一致");
    showError(passwords[1], "两次密码不一致");
  }
});
