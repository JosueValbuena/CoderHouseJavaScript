//import components from navbar
const btnNavMenuList = document.querySelector("#categorias");
const navMenuList = document.querySelector(".nav-menu-list");
const shoppingCardQty = document.querySelector(".nav-menu-sc-span")

//import html div to render producst
const productRenderDiv = document.querySelector(".products")
const productRenderShoppingCardDiv = document.querySelector(".shoppingCard-products")

//import buttons from card in main page
let buttonAddToCard = document.getElementsByClassName("card-shoppingCard-right-addButton");

//import buttons from shopping card
const btnEpmtycard = document.querySelector("#products-shoppingCard-emptyCard");

btnNavMenuList.addEventListener("click", () => navMenuList.classList.toggle("visible"));
btnEpmtycard.addEventListener("click", () => emptyCard())

//Import database
const productos = '/assets/js/db.json';

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
                <div class="card-button">
                    <p class="card-button-price">$${producto.price}</p>
                    <div class="card-button-right">
                        <button class="card-button-right-addButton" id=${producto.id}>Agregar al Carrito</button>                    
                    </div>
                </div>
            </div>
        </div>
        `
    });
    buttonsFunctions();
    renderShoppingCardProducts()
}

window.onload = renderProducts();

//Adding function to buttons
function buttonsFunctions() {
    buttonAddToCard = document.querySelectorAll(".card-button-right-addButton");
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

// show total items card in navbar
function shoppingCardQtyRender() {
    shoppingCardQty.textContent = shoppingCard.map(ele => ele.qty).reduce((a, b) => a + b, 0);
}

//add items to card
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
    renderShoppingCardProducts()
}

//empty shopping card
//epmtycard.addEventListener("click", () => emptyCard());

function emptyCard() {
    shoppingCard = [];
    localStorage.setItem("SC", JSON.stringify(shoppingCard));
    shoppingCardQtyRender()
    renderShoppingCardProducts()
}

//Rendering card products in Shopping Card .html
function renderShoppingCardProducts() {
    productRenderShoppingCardDiv.innerHTML = "";
    shoppingCard.forEach(product =>
        productRenderShoppingCardDiv.innerHTML += `
        <div class="shoppingCard-card">
            <img src="${product.img}" class="shoppingCard-card-img"/>
            <div class="shoppingCard-card-right">
                <div class="shoppingCard-card-right-text">
                <div>${product.title}</div>
                <div>${product.price}</div>
                </div>
                <div class="shoppingCard-card-right-buttons">
                    <div>
                        <button class="card-shoppingCard-right-lessButton" id="${product.id}">-</button>
                        <input class="card-shoppingCard-right-input" type="number" min="0" value="1">
                        <button class="card-shoppingCard-right-plusButton" id="${product.id}">+</button>
                    </div>
                    <div>
                        <button>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        `
    )
}