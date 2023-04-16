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
const baseFunction_1 = require("../utls/baseFunction");
const user_models_1 = __importDefault(require("../models/user.models"));
class Auth {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { email } = req.body;
                const user = yield user_models_1.default.findOne({ email });
                if (user)
                    return next(new ApiErrors_1.AppError('user already exist use another email', 409));
                let result = new user_models_1.default(req.body);
                yield result.save();
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { email, password } = req.body;
                const user = yield user_models_1.default.findOne({ email });
                if (!user || !(yield (0, baseFunction_1.verifyPassword)(password, user === null || user === void 0 ? void 0 : user.password)))
                    return next(new ApiErrors_1.AppError('incorect email or password', 401));
                const token = (0, baseFunction_1.generateToken)({ id: user._id, name: user.name, role: user.role, status: user.isActive });
                return res.json({ message: "success", token });
            }))(req, res, next);
        });
    }
}
const auth = new Auth();
exports.default = auth;
