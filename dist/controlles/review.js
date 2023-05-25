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
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
class Review {
    addReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const isReview = yield reviewModel_1.default.findOne({ user: req.user._id, product: req.body.product });
                if (isReview)
                    return next(new ApiErrors_1.AppError('you can only review for one time', 409));
                let result = new reviewModel_1.default(req.body);
                yield result.save();
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield reviewModel_1.default.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('Review not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield reviewModel_1.default.findOneAndDelete({ _id: id, user: req.user._id }, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('Review not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { productId } = req.body;
                const result = yield reviewModel_1.default.find({ product: productId });
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    getReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield reviewModel_1.default.findById(id);
                if (!result)
                    return next(new ApiErrors_1.AppError('Review not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
}
const review = new Review();
exports.default = review;
