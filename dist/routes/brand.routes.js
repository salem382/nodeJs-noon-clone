"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_1 = __importDefault(require("../controlles/brand"));
const brandRouter = express_1.default.Router();
brandRouter.route('/').post(brand_1.default.addBrand).get(brand_1.default.getAllBrands);
brandRouter.route('/:id')
    .put(brand_1.default.updateBrand)
    .delete(brand_1.default.deleteBrand)
    .get(brand_1.default.getBrand);
exports.default = brandRouter;
