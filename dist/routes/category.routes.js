"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../controlles/category"));
const subCategory_routes_1 = __importDefault(require("./subCategory.routes"));
const categoryRouter = express_1.default.Router();
categoryRouter.use('/:categoryId/subcategory', subCategory_routes_1.default);
categoryRouter.route('/').post(category_1.default.addCategory).get(category_1.default.getAllCategory);
categoryRouter.route('/:id')
    .put(category_1.default.updateCategory)
    .delete(category_1.default.deleteCategory)
    .get(category_1.default.getCategory);
exports.default = categoryRouter;
