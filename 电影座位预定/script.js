const container = document.querySelector(".container");
const movieSelect = document.querySelector(".movie");
const count = document.getElementById("count");
const total = document.getElementById("total");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

let ticketPrice = +localStorage.getItem("moviePrice");

// 获取本地数据并渲染UI
popuerUI();

function popuerUI() {
  const selectedIndex =
    JSON.parse(localStorage.getItem("selectSeatsIndex")) || [];

  [...selectedIndex].forEach((index) => {
    seats[index].classList.add("selected");
  });

  const selectedMovieIndex = localStorage.getItem("movieIndex") || "0";
  movieSelect.selectedIndex = selectedMovieIndex;
}

// 设置初始座位数以及总票价
updateCountAndTotal();
function updateCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  // console.log(typeof selectedSeats); //object
  const selectSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  console.log(typeof selectSeatsIndex); //object
  localStorage.setItem("selectSeatsIndex", JSON.stringify(selectSeatsIndex));
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("screen") ||
    e.target.classList.contains("occupied")
  ) {
    return;
  }

  e.target.classList.toggle("selected");
  updateCountAndTotal();
});

//保存电影索引值和票价
function setMovieData(index, price) {
  localStorage.setItem("movieIndex", index);
  localStorage.setItem("moviePrice", price);
}

movieSelect.addEventListener("change", (e) => {
  updateCountAndTotal();
  setMovieData(e.target.selectedIndex, e.target.value);
});
