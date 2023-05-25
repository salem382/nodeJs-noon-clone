"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importStar(require("mongoose"));
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
    passwordChangedAt: Date,
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
    },
    wishlist: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'product' }],
    adresses: [{
            city: String,
            street: String,
            phone: String
        }]
}, { timestamps: true });
userSchema.pre('save', function () {
    this.password = bcrypt_1.default.hashSync(this.password, 8);
});
userSchema.post('init', (doc) => {
    doc.profilePic = 'http://localhost:5000/user/' + doc.profilePic;
});
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
