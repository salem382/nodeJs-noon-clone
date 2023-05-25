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
const user_models_1 = __importDefault(require("../models/user.models"));
class Adresses {
    addAdrees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const result = yield user_models_1.default.findByIdAndUpdate(req.user._id, { $addToSet: { adresses: req.body } }, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('user not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    removeAdress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { adress_id } = req.body;
                const result = yield user_models_1.default.findByIdAndUpdate(req.user._id, { $pull: { adresses: { _id: adress_id } } }, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('user not found', 404));
                return res.json({ message: "success", result: result.adresses });
            }))(req, res, next);
        });
    }
    getAllAdresees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const result = yield user_models_1.default.findById(req.user._id);
                if (!result)
                    return next(new ApiErrors_1.AppError('user not found', 404));
                return res.json({ message: "success", result: result.adresses });
            }))(req, res, next);
        });
    }
}
const adresses = new Adresses();
exports.default = adresses;
