const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const foodInput = document.getElementById('food-input');
const allMeals = document.getElementById('all-meals');
const errorMessage = document.getElementById('error-message');
const single = document.getElementById('single');
const loadData = () => {
    single.innerHTML = "";
    if (!foodInput.value) {
        allMeals.innerHTML = "";
        errorMessage.innerText = "Please search a meal..";
    }
    else {
        fetch(`${baseUrl}filter.php?i=${foodInput.value}`)
            .then(res => res.json())
            .then(data => displayMeals(data.meals));
    }
}
const displayMeals = (meals) => {
    if (!meals) {
        allMeals.innerHTML = "";
        errorMessage.innerText = "Sorry, the Food Not Found..";
    }
    else{
        let output = "";
        errorMessage.innerText = "";
        meals.forEach(meal => {
            const {strMeal, strMealThumb, idMeal} = meal;
            output += `
                <div onclick="singleLoad(${idMeal})" class="col-6 col-md-4 col-lg-3 my-2">
                    <div class="food h-100 bg-white">
                        <img class="img-fluid food-img" src="${strMealThumb}" alt="">
                        <h3 class="text-center p-3">${strMeal}</h3>
                    </div>
                </div>`
            
        })
        allMeals.innerHTML = output;
    }
}
const singleLoad = (idMeal) => {
    fetch(`${baseUrl}lookup.php?i=${idMeal}`)
    .then(res => res.json())
    .then(data => singleMeal(data.meals[0]));
}
const singleMeal = (data) => {
    const{strMealThumb, strMeal, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6} = data;
    single.innerHTML = `
        <div class="bg-white single mx-auto food">
            <div class="food bg-white">
                <div class="single-img">
                    <img class="img-fluid food-img" src="${strMealThumb}" alt="">
                </div>
                <div class="p-3">
                    <h3 class="text-center">${strMeal}</h3>
                    <h4 class="my-4">Ingredients</h4>
                    <p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${strMeasure1}, ${strIngredient1}</span></p>
                    <p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${strMeasure2}, ${strIngredient2}</span></p>
                    <p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${strMeasure3}, ${strIngredient3}</span></p>
                    <p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${strMeasure4}, ${strIngredient4}</span></p>
                    <p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${strMeasure5}, ${strIngredient5}</span></p>
                    <p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${strMeasure6}, ${strIngredient6}</span></p>
                </div>
            </div>
        </div>
        `
}