//import components from navbar
const btnNavMenuList = document.querySelector("#categorias");
const navMenuList = document.querySelector(".nav-menu-list");
const shoppingCardQty = document.querySelector(".nav-menu-sc-span");
const navButtonAcusticas = document.querySelector("#nav-buttonAcusticas");
const navButtonElectricas = document.querySelector("#nav-buttonElectricas");
const navButtonAccesorios = document.querySelector("#nav-buttonAccesorios");

//import html div to render producst
const productRenderDiv = document.querySelector(".products")
const productRenderShoppingCardDiv = document.querySelector(".shoppingCard-products")

//import buttons from card in main page
let buttonAddToCard = document.getElementsByClassName("card-shoppingCard-right-addButton");

//import components from shopping card
const btnEpmtycard = document.querySelector("#products-shoppingCard-emptyCard");
const totalShoppingCard = document.querySelector(".products-shoppingCard-total");

//events listeners
btnNavMenuList.addEventListener("click", () => navMenuList.classList.toggle("visible"));
btnEpmtycard.addEventListener("click", () => emptyCard());
navButtonAcusticas.addEventListener("click", ()=>renderProducts("acustica"));
navButtonElectricas.addEventListener("click", ()=>renderProducts("electrica"));
navButtonAccesorios.addEventListener("click", ()=>renderProducts("accesorios"));

//Import database
const productos = '/assets/js/db.json';

//Rendering dataBase in HTML with a for
async function getData() {
    const res = await fetch(productos);
    const data = await res.json();
    return data;
}

//Rendering all products in index.html
async function renderProducts(filter) {
    const dataBase = await getData()
    let filterDB = ""; 
    if (!filter){
        filterDB = dataBase 
    }else{
        filterDB = dataBase.filter( product => product.category == filter);    
    }
    productRenderDiv.innerHTML = "";
    filterDB.forEach(producto => {
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
    const exist = shoppingCard.some(ele => ele.id === Number(buttonId))
    if (exist) {
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
                    <div class="shoppingCard-card-right-buttons-items">
                        <button class="card-shoppingCard-right-lessButton" id="${product.id}">-</button>
                        <p class="card-shoppingCard-right-input" type="number" min="0" id="${product.id}">${product.qty}</p>
                        <button class="card-shoppingCard-right-plusButton" id="${product.id}">+</button>
                    </div>
                    <div>
                        <button class="card-shoppingCard-right-delete" id="${product.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        `
    )
    addfunctionSCbuttons()
    paymentTotal()
}

//adding functions to shopping card buttons
function addfunctionSCbuttons(){
    const buttonsPlus = document.querySelectorAll(".card-shoppingCard-right-plusButton");
    const buttonsLess = document.querySelectorAll(".card-shoppingCard-right-lessButton");
    const buttonsDelete = document.querySelectorAll(".card-shoppingCard-right-delete");
    buttonsPlus.forEach(button => button.addEventListener("click", plusSC));
    buttonsLess.forEach(button => button.addEventListener("click", lessSC));
    buttonsDelete.forEach(button => button.addEventListener("click", deleteProduct));
}

function plusSC(e){
    const id = e.currentTarget.id;
    const productos = shoppingCard;
    const index = shoppingCard.findIndex(ele => ele.id == id);
    const input = document.querySelectorAll(".card-shoppingCard-right-input");
    const inputArray = Array.prototype.slice.call(input);
    const indexInputArray = inputArray.find(ele => ele.id == id);
    indexInputArray.textContent = productos[index].qty += 1;
    localStorage.setItem("SC", JSON.stringify(shoppingCard));
    paymentTotal()
}

function lessSC(e){
    const id = e.currentTarget.id;
    const productos = shoppingCard;
    const index = shoppingCard.findIndex(ele => ele.id == id);
    const input = document.querySelectorAll(".card-shoppingCard-right-input");
    const inputArray = Array.prototype.slice.call(input);
    const indexInputArray = inputArray.find(ele => ele.id == id);
    indexInputArray.textContent = productos[index].qty -= 1;
    if(shoppingCard[index].qty == 0){
        deleteProduct(e);
    }
    localStorage.setItem("SC", JSON.stringify(shoppingCard));
    paymentTotal();
}

function deleteProduct(e){
    const id = e.currentTarget.id;
    const productos = shoppingCard;
    const index = productos.findIndex(ele => ele.id == id);
    shoppingCard.splice(index, 1);
    localStorage.setItem("SC", JSON.stringify(shoppingCard));
    renderShoppingCardProducts()
    paymentTotal();
}

//total mount shopping card
function paymentTotal(){
    totalShoppingCard.textContent = shoppingCard.map(ele => ele.price * ele.qty).reduce((a, b) => a + b, 0).toLocaleString("es");
}