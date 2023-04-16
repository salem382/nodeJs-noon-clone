"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controlles/auth"));
const authRouter = express_1.default.Router();
authRouter.post('/signup', auth_1.default.signUp);
authRouter.post('/signin', auth_1.default.signIn);
exports.default = authRouter;
