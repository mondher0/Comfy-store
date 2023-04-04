let productUrl = 'https://course-api.com/javascript-store-products';
// get the products from the server
import {getProducts} from './get_products.js';

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


// function to filter products by company
function filterProducts(company) {
  let products = document.querySelectorAll('.product');
  products.forEach((product) => {
    if (company === 'all') {
      product.style.display = 'grid';
    }else if (product.children[2].textContent === company) {
      product.style.display = 'grid';
    }else {
      product.style.display = 'none';
    }
  });
}

// function to search products by name
function searchProducts(term) {
  let products = document.querySelectorAll('.product');
  products.forEach((product) => {
      const title = product.children[1].children[0].innerText.toLowerCase();
      if (title.indexOf(term) != -1) {
          product.style.display = "grid";
      }else {
          product.style.display = "none";
          // let container = document.querySelector(".courses .container");
          // container.style.justifyContent = "center";
          // container.innerHT((M))L = "<h1>Sorry, no²courses found</h1>";
      }
  });
}

// function add to cart
let arr = [];
function addToCart(item, id) {
  let cartItems = document.querySelector('.cart-items');
  if(arr.includes(id)) {
    console.log(true);
    let amount = document.querySelector(`[data-id="${id}"]`).parentElement.children[1];
    console.log(amount.textContent);
    amount.textContent = parseInt(amount.textContent) + item.fields.price / 100;
  }else {
    console.log(false);
    arr.push(id);
  cartItems.innerHTML += `
  <article class="cart-item">
  <img src="${item.fields.image[0].thumbnails.small.url}"
  class="cart-item-img"
  alt=""
/>  
<div>
  <h4 class="cart-item-name">${item.fields.name}</h4>
  <p class="cart-item-price">${item.fields.price / 100}</p>
  <button class="cart-item-remove-btn" data-id="${id}">remove</button>
</div>
<div>
  <button class="cart-item-increase-btn" data-id="${id}">
    <i class="fas fa-chevron-up"></i>
  </button>
  <p class="cart-item-amount" data-id="${id}">${item.fields.price / 100}</p>
  <button class="cart-item-decrease-btn" data-id="${id}">
    <i class="fas fa-chevron-down"></i>
  </button>
</div>
</article>
  `
  }
  // set cart in local storage
  window.localStorage.setItem('cart', JSON.stringify(cartItems.innerHTML));
}

// get cart from local storage
let cartItems = document.querySelector('.cart-items');
window.addEventListener('DOMContentLoaded', () => {
  if(window.localStorage.getItem('cart')) {
    cartItems.innerHTML = JSON.parse(window.localStorage.getItem('cart'));
    console.log(cartItems.innerHTML);
  }
});
