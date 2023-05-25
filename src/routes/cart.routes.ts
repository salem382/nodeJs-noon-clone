import  express  from "express";
import review from "../controlles/review";
import {idValidation} from "../validation/global.validation";
import validation from "../middleware/validation";
import { protectRoute, allowedTo } from "../middleware/protectRoute";
import { addReview, updateReview, reviewId } from "../validation/review.validation";
import cart from "../controlles/cart";


const cartRouter = express.Router();


cartRouter.route('/')
    .post(protectRoute, allowedTo('customer') ,cart.addToCart)
    .get(protectRoute, allowedTo('customer') ,cart.getCart) 
cartRouter.route('/applyCouopn').post(protectRoute, allowedTo('customer'),cart.applyCoupon)    
cartRouter.route('/:id')
    .delete(protectRoute, allowedTo('customer', 'admin') ,cart.removeitemFromCart)
    .post(protectRoute, allowedTo('customer', 'admin') ,cart.setQuantity)
    


export default cartRouter;