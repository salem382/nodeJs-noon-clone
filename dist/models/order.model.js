"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var payment;
(function (payment) {
    payment["cash"] = "cash";
    payment["card"] = "card";
})(payment || (payment = {}));
const orderSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    cart_items: [
        {
            product_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "product" },
            quantity: { type: Number },
            price: { type: Number }
        }
    ],
    total_order_price: { type: Number },
    shipping_address: {
        street: String,
        city: String,
        phone: String
    },
    payment_method: {
        type: String,
        enum: Object.values(payment),
        default: payment.cash
    },
    isPaid: { type: Boolean, default: false },
    isDelevered: { type: Boolean, default: false },
    paidAt: Date,
    delivredAt: Date
}, { timestamps: true });
const orderModel = mongoose_1.default.model('order', orderSchema);
exports.default = orderModel;
