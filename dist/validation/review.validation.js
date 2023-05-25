"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewId = exports.updateReview = exports.addReview = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addReview = joi_1.default.object({
    comment: joi_1.default.string().min(2).max(50).required(),
    user: joi_1.default.string().hex().length(24).required(),
    product: joi_1.default.string().hex().length(24).required(),
    rate: joi_1.default.number().min(1).max(5).required()
});
exports.updateReview = joi_1.default.object({
    comment: joi_1.default.string().min(2).max(50),
    user: joi_1.default.string().hex().length(24),
    product: joi_1.default.string().hex().length(24),
    rate: joi_1.default.number().min(1).max(5),
    id: joi_1.default.string().hex().length(24).required()
});
exports.reviewId = joi_1.default.object({
    productId: joi_1.default.string().hex().length(24).required()
});
