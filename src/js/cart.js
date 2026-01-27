import { loadHeaderFooter, getLocalStorage } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
    const cartItems = getLocalStorage('so-cart');

    if (!cartItems|| cartItems.length === 0) {
        document.querySelector('.product-list').innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    const htmlTemplate = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlTemplate.join('');

    document.querySelector('.hide')?.classList.remove('hide');

    document.querySelector('.cart-total').innerHTML = `Total: $${calculateTotal(cartItems).toFixed(2)}`;
}

function calculateTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    let total = amounts.reduce((sum, item) => sum + item, 0);
    return total;
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
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
        <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
    </li>`;

    return newItem;
}

renderCartContents();