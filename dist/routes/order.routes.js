"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../middleware/protectRoute");
const order_1 = __importDefault(require("../controlles/order"));
const orderRouter = express_1.default.Router();
orderRouter.route('/')
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), order_1.default.getAllOrders);
orderRouter.route('/:id')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), order_1.default.createOrder)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), order_1.default.getSpcificOrder);
orderRouter.route('/checkOutSession/:id')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), order_1.default.createCheckoutSession);
exports.default = orderRouter;
