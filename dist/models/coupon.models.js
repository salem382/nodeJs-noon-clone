"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    discount: {
        type: Number,
        required: true
    },
    expire: {
        type: Date,
        required: true
    }
}, { timestamps: true });
const couponModel = mongoose_1.default.model('coup', couponSchema);
exports.default = couponModel;
