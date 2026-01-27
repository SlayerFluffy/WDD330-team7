import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
// Pass category to the product details for proper rendering
product.category = category;
product.init();
