import { renderListWithTemplate } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const cartItems = this.getCartContents();
    this.renderCartContents(cartItems);
    if (cartItems && cartItems.length > 0) {
      this.calculateListTotal(cartItems);
    }
  }

  getCartContents() {
    return getLocalStorage(this.key);
  }

  renderCartContents(items) {
    const parentElement = document.querySelector(this.parentSelector);
    
    if (!items || items.length === 0) {
      parentElement.innerHTML = '<p>Your cart is empty</p>';
      return;
    }

    // Clear the parent element and render the cart items
    renderListWithTemplate(cartItemTemplate, parentElement, items, 'afterbegin', true);

    // Show the cart footer
    document.querySelector('.hide')?.classList.remove('hide');
  }

  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item, 0);
    this.displayCartTotal();
  }

  displayCartTotal() {
    const cartTotalElement = document.querySelector('.cart-total');
    if (cartTotalElement) {
      cartTotalElement.innerHTML = `Total: $${this.total.toFixed(2)}`;
    }
  }
}