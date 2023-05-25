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
const subCategory_model_1 = __importDefault(require("../models/subCategory.model"));
const ApiFeatures_1 = __importDefault(require("../utls/ApiFeatures"));
class SubCategory {
    addSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { name, categoryId } = req.body;
                let result = new subCategory_model_1.default({ name, slug: (0, slugify_1.default)(name), categoryId });
                yield result.save();
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const { name, categoryId } = req.body;
                const cat = yield subCategory_model_1.default.findByIdAndUpdate(id, { name, slug: (0, slugify_1.default)(name), categoryId }, { new: true });
                if (!cat)
                    return next(new ApiErrors_1.AppError('sub category not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const cat = yield subCategory_model_1.default.findByIdAndDelete(id, { new: true });
                if (!cat)
                    return next(new ApiErrors_1.AppError('category not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                let length = (yield subCategory_model_1.default.find()).length;
                let apiFeatures = new ApiFeatures_1.default(subCategory_model_1.default.find(), req.query)
                    .pagination().search().sort().select().filter();
                let result = yield apiFeatures.mongooseQuery.populate('categoryId', 'name -_id');
                return res.json({ message: "success", currentPage: apiFeatures.page, pagesLength: Math.ceil(length / apiFeatures.pagesLength), result });
            }))(req, res, next);
        });
    }
    getSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield subCategory_model_1.default.findById(id).populate('categoryId');
                if (!result)
                    return next(new ApiErrors_1.AppError('category not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
}
const subCategory = new SubCategory();
exports.default = subCategory;
