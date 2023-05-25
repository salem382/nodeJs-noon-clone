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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
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
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    ratingAvg: {
        type: Number,
        min: [1, 'reating avg must be greater than 1'],
        max: [5, 'rating avg must be less than 5']
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        minlength: [5, 'too short desc name'],
        maxlength: [300, 'desc must be less than 300 chracter'],
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        required: [true, 'quzntity is required']
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    imgCover: String,
    images: [String],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'category is required']
    },
    subCategoty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: [true, 'sub Category is required']
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'brand',
        required: [true, 'brand is required']
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
productSchema.post('init', (doc) => {
    doc.imgCover = 'http://localhost:5000/product/' + doc.imgCover;
    doc.images = doc.images.map(obj => 'http://localhost:5000/product/' + obj);
});
productSchema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
});
productSchema.pre(/^find/, function () {
    this.populate('myReviews');
});
const productModel = mongoose_1.default.model('product', productSchema);
exports.default = productModel;
