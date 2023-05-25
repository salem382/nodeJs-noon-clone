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
const order_model_1 = __importDefault(require("../models/order.model"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51NBGPBKZf8ffeihT9y6S08QoYFfyctxic3FQNecCTm4rXofSO4lP8UmLQrsMYbcqRQ8TurJ5I6M7hVvW5PBJCWi300buIGSfKE', {
    apiVersion: '2022-11-15',
});
class Order {
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const cart = yield cart_model_1.default.findById(req.params.id);
                if (!cart)
                    return next(new ApiErrors_1.AppError('this cart not found', 404));
                let total_price = cart.tot_price_after_discount ? cart.tot_price_after_discount : cart.total_price;
                let order = new order_model_1.default({
                    user_id: cart.user_id,
                    cart_items: cart.cart_items,
                    total_order_price: total_price,
                    shipping_address: req.body.shipping_address
                });
                yield order.save();
                if (order) {
                    const operations = cart.cart_items.map(item => ({
                        updateOne: {
                            filter: { _id: item.product_id },
                            update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
                        }
                    }));
                    yield product_model_1.default.bulkWrite(operations);
                    yield cart_model_1.default.findByIdAndDelete(req.params.id);
                    return res.json({ message: "success", order });
                }
                return next(new ApiErrors_1.AppError("faild", 500));
            }))(req, res, next);
        });
    }
    getSpcificOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                let orders = yield order_model_1.default.find({ user_id: req.params.id }).populate("cart_items.product_id");
                if (!orders.length)
                    return next(new ApiErrors_1.AppError("no orders found", 404));
                return res.json({ message: "success", orders });
            }))(req, res, next);
        });
    }
    getAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                let orders = yield order_model_1.default.find().populate("cart_items.product_id");
                ;
                if (!orders.length)
                    return next(new ApiErrors_1.AppError("no orders found", 404));
                return res.json({ message: "success", orders });
            }))(req, res, next);
        });
    }
    createCheckoutSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const cart = yield cart_model_1.default.findById(req.params.id);
                if (!cart)
                    return next(new ApiErrors_1.AppError('this cart not found', 404));
                let total_price = cart.tot_price_after_discount ? cart.tot_price_after_discount : cart.total_price;
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'egp',
                                product_data: {
                                    name: req.user.name
                                },
                                unit_amount: total_price * 100, // Amount in cents (e.g., $10.00)
                            },
                            quantity: 1,
                        },
                        // Add more line items as needed
                    ],
                    mode: 'payment',
                    success_url: 'https://example.com/success',
                    cancel_url: 'https://example.com/cancel',
                    customer_email: req.user.email,
                    client_reference_id: req.params.id,
                    metadata: req.body.shipping_address
                });
                return res.json({ message: "success", session });
            }))(req, res, next);
        });
    }
}
const order = new Order();
exports.default = order;
