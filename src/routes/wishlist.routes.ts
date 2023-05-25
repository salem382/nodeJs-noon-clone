import  express  from "express";
import { protectRoute, allowedTo } from "../middleware/protectRoute";
import wishlist from "../controlles/wishlist";

const wishlistRouter = express.Router();



wishlistRouter.route('/')
    .patch(protectRoute, allowedTo('customer') ,wishlist.addWishlist)
    .delete(protectRoute, allowedTo('customer') ,wishlist.removeWishlist)
    .get(protectRoute, allowedTo('customer') ,wishlist.getAllWishlist)


export default wishlistRouter;