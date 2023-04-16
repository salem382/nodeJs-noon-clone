"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../controlles/products"));
const fileUploads_1 = require("../middleware/fileUploads");
const protectRoute_1 = require("../middleware/protectRoute");
const productRouter = express_1.default.Router();
let fieldsArr = [{ name: 'imgCover', maxCount: 1, acceptedTypes: ['image/jpeg', 'image/png'] }, { name: 'imgs', maxCount: 10, acceptedTypes: ['image/jpeg', 'image/png'] }];
productRouter.route('/')
    .post(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), (0, fileUploads_1.fileUpload)(fileUploads_1.validation_object.image, 'product').fields(fieldsArr), products_1.default.addProduct)
    .get(products_1.default.getAllProducts);
productRouter.route('/:id')
    .put(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), products_1.default.updateProduct)
    .delete(protectRoute_1.protectRoute, (0, protectRoute_1.allowedTo)('admin'), products_1.default.deleteProduct)
    .get(products_1.default.getProduct);
exports.default = productRouter;
