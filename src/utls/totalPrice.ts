import { cart } from "../models/cart.model";

class TotalPrice {

    calcTotalPrice (Cart:cart) {

         console.log ("donnnne")   
        let total_price = 0;

        Cart.cart_items.forEach(elm => {

            let price = 0;
            price = elm.quantity * elm.price;
            total_price+= price;
        })
        Cart.total_price = total_price;
        console.log (Cart)
    }
}

const totalPrice:TotalPrice = new TotalPrice();
export default totalPrice;