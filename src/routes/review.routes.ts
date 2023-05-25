import  express  from "express";
import review from "../controlles/review";
import {idValidation} from "../validation/global.validation";
import validation from "../middleware/validation";
import { protectRoute, allowedTo } from "../middleware/protectRoute";
import { addReview, updateReview, reviewId } from "../validation/review.validation";

const reviewRouter = express.Router();



reviewRouter.route('/')
    .post(protectRoute, allowedTo('customer') ,validation(addReview),review.addReview)
    .get(validation(reviewId),review.getAllReview);

reviewRouter.route('/:id')
    .put(protectRoute, allowedTo('customer') , validation(updateReview),review.updateReview)
    .delete(protectRoute, allowedTo('admin', 'customer') ,validation(idValidation), review.deleteReview)
    .get(validation(idValidation), review.getReview)

export default reviewRouter;