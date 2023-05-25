"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../middleware/protectRoute");
const coupon_1 = __importDefault(require("../controlles/coupon"));
const couponRouter = express_1.default.Router();
couponRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), coupon_1.default.addCoupon)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), coupon_1.default.getAllCoupon);
couponRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), coupon_1.default.updateCoupon)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), coupon_1.default.deleteCoupon)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin', 'customer'), coupon_1.default.getCoupon);
exports.default = couponRouter;
