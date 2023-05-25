"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = require("../utls/ApiErrors");
const cart_model_1 = __importDefault(require("../models/cart.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const coupon_models_1 = __importDefault(require("../models/coupon.models"));
const totalPrice_1 = __importDefault(require("../utls/totalPrice"));
class Cart {
    addToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const product = yield product_model_1.default.findById(req.body.product_id);
                if (!product)
                    return next(new ApiErrors_1.AppError('product not found', 4040));
                const isCartExist = yield cart_model_1.default.findOne({ user_id: req.user._id });
                req.body.price = product.price;
                if (!isCartExist) {
                    let result = new cart_model_1.default({
                        user_id: req.user._id,
                        cart_items: [req.body]
                    });
                    yield result.save();
                    totalPrice_1.default.calcTotalPrice(result);
                    return res.json({ message: "success", result });
                }
                let item = isCartExist.cart_items.find(elm => elm.product_id == req.body.product_id);
                if (item) {
                    item.quantity += 1;
                }
                else {
                    isCartExist.cart_items.push(req.body);
                }
                totalPrice_1.default.calcTotalPrice(isCartExist);
                if (isCartExist.discount) {
                    isCartExist.tot_price_after_discount = isCartExist.total_price - (isCartExist.total_price * isCartExist.discount) / 100;
                }
                yield isCartExist.save();
                return res.json({ message: "success", result: isCartExist });
            }))(req, res, next);
        });
    }
    setQuantity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const isCartExist = yield cart_model_1.default.findOne({ user_id: req.user._id });
                let item = isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.cart_items.find(elm => elm.product_id == req.params.id);
                if (!item)
                    return next(new ApiErrors_1.AppError('this item not found', 404));
                item.quantity = req.body.quantity;
                isCartExist && totalPrice_1.default.calcTotalPrice(isCartExist);
                if (isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.discount) {
                    isCartExist.tot_price_after_discount = isCartExist.total_price - (isCartExist.total_price * isCartExist.discount) / 100;
                }
                yield (isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.save());
                return res.json({ message: "success", result: isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.cart_items });
            }))(req, res, next);
        });
    }
    removeitemFromCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const isCartExist = yield cart_model_1.default.findOne({ user_id: req.user._id });
                const result = yield cart_model_1.default.findOneAndUpdate({ user_id: req.user._id }, { $pull: { cart_items: { _id: req.params.id } } }, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('item not found', 404));
                isCartExist && totalPrice_1.default.calcTotalPrice(isCartExist);
                if (isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.discount) {
                    isCartExist.tot_price_after_discount = isCartExist.total_price - (isCartExist.total_price * isCartExist.discount) / 100;
                }
                yield (isCartExist === null || isCartExist === void 0 ? void 0 : isCartExist.save());
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    applyCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const coupon = yield coupon_models_1.default.findOne({ code: req.body.code, expire: { $gt: Date.now() } });
                if (!coupon)
                    return next(new ApiErrors_1.AppError("this coupon not found", 404));
                let cart = yield cart_model_1.default.findOne({ user_id: req.user._id });
                if (!cart)
                    return next(new ApiErrors_1.AppError("you don't have cart", 404));
                cart.tot_price_after_discount = cart.total_price - (cart.total_price * coupon.discount) / 100;
                cart.discount = coupon.discount;
                cart.save();
                return res.json({ message: "success", cart });
            }))(req, res, next);
        });
    }
    getCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const isCartExist = yield cart_model_1.default.findOne({ user_id: req.user._id }).populate("cart_items.product_id");
                if (!isCartExist)
                    return next(new ApiErrors_1.AppError('no cart found', 404));
                return res.json({ message: "success", result: isCartExist });
            }))(req, res, next);
        });
    }
}
const cart = new Cart();
exports.default = cart;
