import  express  from "express";
import { protectRoute, allowedTo } from "../middleware/protectRoute";
import order from "../controlles/order";


const orderRouter = express.Router();


orderRouter.route('/')
    .get(protectRoute, allowedTo('admin') ,order.getAllOrders) 

orderRouter.route('/:id')
    .post(protectRoute, allowedTo('customer') ,order.createOrder)
    .get(protectRoute, allowedTo('customer') ,order.getSpcificOrder)


orderRouter.route('/checkOutSession/:id')
    .post(protectRoute, allowedTo('customer') ,order.createCheckoutSession)


export default orderRouter;