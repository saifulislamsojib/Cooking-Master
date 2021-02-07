const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const foodInput = document.getElementById('food-input');
const allMeals = document.getElementById('all-meals');
const errorMessage = document.getElementById('error-message');
const single = document.getElementById('single');

// Load Meals Data
const loadData = () => {
    single.innerHTML = "";
    if (!foodInput.value) {
        allMeals.innerHTML = "";
        errorMessage.innerText = "Please search a meal..";
    }
    else {
        fetch(`${baseUrl}search.php?s=${foodInput.value}`)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))
    }
    foodInput.value = "";
};

// Display Meals Data
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
    };
};

// Single Meal Load Data
const singleLoad = (idMeal) => {
    fetch(`${baseUrl}lookup.php?i=${idMeal}`)
    .then(res => res.json())
    .then(data => singleMeal(data.meals[0]));
};

// Display single Meal Data
const singleMeal = (data) => {
    const{strMealThumb, strMeal, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strIngredient16, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16} = data;
    const ingredients = [
        `${strIngredient1} ${strMeasure1}`,
        `${strIngredient2} ${strMeasure2}`,
        `${strIngredient3} ${strMeasure3}`,
        `${strIngredient4} ${strMeasure4}`,
        `${strIngredient5} ${strMeasure5}`,
        `${strIngredient6} ${strMeasure6}`,
        `${strIngredient7} ${strMeasure7}`,
        `${strIngredient8} ${strMeasure8}`,
        `${strIngredient9} ${strMeasure9}`,
        `${strIngredient10} ${strMeasure10}`,
        `${strIngredient11} ${strMeasure11}`,
        `${strIngredient12} ${strMeasure12}`,
        `${strIngredient13} ${strMeasure13}`,
        `${strIngredient14} ${strMeasure14}`,
        `${strIngredient15} ${strMeasure15}`,
        `${strIngredient16} ${strMeasure16}`,
    ];
    single.innerHTML = `
        <div class="bg-white single mx-auto food">
            <div class="food bg-white">
                <div class="single-img">
                    <img class="img-fluid food-img" src="${strMealThumb}" alt="">
                </div>
                <div class="p-3">
                    <h3 class="text-center">${strMeal}</h3>
                    <h4 class="my-4">Ingredients</h4>
                    <div id="ingredients"></div>
                </div>
            </div>
        </div>
         `
    ingredients.map(ingredient => {
        const ingredientsItems = document.getElementById('ingredients');
        if(ingredient !== " "){
            ingredientsItems.innerHTML += `<p><i class="fas fa-check-square text-primary"></i> <span class="ms-2">${ingredient}</span></p>`
        }
    })
};