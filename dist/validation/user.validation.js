"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.addUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addUser = joi_1.default.object({
    name: joi_1.default.string().min(2).max(25).required(),
    email: joi_1.default.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } }).required(),
    password: joi_1.default.string().required()
});
exports.updateUser = joi_1.default.object({
    id: joi_1.default.string().hex().length(24),
    name: joi_1.default.string().min(2).max(25),
    email: joi_1.default.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } })
});
