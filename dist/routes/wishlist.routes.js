"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../middleware/protectRoute");
const wishlist_1 = __importDefault(require("../controlles/wishlist"));
const wishlistRouter = express_1.default.Router();
wishlistRouter.route('/')
    .patch(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), wishlist_1.default.addWishlist)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), wishlist_1.default.removeWishlist)
    .get(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('customer'), wishlist_1.default.getAllWishlist);
exports.default = wishlistRouter;
