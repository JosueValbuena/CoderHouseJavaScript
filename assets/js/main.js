//import components from navbar
const btnNavMenuList = document.querySelector("#categorias");
const navMenuList = document.querySelector(".nav-menu-list");
const shoppingCardQty = document.querySelector(".nav-menu-sc-span")

//import html div to render producst
const productRenderDiv = document.querySelector(".products")
const productRenderShoppingCardDiv = document.querySelector(".products-shoppingCard")

//import buttons from card in main page
let buttonAddToCard = document.getElementsByClassName("card-shoppingCard-right-addButton");

//import buttons from shopping card page
const epmtycard = document.querySelector("#products-shoppingCard-emptyCard");

btnNavMenuList.addEventListener("click", () => navMenuList.classList.toggle("visible"));

//Import database
const productos = './assets/js/db.json';

//Rendering dataBase in HTML with a for
async function getData() {
    const res = await fetch(productos);
    const data = await res.json();
    return data;
}

//Rendering all products in index.html
async function renderProducts() {
    const dataBase = await getData()
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
                        <button class="card-shoppingCard-right-addButton" id=${producto.id}>Agregar al Carrito</button>
                        
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

window.onload = renderProducts();


//Adding function to buttons
function buttonsFunctions() {
    buttonAddToCard = document.querySelectorAll(".card-shoppingCard-right-addButton");
    buttonAddToCard.forEach(ele => ele.addEventListener("click", addTocard));
}

//Shopping Card functions
let shoppingCard;
const shoppingCardStorage = JSON.parse(localStorage.getItem('SC'));
if (shoppingCardStorage) {
    shoppingCard = shoppingCardStorage;
    shoppingCardQtyRender()
} else {
    shoppingCard = [];
}

//Rendering card products in Shopping Card .html
function renderShoppingCardProducts() {
    shoppingCard.forEach(products =>
        productRenderShoppingCardDiv.innerHTML += `
        <div>${products.title}</div>
        `
    )
}

epmtycard.addEventListener("click", () => emptyCard());

function shoppingCardQtyRender() {
    shoppingCardQty.textContent = shoppingCard.map(ele => ele.qty).reduce((a, b) => a + b, 0);
}

async function addTocard(e) {
    const buttonId = e.currentTarget.id;
    const dataBase = await getData();
    const existe = shoppingCard.some(ele => ele.id === Number(buttonId))
    if (existe) {
        const index = shoppingCard.findIndex(ele => ele.id === Number(buttonId))
        shoppingCard[index].qty++;
    } else {
        const productToAdd = dataBase.find(ele => ele.id === Number(buttonId));
        productToAdd.qty = 1;
        shoppingCard.push(productToAdd);
    }
    localStorage.setItem('SC', JSON.stringify(shoppingCard));
    shoppingCardQtyRender();
}

function emptyCard() {
    shoppingCard = [];
    localStorage.setItem("SC", JSON.stringify(shoppingCard));
    shoppingCardQtyRender()
}