import  {getProducts} from './functions.js';
import {reloadPage} from './functions.js';
import {addToCart} from './functions.js';
import {cartIconClick} from './functions.js';

let productUrl = 'https://course-api.com/javascript-store-products';
let featureCenter = document.querySelector('.featured-center');

// display 3 products
const displayProducts = async () => {
  try {
    let data = await getProducts(productUrl);
    let products = data.map((product) => {
        return `
        <article class="product">
        <div class="product-container">
          <img src="${product.fields.image[0].url}" class="product-img img" alt=""/>
          <div class="product-icons">
            <a href="product_details.html?id=${product.id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <footer>
          <p class="product-name">${product.fields.name}</p>
          <h4 class="product-price">$${product.fields.price / 100}</h4>
        </footer>
      </article>
        `;
    });
    products = products.slice(0, 3);
    featureCenter.innerHTML = products.join('');

    // when we click add to cart
    let cartBtns = document.querySelectorAll('.product-icon');
    console.log(cartBtns);
    let cartOverlay = document.querySelector('.cart-overlay');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          let id = e.currentTarget.dataset.id;
          let item = data.find((item) => item.id === id);
          addToCart(item, id);
          cartOverlay.classList.add('show');
        });
    }); 
    // close cart
    let cartClose = document.querySelector('.cart-close');
    cartClose.addEventListener('click', () => {
        cartOverlay.classList.remove('show');
    });
  } catch (error) {
    console.log(error);
    featureCenter.innerHTML = `<center><h3 class="error">There was an error...</h3></center>`;
  }

}
// display products
displayProducts();

// when we reload the page, the cart icon will be updated
reloadPage();

// when we click on the cart icon, the cart overlay will be shown
let toggleCart = document.querySelector('.toggle-cart');
toggleCart.addEventListener('click', () => {
  cartIconClick();
});