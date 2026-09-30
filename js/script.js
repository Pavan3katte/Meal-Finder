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


