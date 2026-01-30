import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess();
checkout.init();
