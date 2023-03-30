"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    coupont: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'comment is required']
    },
    discount: {
        type: Number,
        min: 0,
        required: [true, 'coupon discount is required']
    },
    expire: {
        type: Date,
        required: [true, 'coupon date is required']
    }
}, { timestamps: true });
const couponModel = mongoose_1.default.model('coupon', couponSchema);
exports.default = couponModel;
