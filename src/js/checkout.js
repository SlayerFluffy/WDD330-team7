import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess('so-cart', '#order-summary');
checkout.init();

document.querySelector("#zip").addEventListener("blur", checkout.calculateOrderSummary.bind(checkout));

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    checkout.checkout();
});