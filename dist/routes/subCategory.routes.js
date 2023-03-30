"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategory_1 = __importDefault(require("../controlles/subCategory"));
const SubcategoryRouter = express_1.default.Router({ mergeParams: true });
SubcategoryRouter.route('/').post(subCategory_1.default.addSubCategory).get(subCategory_1.default.getAllSubCategory);
SubcategoryRouter.route('/:id')
    .put(subCategory_1.default.updateSubCategory)
    .delete(subCategory_1.default.deleteSubCategory)
    .get(subCategory_1.default.getSubCategory);
exports.default = SubcategoryRouter;
