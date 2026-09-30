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