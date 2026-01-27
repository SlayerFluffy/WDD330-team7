import { loadHeaderFooter, getLocalStorage, setLocalStorage } from './utils.mjs';

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

    addRemoveListeners();
}

function calculateTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    let total = amounts.reduce((sum, item) => sum + item, 0);
    return total;
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
        <button class="cart-card__remove" data-id="${item.Id}" title="Remove item from cart">&times;</button>
        <a href="#" class="cart-card__image">
            <img
            src="${item.Images.PrimaryMedium}"
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

function removeFromCart(productId) {
    let cartItems = getLocalStorage('so-cart') || [];
    
    const updatedCart = cartItems.filter(item => item.Id !== productId);
    
    setLocalStorage('so-cart', updatedCart);

    renderCartContents();
}

function addRemoveListeners() {
    const removeButtons = document.querySelectorAll('.cart-card__remove');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

renderCartContents();