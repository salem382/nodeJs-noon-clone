"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        minlength: [2, 'too short category name'],
        required: true,
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String
}, { timestamps: true });
const brandModel = mongoose_1.default.model('brand', brandSchema);
exports.default = brandModel;
