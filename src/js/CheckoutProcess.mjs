import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor() {
        this.dataSource = getLocalStorage('so-cart');
    }

    async init() {
        await this.displaySubtotal();

        this.zip = document.querySelector("#zip");
        this.zip.addEventListener("input", () => this.calculateOrderSummary(this.subtotal, this.dataSource));

    }

    async displaySubtotal() {
        this.subtotal = this.calculateTotal(this.dataSource);
        document.querySelector("#order-subtotal").value = `$${this.subtotal.toFixed(2)}`;
    }

    calculateOrderSummary(subtotal, dataSource) {
        this.subtotal = subtotal;
        this.tax = this.subtotal * 0.06; // 6% tax
        this.shipping = 10 + ((dataSource.length - 1) * 2);
        this.total = this.subtotal + this.tax + this.shipping;

        document.querySelector('#order-tax').value = `$${this.tax.toFixed(2)}`;
        document.querySelector('#order-shipping').value = `$${this.shipping.toFixed(2)}`;
        document.querySelector('#order-total').value = `$${this.total.toFixed(2)}`;
    }

    calculateTotal(list) {
        const amounts = list.map((item) => item.FinalPrice);
        const total = amounts.reduce((sum, item) => sum + item, 0);
        return total;
    }
}