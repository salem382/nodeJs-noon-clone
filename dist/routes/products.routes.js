"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../controlles/products"));
const productRouter = express_1.default.Router();
productRouter.route('/').post(products_1.default.addProduct).get(products_1.default.getAllProducts);
productRouter.route('/:id')
    .put(products_1.default.updateProduct)
    .delete(products_1.default.deleteProduct)
    .get(products_1.default.getProduct);
exports.default = productRouter;
