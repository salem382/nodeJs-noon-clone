"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategory_1 = __importDefault(require("../controlles/subCategory"));
const global_validation_1 = require("../validation/global.validation");
const validation_1 = __importDefault(require("../middleware/validation"));
const protectRoute_1 = require("../middleware/protectRoute");
const SubcategoryRouter = express_1.default.Router({ mergeParams: true });
SubcategoryRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.nameAndIdValidation), subCategory_1.default.addSubCategory)
    .get(subCategory_1.default.getAllSubCategory);
SubcategoryRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.nameAndIdValidation), subCategory_1.default.updateSubCategory)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.idValidation), subCategory_1.default.deleteSubCategory)
    .get((0, validation_1.default)(global_validation_1.idValidation), subCategory_1.default.getSubCategory);
exports.default = SubcategoryRouter;
