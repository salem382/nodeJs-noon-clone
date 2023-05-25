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
exports.allowedTo = exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiErrors_1 = require("../utls/ApiErrors");
const user_models_1 = __importDefault(require("../models/user.models"));
const protectRoute = (req, res, next) => {
    const token = req.header('token');
    jsonwebtoken_1.default.verify(token, 'myNameIsUser', (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(new ApiErrors_1.AppError(err.message, 401));
        const user = yield user_models_1.default.findById(decode.id);
        if (!user)
            return next(new ApiErrors_1.AppError('invalid token', 401));
        // if (user.passwordChangedAt) {
        //     //if ((user.passwordChangedAt.getTime() / 1000) > decode.iat)  return next(new AppError('invalid token', 401));
        // }
        req.user = user;
        next();
    }));
};
exports.protectRoute = protectRoute;
const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new ApiErrors_1.AppError('you can not do this you are ' + req.user.role, 401));
        next();
    };
};
exports.allowedTo = allowedTo;
