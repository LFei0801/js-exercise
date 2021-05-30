const search = document.querySelector("#search");
const submitForm = document.querySelector("#submit");
const result_heading = document.querySelector("#result-heading");
const single_meals = document.querySelector("#single-meals");
const mealsEle = document.querySelector("#meals");
const random_btn = document.querySelector(".random-btn");

//sumbit form to  search meal
async function searchMeal(e) {
  e.preventDefault();
  single_meals.innerHTML = "";

  let value = search.value;
  // if value is emtpt then get the tip in result_heading dom
  if (value.trim() === "") {
    result_heading.innerHTML = `<h2>搜索内容不能为空</h2>`;
    return;
  }
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  const data = await res.json();
  // if fetch data is null
  if (data.meals === null) {
    result_heading.innerHTML = `<h2>未搜索到相关食品</h2>`;
    return;
  }
  // update the dom
  result_heading.innerHTML = `<h2>${value}搜索结果如下：</h2>`;
  mealsEle.innerHTML = data.meals
    .map((meal) => {
      return `<div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="meal-info" data-mealId="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>`;
    })
    .join("");
  search.value = "";
}

// click the random btn to get the random meal
async function getRandomMeal() {
  mealsEle.innerHTML = "";
  result_heading.innerHTML = "";
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  updateMealDOM(data.meals[0]);
}

// get the meal img id
async function getSingleMealByID(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  updateMealDOM(data.meals[0]);
}

function updateMealDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (!meal[`strIngredient${i}`]) break;
    ingredients.push(
      `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
    );
  }
  single_meals.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
}

// add Event Listener
submitForm.addEventListener("submit", searchMeal);
mealsEle.addEventListener("click", (e) => {
  const mealInfo = e.target.closest(".meal-info");
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealId");
    getSingleMealByID(mealID);
  }
});
random_btn.addEventListener("click", getRandomMeal);
