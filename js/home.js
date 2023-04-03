// get the products
import  {getProducts} from './get_products.js';

let productUrl = 'https://course-api.com/javascript-store-products';
let featureCenter = document.querySelector('.featured-center');

// display 3 products
const displayProducts = async () => {
  try {
    let products = await getProducts(productUrl);
    products = products.map((product) => {
        return `
        <article class="product">
        <div class="product-container">
          <img src="${product.fields.image[0].url}" class="product-img img" alt=""/>
          <div class="product-icons">
            <a href="product_details.html?id=${product.id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="1">
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
  } catch (error) {
    console.log(error);
    featureCenter.innerHTML = `<center><h3 class="error">There was an error...</h3></center>`;
  }

}
// display products
displayProducts();



