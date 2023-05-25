import  express  from "express";
import review from "../controlles/review";
import {idValidation} from "../validation/global.validation";
import validation from "../middleware/validation";
import { protectRoute, allowedTo } from "../middleware/protectRoute";
import { addReview, updateReview, reviewId } from "../validation/review.validation";
import coupon from "../controlles/coupon";

const couponRouter = express.Router();


couponRouter.route('/')
    .post(protectRoute, allowedTo('admin') ,coupon.addCoupon)
    .get(protectRoute,allowedTo('admin'), coupon.getAllCoupon);

couponRouter.route('/:id')
    .put(protectRoute, allowedTo('admin'),  coupon.updateCoupon)
    .delete(protectRoute, allowedTo('admin'), coupon.deleteCoupon)
    .get(protectRoute, allowedTo('admin', 'customer'), coupon.getCoupon)

export default couponRouter;