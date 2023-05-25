"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameAndIdValidation = exports.nameValidation = exports.idValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.idValidation = joi_1.default.object({ id: joi_1.default.string().hex().length(24).required()
});
exports.nameValidation = joi_1.default.object({
    name: joi_1.default.string().min(2).max(25).required()
});
exports.nameAndIdValidation = joi_1.default.object({
    name: joi_1.default.string().min(2).max(25)
});
