import { AppError, catchError } from "../utls/ApiErrors";
import cartModel, {cart} from "../models/cart.model";
import productModel, {product} from "../models/product.model";
import couponModel from "../models/coupon.models";
import totalPrice from "../utls/totalPrice";
import orderModel, { order } from "../models/order.model";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NBGPBKZf8ffeihT9y6S08QoYFfyctxic3FQNecCTm4rXofSO4lP8UmLQrsMYbcqRQ8TurJ5I6M7hVvW5PBJCWi300buIGSfKE', {
    apiVersion: '2022-11-15',
});


class Order {
 
    async createOrder(req:any, res:any, next:any):Promise<void> {catchError(async (req:any, res:any, next:any) => {
            
        const cart:cart | null = await cartModel.findById(req.params.id)
        if (!cart) return next(new AppError('this cart not found', 404));

        let total_price:number = cart.tot_price_after_discount ?cart.tot_price_after_discount: cart.total_price; 

        let order = new orderModel({
            user_id:cart.user_id,
            cart_items:cart.cart_items,
            total_order_price:total_price,
            shipping_address:req.body.shipping_address  
        })
        await order.save();

        if (order) {

            const operations = cart.cart_items.map(item => ({
                updateOne: {
                  filter: {_id:item.product_id},
                  update: {$inc: {quantity: -item.quantity, sold:item.quantity}}
                }
              }));
    
            await productModel.bulkWrite(operations)
    
            await cartModel.findByIdAndDelete(req.params.id);
    
    
            return res.json({message:"success", order})
        }
        return next(new AppError("faild", 500));

    })(req, res, next)}

    async getSpcificOrder(req:any, res:any, next:any):Promise<void> {catchError(async (req:any, res:any, next:any) => {
        
        let orders:order[] | null = await orderModel.find({user_id:req.params.id}).populate("cart_items.product_id");
        if (!orders.length) return next(new AppError("no orders found", 404))
        return res.json({message:"success", orders})

    })(req, res, next)}

    async getAllOrders(req:any, res:any, next:any):Promise<void> {catchError(async (req:any, res:any, next:any) => {
        
        let orders:order[] | null = await orderModel.find().populate("cart_items.product_id");;
        if (!orders.length) return next(new AppError("no orders found", 404))
        return res.json({message:"success", orders})
    })(req, res, next)}
    async createCheckoutSession(req:any, res:any, next:any):Promise<void> {catchError(async (req:any, res:any, next:any) => {
        
        const cart:cart | null = await cartModel.findById(req.params.id)
        if (!cart) return next(new AppError('this cart not found', 404));

        let total_price:number = cart.tot_price_after_discount ?cart.tot_price_after_discount: cart.total_price; 

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'egp',
                  product_data: {
                    name: req.user.name
                  },
                  unit_amount: total_price * 100, // Amount in cents (e.g., $10.00)
                },
                quantity: 1,
              },
              // Add more line items as needed
            ],
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            customer_email:req.user.email,
            client_reference_id:req.params.id,
            metadata:req.body.shipping_address
          });

          return res.json({message:"success", session});
    })(req, res, next)}
}

const order:Order = new Order();

export default order;

