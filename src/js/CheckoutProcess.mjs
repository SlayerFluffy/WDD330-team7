import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    async init() {
        this.list = getLocalStorage(this.key);
        this.calculateSubtotal();
    }

    calculateSubtotal() {
        const amounts = this.list.map((item) => item.FinalPrice);
        this.subtotal = amounts.reduce((sum, item) => sum + item, 0);
        document.querySelector("#subtotal").innerHTML = `$${this.subtotal.toFixed(2)}`;
    }

    calculateOrderSummary() {
        this.tax = this.subtotal * 0.06; // 6% tax
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.orderTotal = this.subtotal + this.tax + this.shipping;

        this.displayOrderSummary()
    }

    displayOrderSummary() {
        document.querySelector('#tax').innerText = `$${this.tax.toFixed(2)}`;
        document.querySelector('#shipping').innerText = `$${this.shipping.toFixed(2)}`;
        document.querySelector('#orderTotal').innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["orderForm"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();;
        order.items = packageItems(this.list);
        order.orderTotal = this.orderTotal;
        order.shipping = this.shipping;
        order.tax = this.tax;
        console.log(order);

        try {
            const response = await services.checkout(order);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    
    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const packedItems = items.map((item) => {
        const simpleItem = { id: item.Id, name: item.Name, price: item.FinalPrice, quantity: 1 };
        return simpleItem;
    });
    return packedItems;
}