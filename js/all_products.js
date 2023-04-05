import {getProducts} from './functions.js';
import {addToCart} from './functions.js';
import {filterProducts} from './functions.js';
import {searchProducts} from './functions.js';
import {reloadPage} from './functions.js';
import {cartIconClick} from './functions.js';
let productUrl = 'https://course-api.com/javascript-store-products';
let productsContainer = document.querySelector('.products-container');
// display products
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
        <div class="product-company">${product.fields.company}</div>
      </article>
        `;
    });
    productsContainer.innerHTML = products.join('');

    // when we click add to cart
    let cartBtns = document.querySelectorAll('.product-cart-btn');
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
    productsContainer.innerHTML = `<h3 class="error">There was an error...</h3>`;
  }
}
// Call display products
displayProducts();

// display company name 
let companies = document.querySelector('.companies');
const displayCompanies = async () => {
    let products = await getProducts(productUrl);
    let tmp = [];
    products = products.map((product) => {
        if (!tmp.includes(product.fields.company)) {
            tmp.push(product.fields.company);
            return `
            <button class="company-btn">${product.fields.company}</button>
            `;
        }
    });
    companies.innerHTML += products.join('');
  // filter products
   let companyBtns = document.querySelectorAll('.company-btn');
   companyBtns.forEach((btn) => {
       btn.addEventListener('click', (e) => {
         console.log(e.currentTarget.textContent);
         let company = e.currentTarget.textContent;
         filterProducts(company);
   });
 });
}
// call the function, display companies
displayCompanies();

// search the courses by the title on search bar
const search = document.querySelector(".search-input");
search.addEventListener("input", (e) => {
   const term = e.target.value.toLowerCase();
   searchProducts(term);
});

// when we reload the page, the cart icon will be updated
reloadPage();

// when we click on the cart icon, the cart overlay will be shown
let toggleCart = document.querySelector('.toggle-cart');
toggleCart.addEventListener('click', () => {
  cartIconClick();
});