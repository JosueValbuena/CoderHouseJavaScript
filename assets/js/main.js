import { dataBase } from "./db.js"

//import components from navbar
const btnNavMenuList = document.querySelector("#categorias");
const navMenuList = document.querySelector(".nav-menu-list");
//import html div to render producst
const productRenderDiv = document.querySelector(".products")

btnNavMenuList.addEventListener("click", () => navMenuList.classList.toggle("visible"));

//Rendering dataBase in HTML with a for
const products = [...dataBase];

function allProducts() {
    products.forEach(producto => {
        productRenderDiv.innerHTML += `<div class="card">
        <img src=${producto.img} alt="">
            <div class="card-text">
                <p class="card-text-category">${producto.category}</p>
                <h3 class="card-text-title">${producto.title}</h3>
                <p class="card-text-description">${producto.description}</p>
                <div class="card-shoppingCard">
                    <p class="card-shoppingCard-price">$${producto.price}</p>
                    <div class="card-shoppingCard-right">
                        <button class="card-shoppingCard-right-addButton" id=${producto.id} onClick="probandoBoton(${producto.id})">Agregar al Carrito</button>
                        <button class="card-shoppingCard-right-giveButton" onClick="probandoBoton(${producto.id})">-</button>
                        <input class="card-shoppingCard-right-input" type="number" min="0" value="1">
                            <button class="card-shoppingCard-right-plusButton" onClick="probandoBoton(${producto.id})">+</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}

allProducts();

function probandoBoton(){
    console.log(`boton id`)
}

function asd(){
    console.lod('asd')
}

const shoppingCard = [];
console.log(products)
