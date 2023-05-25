import  express  from "express";
import { protectRoute, allowedTo } from "../middleware/protectRoute";
import adresses from "../controlles/adresses";

const addressesRouter = express.Router();



addressesRouter.route('/')
    .patch(protectRoute, allowedTo('customer') ,adresses.addAdrees)
    .delete(protectRoute, allowedTo('customer') ,adresses.removeAdress)
    .get(protectRoute, allowedTo('customer') ,adresses.getAllAdresees)


export default addressesRouter;