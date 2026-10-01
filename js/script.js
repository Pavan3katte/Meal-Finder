let categoriesContainer=document.getElementById('categoriesContainer');

async function getcategories() {
    
    let response=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data= await response.json();
    console.log(data);

    data.categories.forEach(value => {
        

    categoriesContainer.innerHTML+=`<div class="category-card" onclick="getmealdetails('${value.strCategory}')"> 
        <img src="${value.strCategoryThumb}">
       <span class="category-name">
            ${value.strCategory}
        </span>


        </div>`

       // Hamburger menu categories
    menuCategories.innerHTML += `
        <div class="menu-item" onclick="getmealdetails('${value.strCategory}')">
            ${value.strCategory}
        </div>
    `;


});

}
    getcategories();  



    
let menuBtn = document.getElementById("menu-btn");
let sideMenu = document.getElementById("sideMenu");
let closeMenu = document.getElementById("closeMenu");
let menuCategories = document.getElementById("menuCategories");

menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});



//search food by name
 let searchInput=document.getElementById('searchInput');
    let mealsContainer=document.getElementById('mealsContainer');
    let searchBtn=document.getElementById('searchBtn');
    let meals_section=document.querySelector('.meals-section ');

    let mealDetails=document.getElementById('mealDetails');
    let meal_details_section=document.querySelector('.meal-details-section');
    searchBtn.addEventListener('click',async ()=>{
        let foodname=searchInput.value;
        console.log(foodname)

        let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodname}`)
        let data=await response.json();
        console.log(data);
        mealsContainer.innerHTML = "";
        meals_section.style.display="block";
     meal_details_section.style.display="none";

         data.meals.forEach(meal => {

     
            mealsContainer.innerHTML += `
    <div class="meal-card" onclick="getMealDetails('${meal.idMeal}')">

        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

        <h3>${meal.strArea}</h3>

        <p>${meal.strMeal}</p>

    </div>
`;
    });
   
    })


    
let categoryInfo = document.getElementById("categoryInfo");
let categoryName = document.getElementById("categoryName");
let categoryDescription = document.getElementById("categoryDescription");
async function getmealdetails(categories) {

    mealsContainer.innerHTML = "";

    // Get category information
    let categoryResponse = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    let categoryData = await categoryResponse.json();

    let category = categoryData.categories.find(
        value => value.strCategory === categories
    );

    categoryName.innerText = category.strCategory;

    categoryDescription.innerText = category.strCategoryDescription;

    categoryInfo.style.display = "block";


    // Get meals
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`
    );

    let data = await response.json();

    meals_section.style.display = "block";

    data.meals.forEach((value) => {

        mealsContainer.innerHTML += `
            <div class="meal-card" onclick="getMealDetails('${value.idMeal}')">

                <img src="${value.strMealThumb}">

                <h3>${categories}</h3>

                <p>${value.strMeal}</p>

            </div>
        `;

    });
}

 //when i click food the food id should prints   

   async function getMealDetails(id) {

    // meal details API
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    let data = await response.json();

    let meal = data.meals[0];

    // Hide meal cards
    meals_section.style.display = "none";

   meal_details_section.style.display="block";
    // Show meal name in breadcrumb
    document.getElementById("breadcrumbMeal").innerText = meal.strMeal;


    // Create ingredients
    let ingredients = "";

for (let i = 1; i <= 20; i++) {

    let ingredient = meal[`strIngredient${i}`];

    if (ingredient && ingredient.trim() !== "") {

        ingredients += `
            <div class="ingredient">
                <span class="ingredient-number">${i}</span>
                ${ingredient}
            </div>
        `;
    }
}


    // Create measurements
    let measurements = "";

for (let i = 1; i <= 20; i++) {

    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {

        measurements += `
            <div class="measurement">
                <i class="fa-solid fa-spoon"></i>
                ${measure}
            </div>
        `;
    }
}


    // Display everything
    mealDetails.innerHTML = `

        <div class="meal-top">

            <div class="meal-img">
                <img src="${meal.strMealThumb}">
            </div>


            <div class="meal-info">

                <h1>${meal.strMeal}</h1>

                <p>
                    <strong>Category:</strong>
                    ${meal.strCategory}
                </p>

                <p>
                    <strong>Area:</strong>
                    ${meal.strArea}
                </p>
                
                <p>
        <strong>Source:</strong>
        ${meal.strSource || "Not available"}
    </p>
                <p>
                    <strong>Tags:</strong>
                    ${meal.strTags || "No tags"}
                </p>


                <div class="ingredients-box">

                    <h3>INGREDIENTS</h3>

<div class="ingredients">
    ${ingredients}
</div>

                </div>

            </div>

        </div>


       

<h3 class="measure-title">Measure:</h3>

<div class="measurements">
    ${measurements}
</div>


        <h2 class="instructions-title">
            instructions:
        </h2>

        <div class="instructions">
            ${meal.strInstructions}
        </div>

    `;
}




//bact to home
let mealFinderHome = document.getElementById("mealFinderHome");

mealFinderHome.addEventListener("click", () => {

    meal_details_section.style.display = "none";
    meals_section.style.display = "none";
    categoryInfo.style.display = "none";
    sideMenu.classList.remove("active");

    document.querySelector(".categories-section").style.display = "block";

    window.scrollTo(0, 0);
});
