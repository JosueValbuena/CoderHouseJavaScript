import { dataBase } from "./db.js"

//import components from navbar
const btnNavMenuList = document.querySelector("#categorias");
const navMenuList = document.querySelector(".nav-menu-list");
//import html div to render producst
const productRenderDiv = document.querySelector(".products")

//import buttons from card in main page
let buttonAddToCard = document.getElementsByClassName("card-shoppingCard-right-addButton");

btnNavMenuList.addEventListener("click", () => navMenuList.classList.toggle("visible"));

//Rendering dataBase in HTML with a for

function allProducts() {
    dataBase.forEach(producto => {
        productRenderDiv.innerHTML += `<div class="card">
        <img src=${producto.img} alt="">
            <div class="card-text">
                <p class="card-text-category">${producto.category}</p>
                <h3 class="card-text-title">${producto.title}</h3>
                <p class="card-text-description">${producto.description}</p>
                <div class="card-shoppingCard">
                    <p class="card-shoppingCard-price">$${producto.price}</p>
                    <div class="card-shoppingCard-right">
                        <button class="card-shoppingCard-right-addButton" id=${producto.id}">Agregar al Carrito</button>
                        
                        <button class="card-shoppingCard-right-giveButton">-</button>
                        <input class="card-shoppingCard-right-input" type="number" min="0" value="1">
                        <button class="card-shoppingCard-right-plusButton"">+</button>
                    
                        </div>
                </div>
            </div>
        </div>
        `
    });
    buttonsFunctions();
}

allProducts();

//Adding function to buttons

function buttonsFunctions() {
    buttonAddToCard = document.querySelectorAll(".card-shoppingCard-right-addButton");
    buttonAddToCard.forEach(ele => ele.addEventListener("click", addTocard));
}

//Shopping Card functions

const shoppingCard = [];

function addTocard(e) {
    const buttonId = e.currentTarget.id;
    const productToAdd = dataBase.find(ele => ele.id === buttonId);
    console.log(buttonId);
    console.log(productToAdd);
}