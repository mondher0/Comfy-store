// get the products
import  {getProducts} from './get_products.js';

let productUrl = 'https://course-api.com/javascript-store-products';
let featureCenter = document.querySelector('.featured-center');

// display 3 products
const displayProducts = async () => {
    let products = await getProducts(productUrl);
    products = products.map((product) => {
        return `
        <article class="product">
        <div class="product-container">
          <img src="${product.fields.image[0].url}" class="product-img img" alt=""/>
          <div class="product-icons">
            <a href="product.html?id=1" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="1">
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
    products = products.slice(0, 3);
    featureCenter.innerHTML = products.join('');
}
// display products
displayProducts();



