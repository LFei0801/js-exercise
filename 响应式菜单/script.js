const burget = document.querySelector(".burget");
const navMenu = document.querySelector(".nav-menu");
const navMenuItems = document.querySelectorAll(".nav-menu li");

burget.addEventListener("click", () => {
  burget.classList.toggle("active");
  navMenu.classList.toggle("active");

  navMenuItems.forEach((item, index) => {
    if (item.style.animation) {
      item.style.animation = "";
    } else {
      item.style.animation = `0.3s ease-in slideIn forwards ${
        index * 0.1 + 0.3
      }s`;
    }
  });
});
