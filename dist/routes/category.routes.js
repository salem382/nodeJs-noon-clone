"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../controlles/category"));
const subCategory_routes_1 = __importDefault(require("./subCategory.routes"));
const validation_1 = __importDefault(require("../middleware/validation"));
const global_validation_1 = require("../validation/global.validation");
const fileUploads_1 = require("../middleware/fileUploads");
const protectRoute_1 = require("../middleware/protectRoute");
const categoryRouter = express_1.default.Router();
categoryRouter.use('/:categoryId/subcategory', subCategory_routes_1.default);
categoryRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, fileUploads_1.fileUpload)(fileUploads_1.validation_object.image, 'category').single('image'), (0, validation_1.default)(global_validation_1.nameValidation), category_1.default.addCategory)
    .get(category_1.default.getAllCategory);
categoryRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, fileUploads_1.fileUpload)(fileUploads_1.validation_object.image, 'category').single('image'), (0, validation_1.default)(global_validation_1.nameAndIdValidation), category_1.default.updateCategory)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.idValidation), category_1.default.deleteCategory)
    .get((0, validation_1.default)(global_validation_1.idValidation), category_1.default.getCategory);
exports.default = categoryRouter;
