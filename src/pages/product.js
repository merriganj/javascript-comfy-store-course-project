// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement } from '../utils.js';
import { store, setupStore } from './store.js';

// selects
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const urlID = window.location.search;
  console.log(urlUD);
  console.log(store);

  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);

    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();

      console.log(product);

      // grab data
      const { id, fields } = product;
      productID = id;

      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url;

      //set data
      document.title = `${name} | CarTrawler`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;

      //color
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
    <h3 class="error"> sorry, something went wrong</h3>
    <a href="index.html" class="btn"> back home</a>
    </div>
    `;
    }
  } catch (error) {
    console.log(error);
  }

  loading.style.display = 'none';
});

cartBtn.addEventListener('click', function () {
  // addToCart(productID);
  console.log(productID);
});
