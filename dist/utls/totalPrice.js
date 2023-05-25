"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TotalPrice {
    calcTotalPrice(Cart) {
        console.log("donnnne");
        let total_price = 0;
        Cart.cart_items.forEach(elm => {
            let price = 0;
            price = elm.quantity * elm.price;
            total_price += price;
        });
        Cart.total_price = total_price;
        console.log(Cart);
    }
}
const totalPrice = new TotalPrice();
exports.default = totalPrice;
