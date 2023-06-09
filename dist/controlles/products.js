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
const slugify_1 = __importDefault(require("slugify"));
const product_model_1 = __importDefault(require("../models/product.model"));
const ApiFeatures_1 = __importDefault(require("../utls/ApiFeatures"));
class Product {
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                req.body.imgCover = req.files.imgCover[0].filename;
                req.body.images = req.files.imgs.map((obj) => obj.filename);
                req.body.slug = (0, slugify_1.default)(req.body.title);
                let result = new product_model_1.default(req.body);
                yield result.save();
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                if (req.body.title)
                    req.body.slug = (0, slugify_1.default)(req.body.title);
                const Product = yield product_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
                if (!Product)
                    return next(new ApiErrors_1.AppError('Product not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const Product = yield product_model_1.default.findByIdAndDelete(id, { new: true });
                if (!Product)
                    return next(new ApiErrors_1.AppError('Product not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                let length = (yield product_model_1.default.find()).length;
                let apiFeatures = new ApiFeatures_1.default(product_model_1.default.find(), req.query)
                    .pagination().search().sort().select().filter();
                const result = yield apiFeatures.mongooseQuery;
                return res.json({ message: "success", currentPage: apiFeatures.page, pagesLength: Math.ceil(length / apiFeatures.pagesLength), result });
            }))(req, res, next);
        });
    }
    getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield product_model_1.default.findById(id);
                if (!result)
                    return next(new ApiErrors_1.AppError('Product not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
}
const product = new Product();
exports.default = product;
