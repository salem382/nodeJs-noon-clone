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
class SubCategory {
    addSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { name, categoryId } = req.body;
                yield subCategory_model_1.default.insertMany({ name, slug: (0, slugify_1.default)(name), categoryId });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const { name } = req.body;
                const cat = yield subCategory_model_1.default.findByIdAndUpdate(id, { name }, { new: true });
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
                const { categoryId } = req.params;
                let filter = {};
                if (categoryId)
                    filter = req.params;
                const result = yield subCategory_model_1.default.find(filter);
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
    getSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const result = yield subCategory_model_1.default.findById(id);
                if (!result)
                    return next(new ApiErrors_1.AppError('category not found', 404));
                return res.json({ message: "success", result });
            }))(req, res, next);
        });
    }
}
const subCategory = new SubCategory();
exports.default = subCategory;
