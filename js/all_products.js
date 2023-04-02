// get the products from the server
import {getProducts} from './get_products.js';

let productUrl = 'https://course-api.com/javascript-store-products';
let productsContainer = document.querySelector('.products-container');
// display products
const displayProducts = async () => {
    let products = await getProducts(productUrl);
    products = products.map((product) => {
        return `
        <article class="product">
        <div class="product-container">
          <img src="${product.fields.image[0].url}" class="product-img img" alt=""/>
          <div class="product-icons">
            <a href="product.html?id=${product.id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <footer>
          <p class="product-name">${product.fields.name}</p>
          <h4 class="product-price">$${product.fields.price}</h4>
        </footer>
      </article>
        `;
    });
    productsContainer.innerHTML = products.join('');
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
}

// call the function, display companies
displayCompanies();