import {getProducts} from './functions.js';
import {addToCart} from './functions.js';
import {reloadPage} from './functions.js';
import {cartIconClick} from './functions.js';
// get the id from the url
let queryParam = new URLSearchParams(window.location.search);
let id = queryParam.get('id');
// get the product from the server
const singleProductUrl = `https://course-api.com/javascript-store-single-product?id=${id}`;
let singleProduct = document.querySelector('.single-product');

// display the product
const displayProduct = async () => {
    try {
        let data = await getProducts(singleProductUrl);
        let product = data;
        product = `
            <div class="section-center single-product-center">
            <img
              src="${product.fields.image[0].url}"
              class="single-product-img img"
              alt=""
            />
            <article class="single-product-info">
              <div>
                <h2 class="single-product-title">${product.fields.name}</h2>
                <p class="single-product-company text-slanted">
                  by ${product.fields.company}
                </p>
                <p class="single-product-price">$${product.fields.price / 100}</p>
                <div class="single-product-colors"></div>
                <p class="single-product-desc">${product.fields.description}</p>
                <button class="addToCartBtn btn" data-id="id">
                  add to cart
                </button>
              </div>
            </article>
          </div>
            `
        let pageHeroTitle = document.querySelector('.page-hero-title');
        pageHeroTitle.innerHTML = `Home / ${data.fields.name}`;
        let title = document.querySelector('title');
        title.innerHTML = `${data.fields.name} | Comfy`;
        singleProduct.innerHTML = product;
        // display the colors
        data.fields.colors.forEach((color) => {
            let colors = document.querySelector('.single-product-colors');
            let colorSpan = `<span class="product-color" style="background-color: ${color}"></span>`
            colors.innerHTML += colorSpan;
        });
        // when we click add to cart
        let cartBtns = document.querySelector('.addToCartBtn');
        let cartOverlay = document.querySelector('.cart-overlay');
        cartBtns.addEventListener('click', (e) => {
            addToCart(data, data.id);
            cartOverlay.classList.add('show');

        });
        // close cart
        let cartClose = document.querySelector('.cart-close');
        cartClose.addEventListener('click', () => {
            cartOverlay.classList.remove('show');
        });
    } catch (error) {
        console.log(error);
        singleProduct.innerHTML = `<center><h3 class="error">There was an error...</h3></center>`;
    }
}
// display the product
displayProduct();

// when we reload the page, the cart icon will be updated
reloadPage();

// when we click on the cart icon, the cart overlay will be shown
let toggleCart = document.querySelector('.toggle-cart');
toggleCart.addEventListener('click', () => {
  cartIconClick();
});