"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var roleStatus;
(function (roleStatus) {
    roleStatus["customer"] = "customer";
    roleStatus["admin"] = "admin";
})(roleStatus || (roleStatus = {}));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: [2, 'too short category name'],
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        minlength: [2, 'too short category name'],
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: [2, 'too short category name'],
        required: true,
    },
    profilePic: String,
    role: {
        type: String,
        enum: Object.values(roleStatus),
        default: roleStatus.customer
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
