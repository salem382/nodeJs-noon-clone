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
const ApiFeatures_1 = __importDefault(require("../utls/ApiFeatures"));
class User {
    addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { email } = req.body;
                const user = yield user_models_1.default.findOne({ email });
                if (user)
                    return next(new ApiErrors_1.AppError('user already exist use another email', 409));
                req.body.profilePic = req.file.filename;
                let result = new user_models_1.default(req.body);
                yield result.save();
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const { name, role } = req.body;
                if (name == '' || role == '')
                    return next(new ApiErrors_1.AppError('user variables not allow to be empty', 409));
                const User = yield user_models_1.default.findByIdAndUpdate(id, { name, role, profilePic: req.file.filename }, { new: true });
                if (!User)
                    return next(new ApiErrors_1.AppError('User not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const User = yield user_models_1.default.findByIdAndDelete(id, { new: true });
                if (!User)
                    return next(new ApiErrors_1.AppError('User not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                let length = (yield user_models_1.default.find()).length;
                let apiFeatures = new ApiFeatures_1.default(user_models_1.default.find(), req.query)
                    .pagination().search().sort().select().filter();
                let result = yield apiFeatures.mongooseQuery;
                result.forEach((user) => user.password = '');
                return res.json({ message: "success", currentPage: apiFeatures.page, pagesLength: Math.ceil(length / apiFeatures.pagesLength), result });
            }))(req, res, next);
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield user_models_1.default.findById(id);
                if (!result)
                    return next(new ApiErrors_1.AppError('User not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield user_models_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
                if (!result)
                    return next(new ApiErrors_1.AppError('User not found', 404));
                result.passwordChangedAt = new Date();
                yield result.save();
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
}
const user = new User();
exports.default = user;
