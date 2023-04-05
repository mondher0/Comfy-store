// the function to get the products from the API
export const getProducts = async (productUrl) => {
    try {
        const response = await fetch(productUrl);
        let products = await response.json();
        return products;
    } catch (error) {
        console.log(error);
    }
}

// function add to cart
export function addToCart(item, id) {
    let cartItemsCount = document.querySelector('.cart-item-count');
    cartItemsCount.textContent = parseInt(cartItemsCount.textContent) + 1;
    let cartItems = document.querySelector('.cart-items');
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    cartItems.innerHTML = cart;
    if(!cartItems.innerHTML.includes(id)) {
      cartItems.innerHTML += `
      <article class="cart-item" data-id="${id}">
      <img src="${item.fields.image[0].thumbnails.small.url}"
      class="cart-item-img"
      alt=""
      />  
      <div>
      <h4 class="cart-item-name">${item.fields.name}</h4>
      <p class="cart-item-price">$<span>${item.fields.price / 100}</span></p>
      <button class="cart-item-remove-btn" data-id="${id}">remove</button>
      </div>
      <div>
      <button class="cart-item-increase-btn" data-id="${id}">
          <i class="fas fa-chevron-up"></i>
      </button>
      <p class="cart-item-amount" info-id="${id}">1</p>
      <button class="cart-item-decrease-btn" data-id="${id}">
          <i class="fas fa-chevron-down"></i>
      </button>
      </div>
      </article>
      `
    }else {
      let amount = document.querySelector(`[info-id="${id}"]`);
      amount.textContent = parseInt(amount.textContent) + 1;
    }
    // total
    let total = document.querySelector('.cart-total span');
    let prices = document.querySelectorAll('.cart-item-price span');
    prices.forEach((price) => {
        let amount = document.querySelector(`[info-id="${id}"]`);
        total.textContent = parseInt(total.textContent) + parseInt(price.textContent);
    });
    console.log(prices);
    console.log(cartItems.querySelector("span"));
    // add to local storage
    window.localStorage.setItem('cart', JSON.stringify(cartItems.innerHTML));
}

// update cart icon 
export function updateCartIcon() {
    let cartItems = document.querySelector('.cart-items');
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    cartItems.innerHTML = cart;
    let cartITemsAmount = document.querySelectorAll('.cart-item-amount');
    let counter = 0;
        cartITemsAmount.forEach((item) => {
        counter += parseInt(item.textContent);
        })
    let cartItemCounter = document.querySelector('.cart-item-count');
    cartItemCounter.innerHTML = counter;
  }

// filter products
export function filterProducts(company) {
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
export function searchProducts(term) {
    let products = document.querySelectorAll('.product');
    products.forEach((product) => {
        const title = product.children[1].children[0].innerText.toLowerCase();
        if (title.indexOf(term) != -1) {
            product.style.display = "grid";
        }else {
            product.style.display = "none";
        }
    });
  }

// function when we reload the page
export function reloadPage() {
window.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
  });
}

// function when we click on the cart icon
export function cartIconClick() {
    let cartOverlay = document.querySelector('.cart-overlay');
    cartOverlay.classList.add('show');
}