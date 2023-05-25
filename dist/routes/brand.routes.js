"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_1 = __importDefault(require("../controlles/brand"));
const global_validation_1 = require("../validation/global.validation");
const validation_1 = __importDefault(require("../middleware/validation"));
const fileUploads_1 = require("../middleware/fileUploads");
const protectRoute_1 = require("../middleware/protectRoute");
const brandRouter = express_1.default.Router();
brandRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, fileUploads_1.fileUpload)(fileUploads_1.validation_object.image, 'brand').single('image'), (0, validation_1.default)(global_validation_1.nameValidation), brand_1.default.addBrand)
    .get(brand_1.default.getAllBrands);
brandRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), brand_1.default.updateBrand)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, validation_1.default)(global_validation_1.idValidation), brand_1.default.deleteBrand)
    .get((0, validation_1.default)(global_validation_1.idValidation), brand_1.default.getBrand);
exports.default = brandRouter;
