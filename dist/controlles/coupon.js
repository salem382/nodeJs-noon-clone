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
const coupon_models_1 = __importDefault(require("../models/coupon.models"));
const qrcode_1 = __importDefault(require("qrcode"));
class Coupon {
    addCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                let result = new coupon_models_1.default(req.body);
                yield result.save();
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    updateCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield coupon_models_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('Coupon not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield coupon_models_1.default.findOneAndDelete({ _id: id }, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('Coupon not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const result = yield coupon_models_1.default.find();
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    getCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield coupon_models_1.default.findById(id);
                if (!result)
                    return next(new ApiErrors_1.AppError('Coupon not found', 404));
                let url = yield qrcode_1.default.toDataURL(result.code);
                return res.json({ message: "success", result, url });
            }))(req, res, next);
        });
    }
}
const coupon = new Coupon();
exports.default = coupon;
