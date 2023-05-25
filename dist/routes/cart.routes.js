"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../middleware/protectRoute");
const cart_1 = __importDefault(require("../controlles/cart"));
const cartRouter = express_1.default.Router();
cartRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), cart_1.default.addToCart)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), cart_1.default.getCart);
cartRouter.route('/applyCouopn').post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), cart_1.default.applyCoupon);
cartRouter.route('/:id')
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer', 'admin'), cart_1.default.removeitemFromCart)
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer', 'admin'), cart_1.default.setQuantity);
exports.default = cartRouter;
