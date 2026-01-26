import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

const dataSource = new ProductData();
const element = document.querySelector('.product-list');
const category = getParam('category');
const productList = new ProductList(category, dataSource, element);

loadHeaderFooter();

productList.init();
