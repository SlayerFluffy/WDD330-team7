import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices();
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
// Pass category to the product details for proper rendering
product.category = category;
product.init();
