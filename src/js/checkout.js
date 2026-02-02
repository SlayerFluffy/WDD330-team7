import { loadHeaderFooter, alertMessage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess('so-cart', '#order-summary');
checkout.init();

document.querySelector("#zip").addEventListener("blur", checkout.calculateOrderSummary.bind(checkout));

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status)
        checkout.checkout();
});