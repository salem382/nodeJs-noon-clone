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
const brand_model_1 = __importDefault(require("../models/brand.model"));
const ApiFeatures_1 = __importDefault(require("../utls/ApiFeatures"));
class Brand {
    addBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                req.body.slug = (0, slugify_1.default)(req.body.name);
                req.body.logo = req.file.filename;
                let result = new brand_model_1.default(req.body);
                yield result.save();
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                req.body.slug = (0, slugify_1.default)(req.body.name);
                req.body.logo = req.file.filename;
                const brand = yield brand_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
                if (!brand)
                    return next(new ApiErrors_1.AppError('brand not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const brand = yield brand_model_1.default.findByIdAndDelete(id, { new: true });
                if (!brand)
                    return next(new ApiErrors_1.AppError('Brand not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllBrands(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                let length = (yield brand_model_1.default.find()).length;
                let apiFeatures = new ApiFeatures_1.default(brand_model_1.default.find(), req.query)
                    .pagination().search().sort().select().filter();
                let result = yield apiFeatures.mongooseQuery;
                return res.json({ message: "success", currentPage: apiFeatures.page, pagesLength: Math.ceil(length / apiFeatures.pagesLength), result });
            }))(req, res, next);
        });
    }
    getBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield brand_model_1.default.findById(id);
                if (!result)
                    return next(new ApiErrors_1.AppError('Brand not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
}
const brand = new Brand();
exports.default = brand;
