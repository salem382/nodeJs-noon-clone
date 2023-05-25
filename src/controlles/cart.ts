import { AppError, catchError } from "../utls/ApiErrors";
import cartModel, {cart} from "../models/cart.model";
import productModel, {product} from "../models/product.model";
import couponModel from "../models/coupon.models";
import totalPrice from "../utls/totalPrice";


class Cart {
 
    async addToCart(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            
            const product:product | null = await productModel.findById(req.body.product_id);
            if (!product) return next(new AppError('product not found', 4040));

            const isCartExist:cart | null = await cartModel.findOne({user_id:req.user._id});
            req.body.price = product.price;

            if (!isCartExist) {
                let result = new cartModel({
                    user_id:req.user._id,
                    cart_items:[req.body]
                })
                await result.save();
                totalPrice.calcTotalPrice(result);
                return res.json({message:"success", result});
            }
            let item = isCartExist.cart_items.find(elm => elm.product_id == req.body.product_id);
           
            if (item) {
                item.quantity += 1;
            } else {
                isCartExist.cart_items.push(req.body);    
            }
            totalPrice.calcTotalPrice(isCartExist);
            if (isCartExist.discount) {
                isCartExist.tot_price_after_discount = isCartExist.total_price - (isCartExist.total_price*isCartExist.discount) / 100;
            }
            await isCartExist.save();
            return res.json({message:"success", result:isCartExist});
    })(req, res, next);   
    }
    async setQuantity(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const isCartExist:cart | null = await cartModel.findOne({user_id:req.user._id});
            let item = isCartExist?.cart_items.find(elm => elm.product_id == req.params.id);
            if (!item) return next(new AppError('this item not found', 404));
            item.quantity = req.body.quantity;
            isCartExist && totalPrice.calcTotalPrice(isCartExist);
            if (isCartExist?.discount) {
                isCartExist.tot_price_after_discount = isCartExist.total_price - (isCartExist.total_price*isCartExist.discount) / 100;
            }
            await isCartExist?.save();
            return res.json({message:"success", result:isCartExist?.cart_items});
    })(req, res, next);   
    }

    async removeitemFromCart(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            const isCartExist:cart | null = await cartModel.findOne({user_id:req.user._id});
            const result = await cartModel.findOneAndUpdate({user_id:req.user._id},{  $pull:{ cart_items:{_id:req.params.id} } } , {new:true});
            if (!result) return next(new AppError('item not found', 404));
            isCartExist && totalPrice.calcTotalPrice(isCartExist);
            if (isCartExist?.discount) {
                isCartExist.tot_price_after_discount = isCartExist.total_price - (isCartExist.total_price*isCartExist.discount) / 100;
            }
            await isCartExist?.save();
            return res.json({message:"success", result});
        })(req, res, next);   
    }
    async applyCoupon(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

           const coupon = await couponModel.findOne({code:req.body.code, expire:{$gt:Date.now()}});
           if (!coupon) return next(new AppError("this coupon not found", 404));
           let cart = await cartModel.findOne({user_id:req.user._id});
           if (!cart) return next(new AppError("you don't have cart", 404));
           cart.tot_price_after_discount = cart.total_price - (cart.total_price*coupon.discount) / 100;
           cart.discount = coupon.discount;
           cart.save();
           return res.json({message:"success", cart});
        })(req, res, next);   
    }
    async getCart(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const isCartExist:cart | null = await cartModel.findOne({user_id:req.user._id}).populate("cart_items.product_id");
            if (!isCartExist) return next(new AppError('no cart found', 404));
            return res.json({message:"success", result:isCartExist});
    })(req, res, next);   
    }
}

const cart:Cart = new Cart();

export default cart;

